import SettingTopBar from "@/components/profile/SettingTopBar";
import { Stack } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SettingLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          header: () => (
            <SafeAreaView>
              <SettingTopBar />
            </SafeAreaView>
          ),
        }}
      />
      <Stack.Screen name="media-detail" options={{ headerShown: false }} />
    </Stack>
  );
};

export default SettingLayout;
