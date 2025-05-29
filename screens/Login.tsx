import { Text, View } from "react-native";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

export default function LoginScreen() {
  return (
    <View className="h-full justify-center items-center bg-tertiary-400/60">
      <Input
        label={""}
        inputClassName="border-white"
        placeholder={"Email or phone number"}
        // className="border-red-500"
      />
      <Input
        // label="Password"
        placeholder="Password"
        // value={password}
        // onChange={setPassword}
        isPassword={true}
      />

      <Button label={"Sign In"} variant={"primary"} />

      <Text className="text-white/50 text-center font-light py-4">OR</Text>
      <Button label={"Use a Sign-In Code"} variant={"primary"} />
      <Text className="text-tertiary-200 text-sm">Forgot Password?</Text>
      <Text className="text-tertiary-200 text-sm flex-row text-center py-5">
        Sign in is protected by Google reCAPTCHA to ensure you are not a bot.
        <Text className="font-semibold">Learn More</Text>
      </Text>
    </View>
  );
}
