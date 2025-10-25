# Migration from Clerk to Supabase Auth

## ✅ What Was Done

### 1. Removed Clerk
- ❌ Removed `@clerk/clerk-expo` from `app/_layout.tsx`
- ❌ Removed Clerk environment variables
- ❌ Removed ClerkProvider and ClerkLoaded wrappers

### 2. Added Supabase Auth
- ✅ Updated `lib/supabase.ts` with AsyncStorage for session persistence
- ✅ Created new auth screens (`screens/Register.tsx`, `screens/Login.tsx`)
- ✅ Updated `hooks/useSupabase.ts` to use Supabase auth
- ✅ Simplified app layout

### 3. Updated Database Schema
- ✅ Changed from `users` table to `public.profiles` table
- ✅ Profiles now reference `auth.users` (Supabase's built-in auth)
- ✅ Added trigger to auto-create profile on signup
- ✅ Updated all RLS policies to use `auth.uid()` instead of Clerk JWT
- ✅ Updated all foreign keys to reference `public.profiles`

### 4. Files Changed
- `lib/supabase.ts` - Added auth config
- `supabase/schema.sql` - Complete rewrite for Supabase auth
- `screens/Register.tsx` - New Supabase auth signup
- `screens/Login.tsx` - New Supabase auth login
- `app/_layout.tsx` - Removed Clerk
- `hooks/useSupabase.ts` - New hook for Supabase auth
- `.env` - Removed Clerk keys

### 5. Files Created
- `SUPABASE_AUTH_SETUP.md` - Setup guide
- `MIGRATION_SUMMARY.md` - This file

## 📦 Required Packages

```bash
npm install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

## 🗑️ Remove Clerk

```bash
npm uninstall @clerk/clerk-expo expo-secure-store
```

## 🔄 Next Steps

1. **Install packages** (see above)
2. **Run updated schema** in Supabase SQL Editor
3. **Enable email auth** in Supabase dashboard
4. **Test signup/login** flows
5. **Delete old Clerk users** (if any)

## 🎯 Key Differences

| Feature | Clerk | Supabase |
|---------|-------|----------|
| Auth Provider | External | Built-in |
| User Table | `users` with `clerk_id` | `auth.users` + `public.profiles` |
| Session Storage | SecureStore | AsyncStorage |
| User ID | `clerk_id` | `auth.uid()` |
| Email Verification | Required | Optional |
| Cost | Paid after limits | Free forever |

## 🚀 Benefits

1. **Simpler** - One service for everything
2. **Cheaper** - Free forever
3. **Faster** - No external API calls
4. **More control** - You own the data
5. **Better DX** - Integrated with your database

## ⚠️ Breaking Changes

- All existing users need to re-register
- User IDs are different (UUID from Supabase, not Clerk)
- All user data (favorites, watchlist, etc.) will be reset

## 🎉 You're Done!

Your app now uses Supabase for everything:
- ✅ Authentication
- ✅ Database
- ✅ User profiles
- ✅ Favorites, watchlist, ratings, comments
- ✅ Session management

No more Clerk! 🎊
