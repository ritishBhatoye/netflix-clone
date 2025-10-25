import React from "react";
import { Image, Text, View } from "react-native";

interface NotificationCardProps {
  thumbnail: string;
  title: string;
  subtitle: string;
  date: string;
  isNew?: boolean;
}

const NotificationCard = ({
  thumbnail,
  title,
  subtitle,
  date,
  isNew = false,
}: NotificationCardProps) => {
  return (
    <View className="flex flex-row gap-3">
      {isNew && (
        <View className="w-2 h-2 bg-red-600 rounded-full mt-2 self-start" />
      )}
      <Image
        source={{ uri: thumbnail }}
        className="w-28 h-16 rounded"
        resizeMode="cover"
      />
      <View className="flex-1">
        <Text className="text-white font-semibold text-sm">{title}</Text>
        <Text className="text-gray-400 text-xs mt-1">{subtitle}</Text>
        <Text className="text-gray-500 text-xs mt-1">{date}</Text>
      </View>
    </View>
  );
};

export default NotificationCard;
