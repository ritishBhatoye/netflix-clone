import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

const ProfileAppBar = () => {
  return (
    <TouchableOpacity className="flex flex-row items-center justify-between">
      <Text className="text-2xl font-semibold">My Netflix </Text>
      <View className="flex flex-row items-center gap-2">
        <Ionicons name="tv-outline" color={"#ffffff"} size={20} />
        <Ionicons name="search-outline" color={"#ffffff"} size={20} />
        <Ionicons
          name="ellipsis-vertical-outline"
          color={"#ffffff"}
          size={20}
        />
      </View>
    </TouchableOpacity>
  );
};

export default ProfileAppBar;
