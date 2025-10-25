import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface SectionHeaderProps {
  icon: any;
  title: string;
  onPress?: () => void;
}

const SectionHeader = ({ icon, title, onPress }: SectionHeaderProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-row items-center justify-between py-3"
      disabled={!onPress}
    >
      <View className="flex flex-row items-center gap-3">
        <Ionicons name={icon} size={24} color="#fff" />
        <Text className="text-white text-lg font-semibold">{title}</Text>
      </View>
      {onPress && <Ionicons name="chevron-forward" size={24} color="#666" />}
    </TouchableOpacity>
  );
};

export default SectionHeader;
