import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";
import { useSignUp } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function RegisterScreen() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);

  const onSignUpPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      Toast.show({
        type: "info",
        text1: "Check your email",
        text2: `We sent a verification code to ${email}`,
        position: "top",
        visibilityTime: 3000,
      });
      setPendingVerification(true);
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Sign up failed",
        text2: err.errors?.[0]?.message || "Please try again",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  const onVerifyPress = async () => {
    if (!isLoaded) return;

    setLoading(true);
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        Toast.show({
          type: "success",
          text1: "Account created!",
          text2: "Welcome to Netflix",
          position: "top",
          visibilityTime: 2000,
        });
        router.replace("/(tabs)/home");
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2));
        Toast.show({
          type: "error",
          text1: "Verification failed",
          text2: "Please try again",
          position: "top",
        });
      }
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: "Verification failed",
        text2: err.errors?.[0]?.message || "Invalid code",
        position: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pendingVerification) {
    return (
      <View className="h-full justify-center items-center gap-4 w-11/12 mx-auto">
        <Text className="text-white text-3xl font-bold mb-4">Verify Email</Text>
        <Text className="text-white/70 text-center mb-4">
          We sent a verification code to {email}
        </Text>

        <Input
          placeholder="Enter verification code"
          value={code}
          onValueChange={setCode}
          keyboardType="number-pad"
          inputClassName="bg-tertiary-400/20 text-center text-2xl tracking-widest"
          variant="borderless"
        />

        <Button
          onPress={onVerifyPress}
          label={loading ? "Verifying..." : "Verify Email"}
          variant="primary"
          halfWidth
          className="mt-5"
          disabled={loading || !code}
        />

        {loading && (
          <ActivityIndicator size="small" color="#E50914" className="mt-2" />
        )}

        <TouchableOpacity onPress={() => setPendingVerification(false)}>
          <Text className="text-tertiary-200 text-sm mt-4">
            Wrong email? Go back
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

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
        placeholder="Password (min 8 characters)"
        value={password}
        onValueChange={setPassword}
        isPassword={true}
      />

      <Text className="text-white/50 text-xs text-center px-4 mt-2">
        Password must be at least 8 characters long
      </Text>

      <Button
        onPress={onSignUpPress}
        label={loading ? "Creating Account..." : "Sign Up"}
        variant="primary"
        halfWidth
        className="mt-5"
        disabled={loading || !email || password.length < 8}
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
