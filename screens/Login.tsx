import { Text, View } from "react-native";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

export default function LoginScreen() {
  return (
    <View className="h-full">
      <Input label={""} placeholder={"Email or phone number"} />
      <Input
        // label="Password"
        placeholder="Password"
        // value={password}
        // onChange={setPassword}
        isPassword={true}
      />

      <Button label={"Sign In"} variant={"primary"} />

      <Text className="text-white/50 text-center font-light py-4">OR</Text>
    </View>
  );
}
