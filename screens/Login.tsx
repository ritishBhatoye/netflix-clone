import { Text, View } from "react-native";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

export default function LoginScreen() {
  return (
    <View className="h-full justify-center items-center gap-2 w-11/12 mx-auto">
      <Input
        placeholder={"Email or phone number"}
        inputClassName="bg-tertiary-400/60"
        variant={"borderless"}
      />
      <Input
        placeholder="Password"
        // value={password}
        // onChange={setPassword}
        isPassword={true}
      />

      <Button
        label={"Sign In"}
        variant={"primary"}
        halfWidth
        className="mt-5"
      />

      <Text className="text-white/50 text-center font-light py-4">OR</Text>
      <Button
        label={"Use a Sign-In Code"}
        variant={"secondary"}
        size={"sm"}
        halfWidth
      />
      <Text className="text-tertiary-200 text-sm">Forgot Password?</Text>
      <Text className="text-tertiary-200 text-sm flex-row text-center py-5">
        Sign in is protected by Google reCAPTCHA to ensure you are not a bot.
        <Text className="font-semibold">Learn More</Text>
      </Text>
    </View>
  );
}
