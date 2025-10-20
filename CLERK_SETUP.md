# Clerk Authentication Setup Guide

## 🚀 Quick Setup

### 1. Create a Clerk Account
1. Go to [https://dashboard.clerk.com](https://dashboard.clerk.com)
2. Sign up for a free account
3. Create a new application

### 2. Get Your Publishable Key
1. In your Clerk dashboard, go to **API Keys**
2. Copy your **Publishable Key** (starts with `pk_test_...`)
3. Update your `.env` file:
   ```
   EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

### 3. Configure OAuth Providers (Optional)
To enable social logins like Google, Apple, etc.:
1. In Clerk dashboard, go to **User & Authentication** → **Social Connections**
2. Enable the providers you want (Google, Apple, Facebook, etc.)
3. Follow the setup instructions for each provider

### 4. Configure Email Settings
1. Go to **User & Authentication** → **Email, Phone, Username**
2. Make sure **Email address** is enabled
3. Configure email verification settings

### 5. Test Your Setup
```bash
npm start
```

## 📱 Features Implemented

✅ Email/Password Sign Up with verification
✅ Email/Password Sign In
✅ Smooth animations and transitions
✅ Protected routes (auto-redirect based on auth state)
✅ Secure token storage with expo-secure-store
✅ Beautiful Netflix-style UI

## 🎨 Screens Created

- **Login Screen** (`screens/Login.tsx`)
  - Email/password authentication
  - Link to registration
  - Forgot password option

- **Register Screen** (`screens/Register.tsx`)
  - Email/password sign up
  - Email verification with code
  - Two-step process (register → verify)

## 🔐 How It Works

1. **User signs up** → Clerk sends verification email
2. **User enters code** → Account is verified
3. **User is redirected** → Automatically goes to home screen
4. **Session persists** → User stays logged in across app restarts

## 🛠️ Customization

### Add Social Logins
To add Google/Apple sign-in buttons, update `screens/Login.tsx`:

```tsx
import { useOAuth } from "@clerk/clerk-expo";

const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

// Add button
<Button
  onPress={() => startOAuthFlow()}
  label="Continue with Google"
/>
```

### Customize Email Templates
Go to Clerk Dashboard → **Customization** → **Emails** to customize verification emails.

## 📚 Next Steps

- [ ] Add forgot password flow
- [ ] Add profile management
- [ ] Add user settings screen
- [ ] Implement profile selection (choose-profile.tsx)
- [ ] Add biometric authentication
- [ ] Add session management

## 🐛 Troubleshooting

**Issue**: "Missing Publishable Key" error
- Make sure `.env` file exists and has the correct key
- Restart the dev server after adding the key

**Issue**: Email verification not working
- Check Clerk dashboard email settings
- Make sure email provider is configured

**Issue**: OAuth not working
- Configure OAuth redirect URLs in Clerk dashboard
- Add the correct scheme to `app.json`

## 📖 Documentation

- [Clerk Expo Docs](https://clerk.com/docs/quickstarts/expo)
- [Clerk React Native SDK](https://clerk.com/docs/references/react-native/overview)
