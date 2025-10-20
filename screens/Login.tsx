import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useSignIn } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function LoginScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const signInAttempt = await signIn.create({
        identifier: email,
        password,
      });

      if (signInAttempt.status === "complete") {
        await setActive({ session: signInAttempt.createdSessionId });
        Toast.show({
          type: "success",
          text1: "Welcome back!",
          text2: "You've successfully signed in",
          position: "top",
          visibilityTime: 2000,
        });
        router.replace("/(tabs)/home");
      } else {
        console.error(JSON.stringify(signInAttempt, null, 2));
        Toast.show({
          type: "error",
          text1: "Sign in failed",
          text2: "Please try again",
          position: "top",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Sign in failed",
        text2: err.errors?.[0]?.message || "Please check your credentials",
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
        inputClassName="bg-tertiary-400/20"
        variant="borderless"
        value={email}
        onValueChange={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <Input
        placeholder="Password"
        inputClassName="bg-tertiary-400/20"
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
        Sign in is protected by Google reCAPTCHA to ensure you are not a bot.{" "}
        <Text className="font-semibold">Learn More</Text>
      </Text>
    </View>
  );
}
