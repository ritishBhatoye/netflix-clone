# Supabase Setup Guide

## 🚀 Quick Setup

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click "Start your project"
3. Sign up/Login (GitHub recommended)
4. Click "New Project"
5. Fill in:
   - **Name**: netflix-clone (or whatever you want)
   - **Database Password**: Create a strong password (SAVE THIS!)
   - **Region**: Choose closest to you
   - **Pricing Plan**: Free
6. Click "Create new project" (takes ~2 minutes)

### Step 2: Get Your API Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

### Step 3: Update .env File

Add these to your `.env` file:

```env
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 4: Run Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the SQL editor
5. Click "Run" (bottom right)
6. You should see "Success. No rows returned"

### Step 5: Configure Authentication

Since we're using Clerk for auth, we need to configure Supabase to work with it:

1. Go to **Authentication** → **Providers**
2. Disable email/password (we're using Clerk)
3. Go to **Settings** → **API**
4. Under "JWT Settings":
   - We'll use Clerk's JWT tokens
   - No additional config needed for now

### Step 6: Install Package

```bash
npm install @supabase/supabase-js
```

### Step 7: Restart Your Dev Server

```bash
npm start
```

## 📊 Database Tables Created

- **users** - User profiles (synced with Clerk)
- **favorites** - User's favorite movies/shows
- **watchlist** - Watch later list
- **ratings** - User ratings (1-5 stars)
- **comments** - User comments on movies/shows
- **watch_history** - Track what users watched

## 🔐 Security Features

- **Row Level Security (RLS)** enabled on all tables
- Users can only access their own data
- Comments are publicly readable
- Clerk JWT integration for authentication

## 🧪 Test Your Setup

After running the schema, test it:

1. Go to **Table Editor** in Supabase
2. You should see all 6 tables
3. Click on any table to view its structure

## 📝 Next Steps

1. Create user sync function (when user signs up with Clerk)
2. Create API hooks for favorites, watchlist, etc.
3. Add UI components for these features

## 🐛 Troubleshooting

**"Missing Supabase credentials" error?**
- Make sure `.env` has both URL and anon key
- Restart dev server after adding env vars

**SQL errors when running schema?**
- Make sure you copied the entire schema.sql file
- Run it in a fresh project
- Check for any syntax errors

**Can't connect to Supabase?**
- Check your internet connection
- Verify the URL is correct (no trailing slash)
- Make sure anon key is the public one, not the service key

## 📚 Resources

- [Supabase Docs](https://supabase.com/docs)
- [Supabase + React Native](https://supabase.com/docs/guides/getting-started/tutorials/with-expo-react-native)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
