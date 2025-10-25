import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

interface props {
  tile: TileCtaType;
}

const TileCTA = ({ tile }: props) => {
  return (
    <TouchableOpacity
      onPress={tile.handleOnPress}
      className="flex flex-row items-center justify-between rounded-lg p-4 bg-gray-800 active:bg-gray-700"
    >
      <View className="flex flex-row items-center gap-3">
        <Ionicons name={tile.trailingIcon} size={24} color={"#ffffff"} />
        <Text className="text-white text-base font-medium">{tile.title}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={"#9ca3af"} />
    </TouchableOpacity>
  );
};

export default TileCTA;
