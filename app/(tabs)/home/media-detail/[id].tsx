import { useLocalSearchParams } from "expo-router";
import React from "react";

import { SafeAreaView, Text } from "react-native";

import mediaDetailList from "@/assets/data/mediaDetailedList.json";

const MovieDetail = () => {
  const { id }: { id: string } = useLocalSearchParams();

  const mediaItem = mediaDetailList.find((media) => media.id === id);

  return (
    <SafeAreaView className="h-full">
      <Text className="text-red-500">{id}</Text>
      <MediaDetailScreen />
    </SafeAreaView>
  );
};

export default MovieDetail;
