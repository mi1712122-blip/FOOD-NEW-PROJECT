# ============================================================
#  FoodFest – Auto Git Push Watcher
#  Watches the project folder and auto-pushes to GitHub
#  whenever any file changes are saved.
#  Run: Right-click → "Run with PowerShell"
# ============================================================

$projectPath = $PSScriptRoot
$debounceSeconds = 5   # wait this long after last change before pushing

Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "   FoodFest Auto-Push Watcher" -ForegroundColor Yellow
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "  Watching: $projectPath" -ForegroundColor White
Write-Host "  Remote  : https://github.com/mi1712122-blip/my-first-on-anti-gravity.git" -ForegroundColor White
Write-Host "  Debounce: $debounceSeconds seconds after last change" -ForegroundColor White
Write-Host "  Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

# Create a FileSystemWatcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path                  = $projectPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents   = $true
$watcher.NotifyFilter          = [System.IO.NotifyFilters]::LastWrite `
                               -bor [System.IO.NotifyFilters]::FileName `
                               -bor [System.IO.NotifyFilters]::DirectoryName

# Ignore these patterns
$ignorePatterns = @('.git', 'node_modules', '.gitignore', 'Thumbs.db', '.DS_Store')

# Shared timer variable (debounce)
$global:lastChange = [datetime]::MinValue
$global:timerRunning = $false

function Should-Ignore($path) {
    foreach ($pat in $ignorePatterns) {
        if ($path -like "*$pat*") { return $true }
    }
    return $false
}

function Push-ToGitHub($changedFile) {
    Write-Host ""
    Write-Host "  [$(Get-Date -Format 'HH:mm:ss')] Change detected: $changedFile" -ForegroundColor Yellow
    Write-Host "  Waiting $debounceSeconds sec for more changes..." -ForegroundColor DarkGray

    $global:lastChange = Get-Date

    if ($global:timerRunning) { return }
    $global:timerRunning = $true

    # Run debounce loop in the same thread
    while ($true) {
        Start-Sleep -Seconds 1
        $elapsed = (Get-Date) - $global:lastChange
        if ($elapsed.TotalSeconds -ge $debounceSeconds) { break }
    }

    $global:timerRunning = $false

    Write-Host ""
    Write-Host "  [$(Get-Date -Format 'HH:mm:ss')] Pushing to GitHub..." -ForegroundColor Cyan

    Set-Location $projectPath

    # Stage all changes
    $addResult = git add . 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  [ERROR] git add failed: $addResult" -ForegroundColor Red
        return
    }

    # Check if there's anything to commit
    $status = git status --porcelain
    if (-not $status) {
        Write-Host "  [INFO] No new changes to commit." -ForegroundColor DarkGray
        return
    }

    # Build smart commit message
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm"
    $commitMsg  = "Auto-update: $timestamp"

    $commitResult = git commit -m $commitMsg 2>&1
    if ($LASTEXITCODE -ne 0) {
        Write-Host "  [ERROR] git commit failed: $commitResult" -ForegroundColor Red
        return
    }

    $pushResult = git push origin main 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  [SUCCESS] Pushed! Commit: `"$commitMsg`"" -ForegroundColor Green
        Write-Host "  View at: https://github.com/mi1712122-blip/my-first-on-anti-gravity" -ForegroundColor DarkGray
    } else {
        Write-Host "  [ERROR] git push failed: $pushResult" -ForegroundColor Red
    }
    Write-Host ""
    Write-Host "  Watching for changes..." -ForegroundColor DarkGray
}

# Register events
$action = {
    param($s, $e)
    if (-not (Should-Ignore $e.FullPath)) {
        Push-ToGitHub $e.Name
    }
}

Register-ObjectEvent $watcher Changed -Action $action | Out-Null
Register-ObjectEvent $watcher Created -Action $action | Out-Null
Register-ObjectEvent $watcher Deleted -Action $action | Out-Null
Register-ObjectEvent $watcher Renamed -Action $action | Out-Null

Write-Host "  Watching for changes..." -ForegroundColor DarkGray
Write-Host ""

# Keep the script alive
try {
    while ($true) {
        # Process any pending events
        Start-Sleep -Milliseconds 500
    }
} finally {
    $watcher.EnableRaisingEvents = $false
    $watcher.Dispose()
    Write-Host ""
    Write-Host "  Watcher stopped." -ForegroundColor Yellow
}
