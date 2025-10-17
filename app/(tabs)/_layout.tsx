import GlassTabBarBackground from "@/components/atoms/GlassTabBarBackground";
import { ICONS } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  iconName?: string;
  title: string;
  icon?: any;
}

const TabBarIcon = ({ focused, iconName, title, icon }: TabBarIconProps) => {
  return (
    <View className="mt-12 flex min-h-full min-w-40 items-center justify-center">
      {focused ? (
        <BlurView
          intensity={55} // ⬆️ increased blur intensity for thicker background feel
          tint="systemThickMaterialDark" // deeper system tint
          className="h-20 w-20 p-2"
          style={{
            borderRadius: 35,
            backgroundColor: "rgba(229, 9, 20, 0.5)", // ⬆️ stronger red tint
            // borderWidth: 1.5,
            // borderColor: "rgba(229, 9, 20, 0.5)", // subtle border glow
            shadowColor: "#E50914",
            shadowOpacity: 0.4,
            shadowRadius: 40,
            shadowOffset: { width: 0, height: 3 },
            overflow: "hidden",
          }}
        >
          <View className="items-center justify-center gap-1">
            {iconName ? (
              <Ionicons name={iconName as any} size={24} color="#ffffff" />
            ) : (
              icon
            )}
            <Text className="text-sm font-semibold text-white">{title}</Text>
          </View>
        </BlurView>
      ) : (
        <View className="items-center justify-center gap-1">
          {iconName ? (
            <Ionicons name={iconName as any} size={24} color="#4B5563" />
          ) : (
            icon
          )}
          <Text className="text-sm font-semibold text-gray-600">{title}</Text>
        </View>
      )}
    </View>
  );
};

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,

        // Glass Effect
        tabBarBackground: () => <GlassTabBarBackground />,

        // Floating rounded style
        tabBarStyle: {
          position: "absolute",
          bottom: 40,
          marginHorizontal: 20,
          height: 80,
          borderRadius: 50,
          backgroundColor: "transparent", // must be transparent for blur to work
          overflow: "hidden", // ensures rounded corners
          shadowColor: "#000",
          shadowOpacity: 0.1,
          shadowRadius: 10,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon title="Home" iconName={ICONS.home} focused={focused} />
          ),
        }}
      />

      <Tabs.Screen
        name="new-and-hot"
        options={{
          title: "New & Hot",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              title="New & Hot"
              iconName={ICONS.newandhot}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "My Netflix",
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              title="My Netflix"
              iconName={ICONS.netflix}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
