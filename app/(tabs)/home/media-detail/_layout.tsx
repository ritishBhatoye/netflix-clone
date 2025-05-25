import { Stack } from "expo-router";
import React from "react";

const MediaDetailLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="[id]" />
    </Stack>
  );
};

export default MediaDetailLayout;
