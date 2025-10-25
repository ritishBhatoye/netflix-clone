# Quick Setup Commands

## 1. Install Required Packages

```bash
npm install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

## 2. Remove Clerk (Optional)

```bash
npm uninstall @clerk/clerk-expo expo-secure-store
```

## 3. Restart Dev Server

```bash
npm start
```

## 4. Run Database Schema

1. Go to Supabase Dashboard → SQL Editor
2. Copy all content from `supabase/schema.sql`
3. Paste and click "Run"

## 5. Enable Email Auth

1. Go to **Authentication** → **Providers**
2. Enable **Email**
3. Turn OFF email confirmations (for development)

## 6. Test It!

1. Run your app
2. Go to Register screen
3. Create an account
4. Should redirect to home screen

Done! 🎉
