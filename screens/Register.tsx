import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { supabase } from "@/lib/supabase";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
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
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username || email.split("@")[0],
          },
        },
      });

      if (error) throw error;

      Toast.show({
        type: "success",
        text1: "Account created!",
        text2: "Welcome to Netflix",
        position: "top",
        visibilityTime: 2000,
      });

      router.replace("/(tabs)/home");
    } catch (error: any) {
      console.error("Sign up error:", error);
      Toast.show({
        type: "error",
        text1: "Sign up failed",
        text2: error.message || "Please try again",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      contentContainerClassName="min-h-full justify-center items-center gap-2 w-11/12 mx-auto py-10"
      showsVerticalScrollIndicator={false}
    >
      <Text className="text-white text-4xl font-bold mb-8">Create Account</Text>

      <Input
        placeholder="Email address"
        inputClassName="bg-tertiary-400/20"
        variant="borderless"
        value={email}
        onValueChange={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input
        placeholder="Username (optional)"
        inputClassName="bg-tertiary-400/20"
        variant="borderless"
        value={username}
        onValueChange={setUsername}
        autoCapitalize="none"
      />

      <Input
        placeholder="Password (min 6 characters)"
        value={password}
        onValueChange={setPassword}
        isPassword={true}
      />

      <Text className="text-white/50 text-xs text-center px-4 mt-2">
        Password must be at least 6 characters long
      </Text>

      <Button
        onPress={onSignUpPress}
        label={loading ? "Creating Account..." : "Sign Up"}
        variant="primary"
        fullWidth
        className="mt-5 w-fit"
        disabled={loading || !email || password.length < 6}
      />

      {loading && (
        <ActivityIndicator size="small" color="#E50914" className="mt-2" />
      )}

      <TouchableOpacity onPress={() => router.back()} className="mt-6">
        <Text className="text-white text-base">
          Already have an account?{" "}
          <Text className="font-semibold text-white">Sign in</Text>
        </Text>
      </TouchableOpacity>

      <Text className="text-tertiary-200 text-xs text-center py-5 px-4">
        By signing up, you agree to our Terms of Service and Privacy Policy
      </Text>
    </ScrollView>
  );
}
