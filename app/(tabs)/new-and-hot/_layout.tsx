import { Stack } from "expo-router";
import React from "react";

const NewAndHotLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
};

export default NewAndHotLayout;
