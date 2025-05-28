import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerO }}>
      <Stack.Screen name={"login"} />
    </Stack>
  );
}
