# 🎨 Toast Notifications - Usage Guide

Beautiful Netflix-style toast notifications with glass morphism effects!

## 🚀 Quick Usage

### Import the helper
```tsx
import { showToast } from "@/utils/toast";
```

### Show toasts
```tsx
// Success toast
showToast.success("Welcome back!", "You've successfully signed in");

// Error toast
showToast.error("Sign in failed", "Please check your credentials");

// Info toast
showToast.info("Check your email", "We sent you a verification code");

// Warning toast
showToast.warning("Session expiring", "Please save your work");
```

## 🎨 Toast Types

### Success (Green)
- Used for: Successful actions, confirmations
- Color: Green with glass effect
- Icon: Checkmark circle

### Error (Red)
- Used for: Errors, failed actions
- Color: Netflix red with glass effect
- Icon: Close circle

### Info (Blue)
- Used for: Informational messages
- Color: Blue with glass effect
- Icon: Information circle

### Warning (Yellow)
- Used for: Warnings, cautions
- Color: Yellow with glass effect
- Icon: Warning triangle

## 📍 Position

All toasts appear at the **top** of the screen by default. They automatically dismiss after:
- Success/Info: 2.5 seconds
- Error/Warning: 3 seconds

## 🎭 Features

✨ **Glass morphism effect** with blur
✨ **Smooth animations** (slide in/out)
✨ **Auto-dismiss** with configurable timing
✨ **Icon indicators** for each type
✨ **Two-line support** (title + message)
✨ **Netflix-themed colors**

## 🔧 Advanced Usage

### Direct Toast API
If you need more control:

```tsx
import Toast from "react-native-toast-message";

Toast.show({
  type: "success",
  text1: "Custom Title",
  text2: "Custom message",
  position: "top", // or "bottom"
  visibilityTime: 4000, // milliseconds
  autoHide: true,
  topOffset: 60, // custom offset
  onPress: () => {
    // Handle tap
  },
});
```

### Hide Toast Manually
```tsx
Toast.hide();
```

## 📱 Where It's Used

Currently implemented in:
- ✅ Login screen (success/error)
- ✅ Register screen (info/success/error)
- ✅ Sign out (success)

## 🎨 Customization

To customize toast styles, edit `config/toastConfig.tsx`:
- Change colors
- Adjust blur intensity
- Modify border styles
- Update icons
- Change animations

## 💡 Best Practices

1. **Keep messages short** - Users should be able to read them quickly
2. **Use appropriate types** - Match the toast type to the action
3. **Provide context** - Use text2 for additional details
4. **Don't overuse** - Too many toasts can be annoying
5. **Test timing** - Make sure users have time to read the message

## 🐛 Troubleshooting

**Toast not showing?**
- Make sure `<Toast />` is in your root layout
- Check that you're importing from the correct path
- Verify the toast config is imported

**Toast appears behind content?**
- Toast has high z-index by default
- Check if any components have higher z-index
- Adjust `topOffset` if needed

**Styling issues?**
- Make sure NativeWind is configured
- Check that expo-blur is installed
- Verify tailwind classes are working

---

**Enjoy your smooth toast notifications!** 🎉
