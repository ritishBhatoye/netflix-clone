# Quick Fix Guide

## 🎬 Issue 1: No Movie Data from TMDB

### Problem
Your `.env` file is missing the TMDB API key.

### Solution

1. **Get TMDB API Key:**
   - Go to https://www.themoviedb.org/
   - Sign up/Login
   - Go to Settings → API
   - Copy your API Key (v3 auth)

2. **Update `.env` file:**
   ```env
   EXPO_PUBLIC_TMDB_API_KEY=your_actual_api_key_here
   ```

3. **Restart the app:**
   ```bash
   npm start
   ```

## 🔐 Issue 2: Auth Screen Shows on Reload

### Problem
App was redirecting to login even when user was logged in.

### Solution
✅ **FIXED!** Updated `app/index.tsx` to:
- Check session from Supabase directly
- Show loading spinner while checking
- Only redirect to login if no session exists
- Session persists in AsyncStorage automatically

### How It Works Now:
1. App starts → Shows loading spinner
2. Checks Supabase session in AsyncStorage
3. If session exists → Go to home
4. If no session → Go to login
5. Session auto-refreshes (Supabase handles this)

### Session Expiry:
- Supabase sessions last **1 hour** by default
- Auto-refreshes before expiry
- Only logs out if:
  - User manually signs out
  - Token is invalid
  - Refresh token expires (7 days default)

## ✅ What's Fixed

- ✅ Auth persistence on app reload
- ✅ No more flickering to login screen
- ✅ Session stored in AsyncStorage
- ✅ Auto token refresh

## 🚀 Next Steps

1. **Add your TMDB API key** to `.env`
2. **Restart the app**: `npm start`
3. **Sign up** with a new account
4. **Close and reopen** the app - should stay logged in!

## 🐛 If Movies Still Don't Load

Check the console for errors:
```bash
# Look for TMDB API errors
# Common issues:
# - Invalid API key
# - API key not set
# - Network error
```

Test your API key:
```bash
curl "https://api.themoviedb.org/3/movie/popular?api_key=YOUR_KEY"
```

Should return JSON with movies. If not, your key is invalid.

## 📝 Summary

**Before:**
- ❌ No TMDB API key
- ❌ Auth screen on every reload
- ❌ Session not persisting

**After:**
- ✅ Need to add TMDB API key (you do this)
- ✅ Auth persists across reloads
- ✅ Session stored securely
- ✅ Auto token refresh

Done! 🎉
