import { useLocalSearchParams } from "expo-router";
import React from "react";

import { SafeAreaView } from "react-native-safe-area-context";

import mediaDetailList from "@/assets/data/mediaDetailedList.json";
import MediaDetailScreen from "@/components/global/MediaDetailScreen";

const MovieDetail = () => {
  const { id }: { id: string } = useLocalSearchParams();

  const mediaItem = mediaDetailList.find((media) => media.id === id);

  const {
    title,
    thumbnail,
    releaseYear,
    ageRestriction,
    duration,
    description,
    type,
  }: any = mediaItem;

  return (
    <SafeAreaView className="h-full">
      <MediaDetailScreen
        title={title}
        thumbnail={thumbnail}
        releaseYear={releaseYear}
        ageRestriction={ageRestriction}
        duration={duration}
        description={description}
        type={type}
      />
    </SafeAreaView>
  );
};

export default MovieDetail;
