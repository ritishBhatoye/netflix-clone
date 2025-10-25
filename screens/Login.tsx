import Button from "@/components/atoms/Button";
import { default as Input } from "@/components/atoms/Input";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!email || !password) {
      Toast.show({
        type: "error",
        text1: "Missing fields",
        text2: "Please fill in all fields",
        position: "top",
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        // Handle specific error cases
        if (error.message.includes("Email not confirmed")) {
          Toast.show({
            type: "error",
            text1: "Email not confirmed",
            text2: "Please check your email and confirm your account",
            position: "top",
            visibilityTime: 4000,
          });
          return;
        }
        throw error;
      }

      Toast.show({
        type: "success",
        text1: "Welcome back!",
        text2: "You've successfully signed in",
        position: "top",
        visibilityTime: 2000,
      });

      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error("Sign in error:", error);
      Toast.show({
        type: "error",
        text1: "Sign in failed",
        text2: error.message || "Please check your credentials",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="h-full justify-center items-center gap-2 w-11/12 mx-auto">
      <Text className="text-white text-4xl font-bold mb-8">Sign In</Text>

      <Input
        placeholder="Email or phone number"
        inputClassName="bg-tertiary-400/20 text-white"
        variant="borderless"
        value={email}
        onValueChange={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input
        placeholder="Password"
        inputClassName="bg-tertiary-400/20 text-white"
        value={password}
        onValueChange={setPassword}
        isPassword={true}
      />

      <Button
        onPress={onSignInPress}
        label={loading ? "Signing In..." : "Sign In"}
        variant="primary"
        halfWidth
        className="mt-5"
        disabled={loading || !email || !password}
      />

      {loading && (
        <ActivityIndicator size="small" color="#E50914" className="mt-2" />
      )}

      <Text className="text-white/50 text-center font-light py-4">OR</Text>

      <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
        <Text className="text-white text-base">
          New to Netflix?{" "}
          <Text className="font-semibold text-white">Sign up now</Text>
        </Text>
      </TouchableOpacity>

      <TouchableOpacity className="mt-4">
        <Text className="text-tertiary-200 text-sm">Forgot Password?</Text>
      </TouchableOpacity>

      <Text className="text-tertiary-200 text-xs text-center py-5 px-4">
        Sign in is protected by reCAPTCHA to ensure you are not a bot.{" "}
        <Text className="font-semibold">Learn More</Text>
      </Text>
    </View>
  );
}
