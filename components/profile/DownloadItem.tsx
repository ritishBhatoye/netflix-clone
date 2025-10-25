import React from "react";
import { Image, Text, View } from "react-native";

interface DownloadItemProps {
  thumbnail: string;
  episodeCount: string;
  badge?: string;
}

const DownloadItem = ({
  thumbnail,
  episodeCount,
  badge,
}: DownloadItemProps) => {
  return (
    <View className="w-28">
      <View className="relative">
        <Image
          source={{ uri: thumbnail }}
          className="w-28 h-40 rounded"
          resizeMode="cover"
        />
        {badge && (
          <View className="absolute bottom-0 left-0 bg-red-600 px-2 py-1">
            <Text className="text-white text-xs font-bold">{badge}</Text>
          </View>
        )}
      </View>
      <Text className="text-white text-xs mt-2 text-center">
        {episodeCount}
      </Text>
    </View>
  );
};

export default DownloadItem;
