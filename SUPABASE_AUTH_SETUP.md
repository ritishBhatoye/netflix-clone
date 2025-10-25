# Supabase Auth Setup (No Clerk!)

## 🎉 What Changed

We've removed Clerk and now use **Supabase Auth** for everything!

## 📦 Required Packages

Install these packages:

```bash
npm install @supabase/supabase-js @react-native-async-storage/async-storage react-native-url-polyfill
```

## 🗄️ Database Setup

1. Go to your Supabase dashboard → **SQL Editor**
2. Delete all existing tables if you ran the old schema
3. Run the updated `supabase/schema.sql` file

The new schema:
- Uses `auth.users` (Supabase's built-in auth table)
- Creates `public.profiles` table that references `auth.users`
- Auto-creates profile when user signs up
- Simpler RLS policies using `auth.uid()`

## 🔐 Enable Email Auth in Supabase

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Configure email settings:
   - **Enable email confirmations**: OFF (for development)
   - **Enable email change confirmations**: OFF (for development)
   - **Secure email change**: OFF (for development)

For production, turn these back ON!

## ✅ What Works Now

### Sign Up
```tsx
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      username: 'cooluser'
    }
  }
});
```

### Sign In
```tsx
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123'
});
```

### Sign Out
```tsx
await supabase.auth.signOut();
```

### Get Current User
```tsx
import { useSupabaseUser } from '@/hooks/useSupabase';

function MyComponent() {
  const { user, profile, userId, loading, isAuthenticated } = useSupabaseUser();
  
  if (loading) return <Text>Loading...</Text>;
  if (!isAuthenticated) return <Text>Please log in</Text>;
  
  return <Text>Welcome {profile?.username}!</Text>;
}
```

## 🎯 Using with RTK Query

All the Supabase API hooks still work the same:

```tsx
import { useGetFavoritesQuery } from '@/services/supabaseApi';
import { useSupabaseUser } from '@/hooks/useSupabase';

function FavoritesScreen() {
  const { userId } = useSupabaseUser();
  const { data: favorites } = useGetFavoritesQuery(userId!, {
    skip: !userId
  });
  
  return (
    <FlatList
      data={favorites}
      renderItem={({ item }) => <MovieCard movie={item} />}
    />
  );
}
```

## 🔄 Session Management

Supabase automatically:
- ✅ Persists sessions in AsyncStorage
- ✅ Auto-refreshes tokens
- ✅ Handles session expiry
- ✅ Syncs across app restarts

## 🚀 Protected Routes

Create a simple auth guard:

```tsx
import { useSupabaseUser } from '@/hooks/useSupabase';
import { Redirect } from 'expo-router';

export default function ProtectedScreen() {
  const { isAuthenticated, loading } = useSupabaseUser();
  
  if (loading) return <LoadingScreen />;
  if (!isAuthenticated) return <Redirect href="/(auth)/login" />;
  
  return <YourProtectedContent />;
}
```

## 📧 Email Templates (Optional)

Customize email templates in Supabase:
1. Go to **Authentication** → **Email Templates**
2. Customize:
   - Confirmation email
   - Password reset
   - Magic link
   - Email change

## 🎨 Benefits Over Clerk

1. **Free forever** - No usage limits
2. **Simpler** - No external service
3. **Faster** - Direct database access
4. **More control** - You own the data
5. **Better integration** - Same database for auth + app data

## 🐛 Troubleshooting

**"Invalid login credentials"**
- Check email/password are correct
- Make sure user exists in auth.users table

**"User already registered"**
- Email is already taken
- Use sign in instead

**Profile not created**
- Check the trigger `on_auth_user_created` exists
- Check function `handle_new_user()` exists
- Look at Supabase logs for errors

**Session not persisting**
- Make sure AsyncStorage is installed
- Check app permissions

## 🔥 Next Steps

1. ✅ Remove Clerk packages: `npm uninstall @clerk/clerk-expo`
2. ✅ Test sign up flow
3. ✅ Test sign in flow
4. ✅ Test favorites/watchlist with new auth
5. ✅ Add password reset flow
6. ✅ Add profile editing

You're all set! 🎉
