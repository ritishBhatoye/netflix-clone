import GlassTabBarBackground from "@/components/atoms/GlassTabBarBackground";
import { ICONS } from "@/constants/icons";
import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Tabs } from "expo-router";
import React from "react";
import { Animated, Text, View } from "react-native";

interface TabBarIconProps {
  focused: boolean;
  iconName?: string;
  title: string;
  icon?: any;
}

const TabBarIcon = ({ focused, iconName, title, icon }: TabBarIconProps) => {
  const scaleAnim = React.useRef(new Animated.Value(focused ? 1 : 0.9)).current;
  const opacityAnim = React.useRef(new Animated.Value(focused ? 1 : 0.6)).current;
  const blurOpacityAnim = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: focused ? 1 : 0.9,
        useNativeDriver: true,
        friction: 8,
        tension: 100,
      }),
      Animated.timing(opacityAnim, {
        toValue: focused ? 1 : 0.6,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(blurOpacityAnim, {
        toValue: focused ? 1 : 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  }, [focused]);

  return (
    <View className="mt-12 flex min-h-full min-w-40 items-center justify-center">
      <Animated.View
        style={{
          transform: [{ scale: scaleAnim }],
          opacity: opacityAnim,
        }}
      >
        {focused ? (
          <Animated.View style={{ opacity: blurOpacityAnim }}>
            <BlurView
              intensity={10} // ⬆️ thicker glass effect
              tint="systemThickMaterialDark"
              className="h-[60px] w-[60px] p-2"
              style={{
                borderRadius: 35,
                backgroundColor: "rgba(229, 9, 20, 0.65)", // ⬆️ stronger red tint for thicker glass
                borderWidth: 0,
                borderColor: "rgba(229, 9, 20, 0.7)", // ⬆️ more prominent border
                shadowColor: "#E50914",
                shadowOpacity: 0.6,
                shadowRadius: 50,
                shadowOffset: { width: 0, height: 4 },
                overflow: "hidden",
              }}
            >
              <View className="items-center justify-center gap-1 w-full">
                {iconName ? (
                  <Ionicons name={iconName as any} size={24} color="#ffffff" />
                ) : (
                  icon
                )}
                <Text className="text-[8px] w-full font-semibold text-center text-white">
                  {title}
                </Text>
              </View>
            </BlurView>
          </Animated.View>
        ) : (
          <View className="items-center justify-center w-full gap-1">
            {iconName ? (
              <Ionicons name={iconName as any} size={24} color="#4B5563" />
            ) : (
              icon
            )}
            <Text className="text-[10px] text-center font-semibold text-gray-600">
              {title}
            </Text>
          </View>
        )}
      </Animated.View>
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
