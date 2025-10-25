import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const SettingTopBar = () => {
  const handleSearch = () => {
    console.log("Search pressed");
  };

  const handleCast = () => {
    console.log("Cast pressed");
  };

  const handleMenu = () => {
    console.log("Menu pressed");
  };

  return (
    <View className="flex flex-row items-center justify-between px-4 py-3">
      {/* Left side - Title */}
      <View className="flex-1">
        <Text className="text-white text-2xl font-bold">My Streaming</Text>
      </View>

      {/* Right side - Action buttons */}
      <View className="flex flex-row items-center gap-5">
        <TouchableOpacity
          onPress={handleCast}
          className="active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="tv-outline" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleSearch}
          className="active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="search" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleMenu}
          className="active:opacity-70"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="ellipsis-vertical" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingTopBar;
