import React from "react";

import { View } from "react-native";

type MediaDetailProps = {
  title: string;
  releaseYear: number;
  ageRestriction: string;
  duration: string;
  description: string;
  type: string;
};

const MediaDetailScreen = (props: MediaDetailProps) => {
  return <View className="">MediaDetailScreen</View>;
};

export default MediaDetailScreen;
