/* =========================================
   FOODFEST – FIREBASE CONFIGURATION & SERVICE
   ========================================= */

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  onAuthStateChanged, 
  updateProfile,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  serverTimestamp,
  onSnapshot
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Firebase configuration provided by the user
const firebaseConfig = {
  apiKey: "AIzaSyBE_huvaR-0-MKK16i9SGVYx8Mv313KmEQ",
  authDomain: "nd-project-7c099.firebaseapp.com",
  projectId: "nd-project-7c099",
  storageBucket: "nd-project-7c099.firebasestorage.app",
  messagingSenderId: "219651994208",
  appId: "1:219651994208:web:d6a76144ce7b8131490905"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Central FoodFest Firebase API
const FoodFestFirebase = {
  app,
  auth,
  db,
  currentUser: null,
  authListeners: [],

  // Listen to auth state changes
  onAuth(callback) {
    if (typeof callback === 'function') {
      this.authListeners.push(callback);
      // Immediately pass current user if already resolved
      if (this.currentUser !== undefined) {
        callback(this.currentUser);
      }
    }
  },

  notifyAuth(user) {
    this.currentUser = user;
    this.authListeners.forEach(cb => {
      try { cb(user); } catch (e) { console.error('Auth listener error:', e); }
    });
    window.dispatchEvent(new CustomEvent('foodfest:auth-changed', { detail: { user } }));
  },

  // 1. SIGN UP (Email & Password)
  async signUp(email, password, displayName) {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      if (displayName && userCredential.user) {
        await updateProfile(userCredential.user, { displayName });
      }
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Sign up error:', error);
      return { success: false, error: this.formatAuthError(error) };
    }
  },

  // 2. SIGN IN (Email & Password)
  async signIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      console.error('Sign in error:', error);
      return { success: false, error: this.formatAuthError(error) };
    }
  },

  // 3. GOOGLE SIGN IN
  async signInGoogle() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      return { success: true, user: result.user };
    } catch (error) {
      console.error('Google sign-in error:', error);
      return { success: false, error: this.formatAuthError(error) };
    }
  },

  // 4. SIGN OUT
  async logout() {
    try {
      await signOut(auth);
      return { success: true };
    } catch (error) {
      console.error('Sign out error:', error);
      return { success: false, error: error.message };
    }
  },

  // 5. PASSWORD RESET
  async resetPassword(email) {
    try {
      await sendPasswordResetEmail(auth, email);
      return { success: true };
    } catch (error) {
      console.error('Password reset error:', error);
      return { success: false, error: this.formatAuthError(error) };
    }
  },

  // 6. CREATE ORDER IN FIRESTORE
  async createOrder(orderPayload) {
    try {
      const orderData = {
        userId: this.currentUser ? this.currentUser.uid : 'guest',
        userEmail: this.currentUser ? this.currentUser.email : (orderPayload.customer.email || 'guest'),
        customerName: orderPayload.customer.name,
        customerPhone: orderPayload.customer.phone,
        deliveryAddress: orderPayload.customer.address,
        notes: orderPayload.customer.notes || '',
        paymentMethod: orderPayload.paymentMethod || 'Cash on Delivery',
        items: orderPayload.items,
        totalAmount: orderPayload.totalAmount,
        itemCount: orderPayload.items.reduce((s, i) => s + i.qty, 0),
        status: 'Preparing',
        createdAt: serverTimestamp(),
        localDate: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'orders'), orderData);
      
      // Also cache locally for immediate offline display
      this.cacheOrderLocally({ id: docRef.id, ...orderData, createdAt: new Date().toISOString() });
      
      return { success: true, id: docRef.id, order: orderData };
    } catch (error) {
      console.warn('Firestore createOrder warning (falling back to local cache if permissions/network issue):', error);
      // Fallback: local storage order simulation so customer is never stuck
      const fallbackId = 'OFFLINE-' + Math.random().toString(36).substring(2, 9).toUpperCase();
      const localOrder = {
        id: fallbackId,
        userId: this.currentUser ? this.currentUser.uid : 'guest',
        userEmail: this.currentUser ? this.currentUser.email : 'guest',
        ...orderPayload,
        status: 'Preparing',
        localDate: new Date().toISOString(),
        createdAt: new Date().toISOString()
      };
      this.cacheOrderLocally(localOrder);
      return { success: true, id: fallbackId, order: localOrder, fallback: true, warning: error.message };
    }
  },

  // 7. GET ORDERS FOR CURRENT USER
  async getUserOrders() {
    const orders = [];
    const localCached = JSON.parse(localStorage.getItem('foodfest_saved_orders') || '[]');

    try {
      if (this.currentUser) {
        const q = query(
          collection(db, 'orders'),
          where('userId', '==', this.currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          orders.push({ id: doc.id, ...doc.data() });
        });
      }
    } catch (error) {
      console.warn('Could not fetch orders from Firestore directly:', error);
    }

    // Merge with any locally saved orders (avoid duplicates)
    const mergedMap = new Map();
    orders.forEach(o => mergedMap.set(o.id, o));
    localCached.forEach(o => {
      if (!this.currentUser || o.userId === this.currentUser.uid || o.userId === 'guest') {
        if (!mergedMap.has(o.id)) mergedMap.set(o.id, o);
      }
    });

    return Array.from(mergedMap.values()).sort((a, b) => {
      const timeA = new Date(a.localDate || a.createdAt || 0).getTime();
      const timeB = new Date(b.localDate || b.createdAt || 0).getTime();
      return timeB - timeA;
    });
  },

  cacheOrderLocally(order) {
    try {
      const list = JSON.parse(localStorage.getItem('foodfest_saved_orders') || '[]');
      list.unshift(order);
      localStorage.setItem('foodfest_saved_orders', JSON.stringify(list.slice(0, 30)));
    } catch (e) {
      console.error('Local cache error:', e);
    }
  },

  // 8. CREATE TABLE RESERVATION IN FIRESTORE
  async createReservation(resPayload) {
    try {
      const resData = {
        userId: this.currentUser ? this.currentUser.uid : 'guest',
        name: resPayload.name,
        email: resPayload.email,
        phone: resPayload.phone || '',
        guests: resPayload.guests,
        date: resPayload.date,
        time: resPayload.time,
        status: 'Confirmed',
        createdAt: serverTimestamp(),
        localDate: new Date().toISOString()
      };

      const docRef = await addDoc(collection(db, 'reservations'), resData);
      this.cacheReservationLocally({ id: docRef.id, ...resData });
      return { success: true, id: docRef.id, reservation: resData };
    } catch (error) {
      console.warn('Firestore reservation fallback:', error);
      const fallbackId = 'RES-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const localRes = {
        id: fallbackId,
        ...resPayload,
        status: 'Confirmed',
        localDate: new Date().toISOString()
      };
      this.cacheReservationLocally(localRes);
      return { success: true, id: fallbackId, reservation: localRes, fallback: true };
    }
  },

  // 9. GET RESERVATIONS
  async getUserReservations() {
    const list = [];
    const localCached = JSON.parse(localStorage.getItem('foodfest_saved_reservations') || '[]');
    try {
      if (this.currentUser && this.currentUser.email) {
        const q = query(
          collection(db, 'reservations'),
          where('email', '==', this.currentUser.email)
        );
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
      }
    } catch (error) {
      console.warn('Could not fetch reservations from Firestore:', error);
    }

    const merged = new Map();
    list.forEach(r => merged.set(r.id, r));
    localCached.forEach(r => {
      if (!this.currentUser || r.email === this.currentUser.email || r.userId === 'guest') {
        if (!merged.has(r.id)) merged.set(r.id, r);
      }
    });

    return Array.from(merged.values());
  },

  cacheReservationLocally(res) {
    try {
      const list = JSON.parse(localStorage.getItem('foodfest_saved_reservations') || '[]');
      list.unshift(res);
      localStorage.setItem('foodfest_saved_reservations', JSON.stringify(list.slice(0, 20)));
    } catch (e) {
      console.error('Local cache error:', e);
    }
  },

  // User-friendly error messages
  formatAuthError(err) {
    if (!err || !err.code) return err.message || 'An unexpected error occurred.';
    switch (err.code) {
      case 'auth/invalid-email':
        return 'Please enter a valid email address.';
      case 'auth/user-disabled':
        return 'This account has been disabled.';
      case 'auth/user-not-found':
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
        return 'Incorrect email or password. Please try again.';
      case 'auth/email-already-in-use':
        return 'An account already exists with this email address. Please sign in instead.';
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.';
      case 'auth/popup-closed-by-user':
        return 'Google Sign-in was cancelled.';
      case 'auth/popup-blocked':
        return 'Sign-in popup was blocked by browser. Please allow popups for this site.';
      case 'auth/too-many-requests':
        return 'Too many failed attempts. Please wait a moment and try again.';
      default:
        return err.message.replace('Firebase: ', '');
    }
  }
};

// Monitor Firebase Auth State
onAuthStateChanged(auth, (user) => {
  FoodFestFirebase.notifyAuth(user);
});

// Expose globally so existing vanilla app scripts can access it seamlessly
window.FoodFestFirebase = FoodFestFirebase;

// Dispatch ready event
window.dispatchEvent(new CustomEvent('foodfest:firebase-ready', { detail: { service: FoodFestFirebase } }));
console.log('🔥 FoodFest Firebase Service initialized successfully!');
