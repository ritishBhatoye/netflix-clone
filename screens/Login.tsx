import { View } from "react-native";

import Input from "@/components/atoms/Input";

export default function LoginScreen() {
  return (
    <View className="h-full">
      <Input label={""} placeholder={"Email or phone number"} />
      <Input label={""} placeholder={"Password"} />
    </View>
  );
}
