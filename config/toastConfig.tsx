import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import React from "react";
import { Text, View } from "react-native";

export const toastConfig = {
  success: (props: any) => (
    <View className="w-11/12 mx-auto">
      <BlurView
        intensity={80}
        tint="dark"
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(34, 197, 94, 0.15)",
          borderWidth: 1,
          borderColor: "rgba(34, 197, 94, 0.3)",
        }}
      >
        <View className="flex-row items-center p-4 gap-3">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(34, 197, 94, 0.3)" }}
          >
            <Ionicons name="checkmark-circle" size={24} color="#22c55e" />
          </View>
          <View className="flex-1">
            {props.text1 && (
              <Text className="text-white font-semibold text-base">
                {props.text1}
              </Text>
            )}
            {props.text2 && (
              <Text className="text-white/70 text-sm mt-1">{props.text2}</Text>
            )}
          </View>
        </View>
      </BlurView>
    </View>
  ),

  error: (props: any) => (
    <View className="w-11/12 mx-auto">
      <BlurView
        intensity={80}
        tint="dark"
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(229, 9, 20, 0.15)",
          borderWidth: 1,
          borderColor: "rgba(229, 9, 20, 0.3)",
        }}
      >
        <View className="flex-row items-center p-4 gap-3">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(229, 9, 20, 0.3)" }}
          >
            <Ionicons name="close-circle" size={24} color="#E50914" />
          </View>
          <View className="flex-1">
            {props.text1 && (
              <Text className="text-white font-semibold text-base">
                {props.text1}
              </Text>
            )}
            {props.text2 && (
              <Text className="text-white/70 text-sm mt-1">{props.text2}</Text>
            )}
          </View>
        </View>
      </BlurView>
    </View>
  ),

  info: (props: any) => (
    <View className="w-11/12 mx-auto">
      <BlurView
        intensity={80}
        tint="dark"
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(59, 130, 246, 0.15)",
          borderWidth: 1,
          borderColor: "rgba(59, 130, 246, 0.3)",
        }}
      >
        <View className="flex-row items-center p-4 gap-3">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(59, 130, 246, 0.3)" }}
          >
            <Ionicons name="information-circle" size={24} color="#3b82f6" />
          </View>
          <View className="flex-1">
            {props.text1 && (
              <Text className="text-white font-semibold text-base">
                {props.text1}
              </Text>
            )}
            {props.text2 && (
              <Text className="text-white/70 text-sm mt-1">{props.text2}</Text>
            )}
          </View>
        </View>
      </BlurView>
    </View>
  ),

  warning: (props: any) => (
    <View className="w-11/12 mx-auto">
      <BlurView
        intensity={80}
        tint="dark"
        className="rounded-2xl overflow-hidden"
        style={{
          backgroundColor: "rgba(251, 191, 36, 0.15)",
          borderWidth: 1,
          borderColor: "rgba(251, 191, 36, 0.3)",
        }}
      >
        <View className="flex-row items-center p-4 gap-3">
          <View
            className="w-10 h-10 rounded-full items-center justify-center"
            style={{ backgroundColor: "rgba(251, 191, 36, 0.3)" }}
          >
            <Ionicons name="warning" size={24} color="#fbbf24" />
          </View>
          <View className="flex-1">
            {props.text1 && (
              <Text className="text-white font-semibold text-base">
                {props.text1}
              </Text>
            )}
            {props.text2 && (
              <Text className="text-white/70 text-sm mt-1">{props.text2}</Text>
            )}
          </View>
        </View>
      </BlurView>
    </View>
  ),
};
