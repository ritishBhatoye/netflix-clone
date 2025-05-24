import { HapticTab } from "@/components/HapticTab";
import {
  Foundation,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <Foundation name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="new-and-hot"
        options={{
          title: "New & Hot",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              name="play-box-multiple-outline"
              size={24}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "My Netflix",
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons name="portrait" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
