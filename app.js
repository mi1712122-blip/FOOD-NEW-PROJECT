/* =========================================
   FOODFEST – APP.JS
   ========================================= */
'use strict';

/* ---- DATA ---- */
const MENU_ITEMS = [
  { id:1, name:'Smash Burger Deluxe', cat:'burger', price:12.99, old:18.99, rating:4.8, time:'25 min', desc:'Double smash patty, aged cheddar, pickles, secret sauce.', img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80&fit=crop' },
  { id:2, name:'Margherita Supreme', cat:'pizza', price:14.99, old:20.00, rating:4.7, time:'30 min', desc:'Fresh mozzarella, San Marzano tomatoes, basil, EVOO.', img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&q=80&fit=crop' },
  { id:3, name:'Greek Power Salad', cat:'salad', price:9.99, old:13.00, rating:4.6, time:'15 min', desc:'Feta, olives, cucumber, red onion, lemon-herb dressing.', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&q=80&fit=crop' },
  { id:4, name:'Truffle Pasta Carbonara', cat:'pasta', price:16.99, old:22.00, rating:4.9, time:'20 min', desc:'Silky egg yolk sauce, guanciale, Pecorino, black truffle.', img:'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=400&q=80&fit=crop' },
  { id:5, name:'Tiramisu Classico', cat:'dessert', price:7.99, old:10.00, rating:4.8, time:'10 min', desc:'Espresso-soaked ladyfingers, mascarpone cream, cocoa.', img:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80&fit=crop' },
  { id:6, name:'BBQ Bacon Stack', cat:'burger', price:13.99, old:18.00, rating:4.7, time:'25 min', desc:'Triple patty, crispy bacon, BBQ sauce, jalapeños.', img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400&q=80&fit=crop' },
  { id:7, name:'Pepperoni Feast', cat:'pizza', price:15.99, old:21.00, rating:4.8, time:'30 min', desc:'Loaded pepperoni, spicy tomato, mozzarella, oregano.', img:'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80&fit=crop' },
  { id:8, name:'Avocado Power Bowl', cat:'salad', price:11.99, old:15.00, rating:4.5, time:'12 min', desc:'Quinoa, grilled chicken, avocado, cherry tomatoes.', img:'https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&q=80&fit=crop' },
  { id:9, name:'Penne Arrabiata', cat:'pasta', price:12.99, old:17.00, rating:4.6, time:'18 min', desc:'Spicy tomato, garlic, chili, fresh parsley, Parmigiano.', img:'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=400&q=80&fit=crop' },
  { id:10, name:'Chocolate Lava Cake', cat:'dessert', price:8.99, old:11.00, rating:4.9, time:'15 min', desc:'Warm dark chocolate cake with molten center, vanilla ice cream.', img:'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400&q=80&fit=crop' },
  { id:11, name:'Crispy Chicken Burger', cat:'burger', price:11.99, old:16.00, rating:4.6, time:'22 min', desc:'Southern-fried chicken thigh, coleslaw, hot honey.', img:'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80&fit=crop' },
  { id:12, name:'Four Cheese Pizza', cat:'pizza', price:17.99, old:23.00, rating:4.9, time:'28 min', desc:'Mozzarella, gorgonzola, gouda, Parmigiano-Reggiano.', img:'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80&fit=crop' },
];

const OFFERS = [
  { id:'o1', name:'Burger Bonanza', desc:'Any 2 burgers + fries combo for a steal price today only!', discount:'-50%', price:14.99, old:29.99, img:'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80&fit=crop' },
  { id:'o2', name:'Pizza Paradise', desc:'Large family pizza with 4 toppings of your choice, free drink!', discount:'-40%', price:18.99, old:31.99, img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80&fit=crop' },
  { id:'o3', name:'Healthy Feast', desc:'Full salad + soup + fresh juice, fuel your day right!', discount:'-70%', price:9.99, old:33.99, img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80&fit=crop' },
];

const CHEFS = [
  { name:'Marco Rossi', role:'Executive Chef', rating:5.0, reviews:248, img:'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&q=80&fit=crop' },
  { name:'Sophie Laurent', role:'Pastry Chef', rating:4.9, reviews:195, img:'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=400&q=80&fit=crop' },
  { name:'David Kim', role:'Sous Chef', rating:4.8, reviews:162, img:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80&fit=crop' },
  { name:'Amara Patel', role:'Grill Master', rating:4.9, reviews:210, img:'https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400&q=80&fit=crop' },
];

const TESTIMONIALS = [
  { name:'Emily Johnson', role:'Food Blogger', rating:5, text:'FoodFest completely blew my mind! The truffle pasta is absolutely divine — better than any restaurant I\'ve visited in Europe. Delivery was warm, fast and beautifully packaged. 10/10 would recommend!', img:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&fit=crop' },
  { name:'James Williams', role:'Corporate Executive', rating:5, text:'We ordered FoodFest for our team lunch of 20 people and the experience was seamless. Every dish arrived hot, fresh and perfectly presented. Our team was wowed. Will definitely order again!', img:'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop' },
  { name:'Maria Garcia', role:'Home Cook Enthusiast', rating:5, text:'I never thought delivery food could taste this good. The flavours are so authentic and fresh — you can tell expert chefs made it. The chocolate lava cake is life-changing. My family loves it!', img:'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80&fit=crop' },
];

const CATEGORIES = [
  { icon:'🍔', name:'Burgers', count:24 },
  { icon:'🍕', name:'Pizza', count:18 },
  { icon:'🥗', name:'Salads', count:15 },
  { icon:'🍝', name:'Pasta', count:20 },
  { icon:'🍰', name:'Desserts', count:12 },
  { icon:'🥤', name:'Drinks', count:30 },
];

const BLOGS = [
  { cat:'Recipes', title:'The Secret Behind Our Award-Winning Smash Burgers', desc:'Discover the precise technique our chef uses to create the perfect crispy-edged patty every single time.', date:'July 18, 2025', author:'Marco Rossi', img:'https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=500&q=80&fit=crop' },
  { cat:'Tips', title:'5 Ways to Make Your Home Pizza Taste Like a Restaurant', desc:'Professional secrets from our head pizza chef that will transform your home cooking forever.', date:'July 15, 2025', author:'Sophie Laurent', img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&q=80&fit=crop' },
  { cat:'Nutrition', title:'Why Fresh Ingredients Make All the Difference to Flavour', desc:'A deep dive into how we source our ingredients daily and why it matters for your health and taste.', date:'July 12, 2025', author:'Amara Patel', img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=500&q=80&fit=crop' },
];

/* ---- STATE ---- */
let cart = JSON.parse(localStorage.getItem('foodfest_cart') || '[]');
let currentTestiIndex = 0;
let testiAutoPlay;
let favItems = new Set(JSON.parse(localStorage.getItem('foodfest_favs') || '[]'));
let currentFilter = 'all';

/* ---- PRELOADER ---- */
(function preloader() {
  const fill = document.getElementById('preloader-fill');
  const loader = document.getElementById('preloader');
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 15 + 5;
    if (progress >= 100) { progress = 100; clearInterval(interval); }
    fill.style.width = progress + '%';
    if (progress === 100) {
      setTimeout(() => {
        loader.classList.add('hidden');
        document.body.style.overflow = '';
        initAnimations();
      }, 400);
    }
  }, 80);
  document.body.style.overflow = 'hidden';
})();

/* ---- NAVBAR SCROLL ---- */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
  document.getElementById('scroll-top').classList.toggle('show', window.scrollY > 400);
  highlightActiveNav();
});

function highlightActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const h = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < top + h);
  });
}

/* ---- HAMBURGER ---- */
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}));

/* ---- SCROLL TOP ---- */
document.getElementById('scroll-top').addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));

/* ---- TOAST ---- */
function showToast(msg, duration = 3000) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), duration);
}

/* ---- CART ---- */
function saveCart() { localStorage.setItem('foodfest_cart', JSON.stringify(cart)); }

function updateCartUI() {
  const count = cart.reduce((s, i) => s + i.qty, 0);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const countEl = document.getElementById('cart-count');
  const totalEl = document.getElementById('cart-total');
  const footerEl = document.getElementById('cart-footer');

  countEl.textContent = count;
  countEl.classList.toggle('visible', count > 0);
  if (totalEl) totalEl.textContent = total.toFixed(2);
  if (footerEl) footerEl.style.display = count > 0 ? 'block' : 'none';

  const cartItemsEl = document.getElementById('cart-items');
  if (!cartItemsEl) return;
  if (cart.length === 0) {
    cartItemsEl.innerHTML = '<div class="cart-empty"><div class="empty-icon">🍽️</div><p>Your cart is empty</p><small>Add some delicious items!</small></div>';
    return;
  }
  cartItemsEl.innerHTML = cart.map(item => `
    <div class="cart-item" data-id="${item.id}">
      <img src="${item.img}" alt="${item.name}" class="cart-item-img" />
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="cart-item-controls">
        <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
        <span class="qty-num">${item.qty}</span>
        <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
      </div>
    </div>
  `).join('');
}

window.changeQty = function(id, delta) {
  const idx = cart.findIndex(i => i.id === id);
  if (idx === -1) return;
  cart[idx].qty += delta;
  if (cart[idx].qty <= 0) cart.splice(idx, 1);
  saveCart(); updateCartUI();
};

function addToCart(item) {
  const existing = cart.find(i => i.id === item.id);
  if (existing) { existing.qty++; }
  else { cart.push({ ...item, qty: 1 }); }
  saveCart(); updateCartUI();
  showToast(`🛒 ${item.name} added to cart!`);
}

/* Cart drawer toggle */
const cartBtn = document.getElementById('cart-btn');
const closeCart = document.getElementById('close-cart');
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');

function openCart() {
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';
}
function closeCartFn() {
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('show');
  document.body.style.overflow = '';
}

cartBtn.addEventListener('click', openCart);
closeCart.addEventListener('click', closeCartFn);
cartOverlay.addEventListener('click', closeCartFn);
document.getElementById('order-now-nav').addEventListener('click', openCart);

// Checkout button opens the rich Firebase-integrated checkout modal
document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    showToast('🍽️ Your cart is empty! Add some delicious dishes first.');
    return;
  }
  closeCartFn();
  openCheckoutModal();
});

/* ---- RENDER OFFERS ---- */
function renderOffers() {
  const grid = document.getElementById('offers-grid');
  if (!grid) return;
  grid.innerHTML = OFFERS.map(o => `
    <div class="offer-card" style="animation-delay:${OFFERS.indexOf(o)*0.1}s">
      <div class="offer-img-wrap">
        <img src="${o.img}" alt="${o.name}" loading="lazy" />
        <div class="offer-badge">${o.discount}</div>
      </div>
      <div class="offer-body">
        <h3>${o.name}</h3>
        <p>${o.desc}</p>
        <div class="offer-footer">
          <div class="offer-price">
            <div class="old">$${o.old.toFixed(2)}</div>
            <div class="new">$${o.price.toFixed(2)}</div>
          </div>
          <button class="offer-add" onclick="addToCart({id:'${o.id}',name:'${o.name}',price:${o.price},img:'${o.img}'})" title="Add to cart">+</button>
        </div>
      </div>
    </div>
  `).join('');
}

/* ---- RENDER MENU ---- */
function renderMenu(filter = 'all') {
  const grid = document.getElementById('menu-grid');
  if (!grid) return;
  const items = filter === 'all' ? MENU_ITEMS : MENU_ITEMS.filter(i => i.cat === filter);
  grid.innerHTML = items.map((item, idx) => {
    const isFav = favItems.has(item.id);
    return `
    <div class="menu-card" style="animation-delay:${idx*0.06}s">
      <div class="menu-img-wrap">
        <img src="${item.img}" alt="${item.name}" loading="lazy" />
        <span class="menu-cat-tag">${item.cat}</span>
        <button class="menu-fav ${isFav ? 'liked' : ''}" onclick="toggleFav(${item.id}, this)" title="${isFav ? 'Remove from favourites':'Save'}">
          ${isFav ? '❤️' : '🤍'}
        </button>
      </div>
      <div class="menu-body">
        <h3>${item.name}</h3>
        <p class="menu-desc">${item.desc}</p>
        <div class="menu-meta">
          <span class="menu-price">$${item.price.toFixed(2)}</span>
          <div class="menu-info">
            <span class="menu-rating">⭐ ${item.rating}</span>
            <span class="menu-time">⏱ ${item.time}</span>
          </div>
        </div>
        <button class="add-to-cart-btn" id="atc-${item.id}" onclick="handleAddToCart(${item.id})">Add to Cart 🛒</button>
      </div>
    </div>`;
  }).join('');
}

window.toggleFav = function(id, btn) {
  if (favItems.has(id)) {
    favItems.delete(id);
    btn.innerHTML = '🤍'; btn.classList.remove('liked');
    showToast('Removed from favourites');
  } else {
    favItems.add(id);
    btn.innerHTML = '❤️'; btn.classList.add('liked');
    showToast('❤️ Added to favourites!');
  }
  localStorage.setItem('foodfest_favs', JSON.stringify([...favItems]));
};

window.handleAddToCart = function(id) {
  const item = MENU_ITEMS.find(i => i.id === id);
  if (!item) return;
  addToCart(item);
  const btn = document.getElementById(`atc-${id}`);
  if (!btn) return;
  btn.textContent = '✓ Added!'; btn.classList.add('added');
  setTimeout(() => { btn.textContent = 'Add to Cart 🛒'; btn.classList.remove('added'); }, 2000);
};

/* Menu filter */
function initMenuFilter() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentFilter = btn.dataset.cat;
      renderMenu(currentFilter);
    });
  });
}

/* ---- RENDER CHEFS ---- */
function renderChefs() {
  const grid = document.getElementById('chefs-grid');
  if (!grid) return;
  grid.innerHTML = CHEFS.map((c, i) => `
    <div class="chef-card" style="animation-delay:${i*0.1}s">
      <div class="chef-img-wrap">
        <img src="${c.img}" alt="${c.name}" loading="lazy" />
        <div class="chef-socials">
          <a href="#" class="chef-social-link">fb</a>
          <a href="#" class="chef-social-link">ig</a>
          <a href="#" class="chef-social-link">tw</a>
        </div>
      </div>
      <div class="chef-body">
        <h3>${c.name}</h3>
        <p class="chef-role">${c.role}</p>
        <div class="chef-rating">⭐ ${c.rating} <span>(${c.reviews} reviews)</span></div>
      </div>
    </div>`).join('');
}

/* ---- RENDER CATEGORIES ---- */
function renderCategories() {
  const grid = document.getElementById('cat-grid');
  if (!grid) return;
  grid.innerHTML = CATEGORIES.map((c, i) => `
    <div class="cat-item" style="animation-delay:${i*0.08}s" onclick="filterByCategory('${c.name.toLowerCase()}')">
      <span class="cat-icon">${c.icon}</span>
      <div class="cat-name">${c.name}</div>
      <div class="cat-count">${c.count} items</div>
    </div>`).join('');
}

window.filterByCategory = function(cat) {
  document.getElementById('menu').scrollIntoView({ behavior:'smooth' });
  setTimeout(() => {
    const mapped = { burgers:'burger', pizza:'pizza', salads:'salad', pasta:'pasta', desserts:'dessert' };
    const filterCat = mapped[cat] || 'all';
    currentFilter = filterCat;
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(b => b.classList.toggle('active', b.dataset.cat === filterCat));
    renderMenu(filterCat);
  }, 600);
};

/* ---- RENDER TESTIMONIALS ---- */
function renderTestimonials() {
  const track = document.getElementById('testi-track');
  const dots = document.getElementById('testi-dots');
  if (!track) return;

  track.innerHTML = TESTIMONIALS.map(t => `
    <div class="testi-card">
      <div class="testi-quote">"</div>
      <p class="testi-text">${t.text}</p>
      <div class="testi-author">
        <img src="${t.img}" alt="${t.name}" class="testi-avatar" />
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
          <div class="testi-stars">${'⭐'.repeat(t.rating)}</div>
        </div>
      </div>
    </div>`).join('');

  dots.innerHTML = TESTIMONIALS.map((_, i) =>
    `<div class="testi-dot ${i===0?'active':''}" data-i="${i}"></div>`
  ).join('');

  dots.querySelectorAll('.testi-dot').forEach(d => d.addEventListener('click', () => goToTesti(+d.dataset.i)));

  document.getElementById('testi-prev').addEventListener('click', () => goToTesti(currentTestiIndex - 1));
  document.getElementById('testi-next').addEventListener('click', () => goToTesti(currentTestiIndex + 1));

  startTestiAutoPlay();
}

function goToTesti(idx) {
  const n = TESTIMONIALS.length;
  currentTestiIndex = ((idx % n) + n) % n;
  const track = document.getElementById('testi-track');
  track.style.transform = `translateX(-${currentTestiIndex * 100}%)`;
  document.querySelectorAll('.testi-dot').forEach((d, i) => d.classList.toggle('active', i === currentTestiIndex));
  restartTestiAutoPlay();
}

function startTestiAutoPlay() { testiAutoPlay = setInterval(() => goToTesti(currentTestiIndex + 1), 5000); }
function restartTestiAutoPlay() { clearInterval(testiAutoPlay); startTestiAutoPlay(); }

/* ---- RENDER BLOG ---- */
function renderBlog() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;
  grid.innerHTML = BLOGS.map((b, i) => `
    <div class="blog-card" style="animation-delay:${i*0.1}s">
      <div class="blog-img-wrap">
        <img src="${b.img}" alt="${b.title}" loading="lazy" />
        <span class="blog-cat-tag">${b.cat}</span>
      </div>
      <div class="blog-body">
        <div class="blog-meta">
          <span>📅 ${b.date}</span>
          <span>👤 ${b.author}</span>
        </div>
        <h3>${b.title}</h3>
        <p>${b.desc}</p>
        <a href="#" class="blog-read-more">Read More →</a>
      </div>
    </div>`).join('');
}

/* ---- CTA PARTICLES ---- */
function renderParticles() {
  const bg = document.getElementById('cta-bg');
  if (!bg) return;
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 40 + 10;
    p.classList.add('cta-particle');
    p.style.cssText = `
      width:${size}px; height:${size}px;
      left:${Math.random()*100}%;
      animation-duration:${Math.random()*8+6}s;
      animation-delay:${Math.random()*6}s;
    `;
    bg.appendChild(p);
  }
}

/* ---- COUNTER ANIMATION ---- */
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  el._counterDone = false;
  const run = () => {
    current += step;
    if (current >= target) {
      el.textContent = target.toLocaleString();
      el._counterDone = true;
      return;
    }
    el.textContent = Math.floor(current).toLocaleString();
    requestAnimationFrame(run);
  };
  run();
}

/* ---- HERO STAT MINI-COUNTERS ---- */
function animateHeroStats() {
  document.querySelectorAll('.hstat-num').forEach(el => {
    if (el._done) return;
    const target = parseInt(el.dataset.target);
    const duration = 1800;
    const step = target / (duration / 16);
    let current = 0;
    const run = () => {
      current += step;
      if (current >= target) { el.textContent = target.toLocaleString(); el._done = true; return; }
      el.textContent = Math.floor(current).toLocaleString();
      requestAnimationFrame(run);
    };
    run();
  });
}

/* ---- INTERSECTION OBSERVER ---- */
function initObserver() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Counter numbers
      if (el.classList.contains('counter-num') && !el._counterDone) {
        animateCounter(el);
      }

      // Fade-in cards
      if (el.classList.contains('observe-fade')) {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }

      io.unobserve(el);
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.counter-num').forEach(el => io.observe(el));
  document.querySelectorAll('.menu-card, .offer-card, .chef-card, .blog-card, .cat-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(24px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    el.classList.add('observe-fade');
    io.observe(el);
  });
}

/* Hero section observer for stat counters */
function initHeroObserver() {
  const heroSection = document.getElementById('hero');
  const io = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) animateHeroStats();
  }, { threshold: 0.3 });
  if (heroSection) io.observe(heroSection);
}

/* ---- FORM (FIRESTORE TABLE RESERVATIONS) ---- */
function initForm() {
  const form = document.getElementById('res-form');
  const success = document.getElementById('form-success');
  const submitBtn = document.getElementById('res-submit');
  if (!form) return;

  // Set min date to today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.innerHTML = '<span>Reserving in Kitchen...</span>';
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.7';

    const payload = {
      name: document.getElementById('res-name').value.trim(),
      email: document.getElementById('res-email').value.trim(),
      phone: document.getElementById('res-phone').value.trim(),
      guests: document.getElementById('res-guests').value,
      date: document.getElementById('res-date').value,
      time: document.getElementById('res-time').value
    };

    const fb = getFirebase();
    let resResult;
    if (fb) {
      resResult = await fb.createReservation(payload);
    } else {
      resResult = { success: true, id: 'RES-' + Math.floor(1000 + Math.random()*9000) };
    }

    submitBtn.innerHTML = '<span>Book My Table</span><span class="btn-arrow">→</span>';
    submitBtn.disabled = false;
    submitBtn.style.opacity = '';
    
    if (resResult && resResult.success) {
      const refCode = (resResult.id || '').length > 8 ? resResult.id.slice(-6).toUpperCase() : resResult.id;
      success.textContent = `🎉 Table booked! Ref #${refCode}. Confirmation saved to your profile!`;
      success.classList.add('show');
      form.reset();
      if (dateInput) { dateInput.value = new Date().toISOString().split('T')[0]; }
      showToast('🎉 Table reserved successfully!');
      setTimeout(() => success.classList.remove('show'), 6000);
    } else {
      showToast('⚠️ Could not complete reservation. Please try again.');
    }
  });
}

/* ---- SEARCH ---- */
document.getElementById('search-btn').addEventListener('click', () => {
  const val = document.getElementById('hero-search-input').value.trim();
  if (!val) { showToast('📍 Please enter your delivery address'); return; }
  showToast(`🔍 Finding restaurants near "${val}"...`);
  setTimeout(() => {
    document.getElementById('menu').scrollIntoView({ behavior:'smooth' });
  }, 1000);
});
document.getElementById('hero-search-input').addEventListener('keydown', e => {
  if (e.key === 'Enter') document.getElementById('search-btn').click();
});

/* ---- CTA BUTTONS ---- */
document.getElementById('cta-order').addEventListener('click', () => openCart());
document.getElementById('cta-learn').addEventListener('click', () => {
  document.getElementById('menu').scrollIntoView({ behavior:'smooth' });
});

/* ---- NEWSLETTER ---- */
document.getElementById('newsletter-btn').addEventListener('click', () => {
  const email = document.getElementById('footer-email').value.trim();
  if (!email || !email.includes('@')) { showToast('📧 Please enter a valid email'); return; }
  showToast('🎉 Subscribed! Check your inbox for 15% off!');
  document.getElementById('footer-email').value = '';
});

/* ---- HERO IMAGE CYCLE ---- */
const heroImages = [
  'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=620&q=85&fit=crop',
  'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=620&q=85&fit=crop',
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=620&q=85&fit=crop',
  'https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?w=620&q=85&fit=crop',
];
let heroImgIdx = 0;
function cycleHeroImage() {
  const img = document.getElementById('hero-img');
  if (!img) return;
  heroImgIdx = (heroImgIdx + 1) % heroImages.length;
  img.style.opacity = '0';
  img.style.transform = 'scale(0.95)';
  img.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  setTimeout(() => {
    img.src = heroImages[heroImgIdx];
    img.onload = () => {
      img.style.opacity = '1';
      img.style.transform = '';
    };
  }, 500);
}
setInterval(cycleHeroImage, 4000);

/* ---- SMOOTH ANCHOR LINKS ---- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior:'smooth' }); }
  });
});

/* ---- INIT ---- */
function initAnimations() {
  renderOffers();
  renderMenu('all');
  initMenuFilter();
  renderChefs();
  renderCategories();
  renderTestimonials();
  renderBlog();
  renderParticles();
  initForm();
  initObserver();
  initHeroObserver();
  updateCartUI();

  // Initialize Firebase UI Modules
  initAuthUI();
  initCheckoutUI();
  initOrdersDrawer();
  initReservationsUI();

  // Stagger entrance animations for hero content
  document.querySelectorAll('.hero-content > *').forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.12}s, transform 0.6s ease ${i * 0.12}s`;
    setTimeout(() => { el.style.opacity = '1'; el.style.transform = ''; }, 50 + i * 80);
  });
}

/* =========================================
   FOODFEST – FIREBASE UI INTEGRATION
   ========================================= */
let isSignUpMode = false;
let currentEtaInterval = null;

function getFirebase() {
  return window.FoodFestFirebase || null;
}

/* 1. Setup Auth UI Listeners & Dropdown */
function initAuthUI() {
  const navAuthBtn = document.getElementById('nav-auth-btn');
  const userDropdown = document.getElementById('user-dropdown');
  const userMenuContainer = document.getElementById('user-menu-container');
  const authModalOverlay = document.getElementById('auth-modal-overlay');
  const closeAuthModal = document.getElementById('close-auth-modal');
  const tabSignIn = document.getElementById('tab-signin');
  const tabSignUp = document.getElementById('tab-signup');
  const groupSignupName = document.getElementById('group-signup-name');
  const authForm = document.getElementById('auth-form');
  const authActionLabel = document.getElementById('auth-action-label');
  const authBtnSpinner = document.getElementById('auth-btn-spinner');
  const authErrorAlert = document.getElementById('auth-error-alert');
  const googleAuthBtn = document.getElementById('google-auth-btn');
  const togglePwdBtn = document.getElementById('toggle-pwd-btn');
  const authPassword = document.getElementById('auth-password');
  const authForgotLink = document.getElementById('auth-forgot-link');
  const btnLogout = document.getElementById('btn-logout');

  // Toggle user dropdown or open modal
  navAuthBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const fb = getFirebase();
    if (fb && fb.currentUser) {
      userDropdown.classList.toggle('show');
    } else {
      openAuthModal('signin');
    }
  });

  // Close dropdown on outside click
  document.addEventListener('click', (e) => {
    if (userMenuContainer && !userMenuContainer.contains(e.target)) {
      userDropdown.classList.remove('show');
    }
  });

  // Modal open & close
  window.openAuthModal = function(mode = 'signin') {
    setAuthMode(mode === 'signup');
    authErrorAlert.style.display = 'none';
    authForm.reset();
    authModalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  function closeAuthModalFn() {
    authModalOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  closeAuthModal.addEventListener('click', closeAuthModalFn);
  authModalOverlay.addEventListener('click', (e) => {
    if (e.target === authModalOverlay) closeAuthModalFn();
  });

  // Switch between Sign In and Sign Up
  function setAuthMode(signUp) {
    isSignUpMode = signUp;
    tabSignIn.classList.toggle('active', !signUp);
    tabSignUp.classList.toggle('active', signUp);
    groupSignupName.style.display = signUp ? 'block' : 'none';
    const nameInput = document.getElementById('auth-name');
    if (nameInput) nameInput.required = signUp;
    document.getElementById('auth-modal-title').textContent = signUp ? 'Create Account' : 'Welcome Back';
    document.getElementById('auth-modal-subtitle').textContent = signUp 
      ? 'Join FoodFest to earn rewards and track all your orders' 
      : 'Sign in to track orders, save favorites, and earn rewards';
    authActionLabel.textContent = signUp ? 'Create Account' : 'Sign In';
    document.getElementById('auth-options-row').style.display = signUp ? 'none' : 'flex';
    authErrorAlert.style.display = 'none';
  }

  tabSignIn.addEventListener('click', () => setAuthMode(false));
  tabSignUp.addEventListener('click', () => setAuthMode(true));

  // Password visibility toggle
  togglePwdBtn.addEventListener('click', () => {
    const isPwd = authPassword.type === 'password';
    authPassword.type = isPwd ? 'text' : 'password';
    togglePwdBtn.textContent = isPwd ? '🙈' : '👁️';
  });

  // Forgot password
  authForgotLink.addEventListener('click', async (e) => {
    e.preventDefault();
    const email = document.getElementById('auth-email').value.trim();
    if (!email) {
      showAuthError('Please enter your email above to receive a password reset link.');
      return;
    }
    const fb = getFirebase();
    if (!fb) return;
    const res = await fb.resetPassword(email);
    if (res.success) {
      showToast('📩 Password reset email sent! Check your inbox.');
      closeAuthModalFn();
    } else {
      showAuthError(res.error);
    }
  });

  // Google Sign In
  googleAuthBtn.addEventListener('click', async () => {
    const fb = getFirebase();
    if (!fb) { showToast('Firebase service initializing...'); return; }
    authBtnSpinner.style.display = 'inline-block';
    authActionLabel.style.display = 'none';
    const res = await fb.signInGoogle();
    authBtnSpinner.style.display = 'none';
    authActionLabel.style.display = 'inline';
    if (res.success) {
      closeAuthModalFn();
      showToast(`👋 Welcome, ${res.user.displayName || 'Food Lover'}!`);
    } else {
      showAuthError(res.error);
    }
  });

  // Form submit (Email/Password)
  authForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fb = getFirebase();
    if (!fb) { showToast('Firebase service initializing...'); return; }

    const email = document.getElementById('auth-email').value.trim();
    const password = document.getElementById('auth-password').value;
    const name = document.getElementById('auth-name').value.trim();

    authBtnSpinner.style.display = 'inline-block';
    authActionLabel.style.display = 'none';

    let res;
    if (isSignUpMode) {
      res = await fb.signUp(email, password, name);
    } else {
      res = await fb.signIn(email, password);
    }

    authBtnSpinner.style.display = 'none';
    authActionLabel.style.display = 'inline';

    if (res.success) {
      closeAuthModalFn();
      const displayName = res.user.displayName || (name || email.split('@')[0]);
      showToast(`🎉 ${isSignUpMode ? 'Account created' : 'Signed in'} successfully! Welcome, ${displayName}!`);
    } else {
      showAuthError(res.error);
    }
  });

  function showAuthError(msg) {
    authErrorAlert.textContent = msg;
    authErrorAlert.style.display = 'block';
  }

  // Sign out
  btnLogout.addEventListener('click', async () => {
    const fb = getFirebase();
    if (fb) {
      await fb.logout();
      userDropdown.classList.remove('show');
      showToast('👋 You have been signed out.');
    }
  });

  // Listen to Auth state updates
  function handleAuthUpdate(user) {
    const navAuthText = document.getElementById('nav-auth-text');
    const navAvatarBadge = document.getElementById('nav-avatar-badge');
    const dropdownAvatar = document.getElementById('dropdown-avatar');
    const dropdownName = document.getElementById('dropdown-name');
    const dropdownEmail = document.getElementById('dropdown-email');
    const logoutDivider = document.getElementById('dropdown-logout-divider');
    const logoutBtn = document.getElementById('btn-logout');

    if (user) {
      const name = user.displayName || user.email.split('@')[0];
      const initial = name.charAt(0).toUpperCase();
      navAuthText.textContent = name.length > 10 ? name.slice(0, 9) + '…' : name;

      if (user.photoURL) {
        navAvatarBadge.innerHTML = `<img src="${user.photoURL}" alt="${name}" />`;
        dropdownAvatar.innerHTML = `<img src="${user.photoURL}" alt="${name}" />`;
      } else {
        navAvatarBadge.textContent = initial;
        dropdownAvatar.textContent = initial;
      }

      dropdownName.textContent = name;
      dropdownEmail.textContent = user.email;
      logoutDivider.style.display = 'block';
      logoutBtn.style.display = 'flex';

      // Autofill checkout details
      const coName = document.getElementById('co-name');
      if (coName && !coName.value && user.displayName) coName.value = user.displayName;

      refreshOrdersBadge();
    } else {
      navAuthText.textContent = 'Sign In';
      navAvatarBadge.textContent = '👤';
      dropdownAvatar.textContent = '👤';
      dropdownName.textContent = 'Welcome!';
      dropdownEmail.textContent = 'Sign in to manage orders';
      logoutDivider.style.display = 'none';
      logoutBtn.style.display = 'none';
      document.getElementById('orders-count-badge').style.display = 'none';
    }
  }

  if (window.FoodFestFirebase) {
    window.FoodFestFirebase.onAuth(handleAuthUpdate);
  } else {
    window.addEventListener('foodfest:firebase-ready', () => {
      window.FoodFestFirebase.onAuth(handleAuthUpdate);
    });
  }
}

/* 2. Setup Checkout & Firestore Orders */
function initCheckoutUI() {
  const checkoutModalOverlay = document.getElementById('checkout-modal-overlay');
  const closeCheckoutModal = document.getElementById('close-checkout-modal');
  const checkoutForm = document.getElementById('checkout-form');
  const coBtnSpinner = document.getElementById('co-btn-spinner');
  const confirmOrderText = document.getElementById('confirm-order-text');

  window.openCheckoutModal = function() {
    renderCheckoutSummary();
    const fb = getFirebase();
    if (fb && fb.currentUser) {
      const coName = document.getElementById('co-name');
      if (coName && !coName.value) coName.value = fb.currentUser.displayName || '';
    }
    checkoutModalOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };

  function closeCheckoutModalFn() {
    checkoutModalOverlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  closeCheckoutModal.addEventListener('click', closeCheckoutModalFn);
  checkoutModalOverlay.addEventListener('click', (e) => {
    if (e.target === checkoutModalOverlay) closeCheckoutModalFn();
  });

  // Render items in Checkout summary
  function renderCheckoutSummary() {
    const list = document.getElementById('checkout-summary-items');
    const subtotalEl = document.getElementById('co-subtotal');
    const totalEl = document.getElementById('co-total');
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

    list.innerHTML = cart.map(item => `
      <div class="co-item-row">
        <img src="${item.img}" alt="${item.name}" class="co-item-img" />
        <div class="co-item-info">
          <div class="co-item-name">${item.name}</div>
          <div class="co-item-qty">Qty: ${item.qty} × $${item.price.toFixed(2)}</div>
        </div>
        <div class="co-item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
    `).join('');

    subtotalEl.textContent = `$${total.toFixed(2)}`;
    totalEl.textContent = `$${total.toFixed(2)}`;
    confirmOrderText.textContent = `Place Order ($${total.toFixed(2)}) 🚀`;
  }

  // Payment radio option highlight
  document.querySelectorAll('.pay-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.pay-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Confirm and Place Order -> Firestore
  checkoutForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const fb = getFirebase();
    coBtnSpinner.style.display = 'inline-block';
    confirmOrderText.style.display = 'none';

    const selectedPayment = document.querySelector('input[name="payment_type"]:checked')?.value || 'Cash on Delivery';
    const totalAmount = cart.reduce((s, i) => s + i.price * i.qty, 0);

    const orderPayload = {
      customer: {
        name: document.getElementById('co-name').value.trim(),
        phone: document.getElementById('co-phone').value.trim(),
        address: document.getElementById('co-address').value.trim(),
        notes: document.getElementById('co-notes').value.trim(),
        email: fb && fb.currentUser ? fb.currentUser.email : ''
      },
      paymentMethod: selectedPayment,
      items: [...cart],
      totalAmount
    };

    let orderResult;
    if (fb) {
      orderResult = await fb.createOrder(orderPayload);
    } else {
      orderResult = { success: true, id: 'FF-' + Math.floor(1000 + Math.random() * 9000) };
    }

    coBtnSpinner.style.display = 'none';
    confirmOrderText.style.display = 'inline';

    if (orderResult && orderResult.success) {
      cart = [];
      saveCart();
      updateCartUI();
      checkoutForm.reset();
      closeCheckoutModalFn();

      showOrderSuccess(orderResult.id, totalAmount);
      refreshOrdersBadge();
    } else {
      showToast('⚠️ Could not complete order: ' + (orderResult?.warning || 'Please try again.'));
    }
  });
}

/* 3. Setup Order Success & Live Tracker Modal */
function showOrderSuccess(orderId, total) {
  const successModalOverlay = document.getElementById('order-success-modal-overlay');
  const codeEl = document.getElementById('success-order-code');
  const etaEl = document.getElementById('eta-countdown');
  const btnClose = document.getElementById('btn-close-order-success');
  const btnViewOrders = document.getElementById('btn-view-my-orders-from-modal');

  const formattedId = (orderId || '').length > 8 ? orderId.slice(-6).toUpperCase() : orderId;
  codeEl.textContent = `ORDER #FF-${formattedId}`;

  // Start 30 min countdown
  if (currentEtaInterval) clearInterval(currentEtaInterval);
  let secondsLeft = 29 * 60 + 45;
  const updateTimer = () => {
    const mins = Math.floor(secondsLeft / 60);
    const secs = secondsLeft % 60;
    etaEl.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs} mins`;
    if (secondsLeft > 0) secondsLeft--;
  };
  updateTimer();
  currentEtaInterval = setInterval(updateTimer, 1000);

  successModalOverlay.classList.add('show');
  document.body.style.overflow = 'hidden';

  const closeSuccess = () => {
    successModalOverlay.classList.remove('show');
    document.body.style.overflow = '';
  };

  btnClose.onclick = () => {
    closeSuccess();
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  };

  btnViewOrders.onclick = () => {
    closeSuccess();
    openOrdersDrawer();
  };

  successModalOverlay.onclick = (e) => {
    if (e.target === successModalOverlay) closeSuccess();
  };
}

/* 4. Setup My Orders Drawer */
function initOrdersDrawer() {
  const btnOpen = document.getElementById('btn-open-orders');
  const drawer = document.getElementById('orders-drawer');
  const overlay = document.getElementById('orders-drawer-overlay');
  const closeBtn = document.getElementById('close-orders-drawer');

  btnOpen.addEventListener('click', () => {
    document.getElementById('user-dropdown').classList.remove('show');
    openOrdersDrawer();
  });

  function closeOrdersDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeOrdersDrawer);
  overlay.addEventListener('click', closeOrdersDrawer);

  window.openOrdersDrawer = async function() {
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    await renderOrdersList();
  };
}

async function renderOrdersList() {
  const container = document.getElementById('orders-drawer-body');
  const countBadge = document.getElementById('orders-drawer-count');
  container.innerHTML = '<div style="text-align:center;padding:30px;"><div class="btn-spinner" style="margin:0 auto;border-color:var(--orange);border-top-color:transparent;"></div><p style="margin-top:10px;font-size:13px;color:#777;">Loading orders from Firestore...</p></div>';

  const fb = getFirebase();
  const orders = fb ? await fb.getUserOrders() : JSON.parse(localStorage.getItem('foodfest_saved_orders') || '[]');

  countBadge.textContent = orders.length;

  if (orders.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty-state">
        <div class="empty-emoji">🍕</div>
        <h4>No orders yet</h4>
        <p>Your delicious food orders will appear here with live tracking status!</p>
      </div>`;
    return;
  }

  container.innerHTML = orders.map(ord => {
    const dateStr = ord.localDate ? new Date(ord.localDate).toLocaleDateString(undefined, { month:'short', day:'numeric', hour:'2-digit', minute:'2-digit' }) : 'Recently';
    const itemsPreview = (ord.items || []).map(i => `${i.qty}× ${i.name}`).join(', ');
    const code = (ord.id || '').length > 8 ? ord.id.slice(-6).toUpperCase() : ord.id;
    return `
      <div class="order-history-card">
        <div class="order-card-header">
          <span class="order-card-id">#FF-${code}</span>
          <span class="order-card-status preparing">👨‍🍳 In Kitchen</span>
        </div>
        <div class="order-card-items-preview">${itemsPreview || 'Delightful food selection'}</div>
        <div class="order-card-footer">
          <span>🕒 ${dateStr}</span>
          <span class="order-card-total">$${Number(ord.totalAmount || 0).toFixed(2)}</span>
        </div>
      </div>
    `;
  }).join('');
}

async function refreshOrdersBadge() {
  const badge = document.getElementById('orders-count-badge');
  const fb = getFirebase();
  if (fb) {
    const orders = await fb.getUserOrders();
    if (orders.length > 0) {
      badge.textContent = orders.length;
      badge.style.display = 'inline-block';
    } else {
      badge.style.display = 'none';
    }
  }
}

/* 5. Setup Table Bookings Drawer */
function initReservationsUI() {
  const btnOpen = document.getElementById('btn-open-reservations');
  const drawer = document.getElementById('reservations-drawer');
  const overlay = document.getElementById('reservations-drawer-overlay');
  const closeBtn = document.getElementById('close-reservations-drawer');

  btnOpen.addEventListener('click', () => {
    document.getElementById('user-dropdown').classList.remove('show');
    openReservationsDrawer();
  });

  function closeReservationsDrawer() {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
  }

  closeBtn.addEventListener('click', closeReservationsDrawer);
  overlay.addEventListener('click', closeReservationsDrawer);

  window.openReservationsDrawer = async function() {
    drawer.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
    await renderReservationsList();
  };
}

async function renderReservationsList() {
  const container = document.getElementById('reservations-drawer-body');
  const countBadge = document.getElementById('res-drawer-count');
  container.innerHTML = '<div style="text-align:center;padding:30px;"><div class="btn-spinner" style="margin:0 auto;border-color:var(--orange);border-top-color:transparent;"></div><p style="margin-top:10px;font-size:13px;color:#777;">Loading reservations...</p></div>';

  const fb = getFirebase();
  const bookings = fb ? await fb.getUserReservations() : JSON.parse(localStorage.getItem('foodfest_saved_reservations') || '[]');

  countBadge.textContent = bookings.length;

  if (bookings.length === 0) {
    container.innerHTML = `
      <div class="drawer-empty-state">
        <div class="empty-emoji">🍽️</div>
        <h4>No reservations yet</h4>
        <p>Reserve a table for your next dine-in experience and view confirmations here!</p>
      </div>`;
    return;
  }

  container.innerHTML = bookings.map(res => `
    <div class="reservation-history-card">
      <div class="res-card-header">
        <span class="res-card-title">🍽️ Table for ${res.guests || '2 People'}</span>
        <span class="res-card-badge">Confirmed</span>
      </div>
      <div class="res-card-meta">👤 Reserved for: <strong>${res.name}</strong></div>
      <div class="res-card-time">📅 ${res.date} at ⏰ ${res.time}</div>
    </div>
  `).join('');
}
