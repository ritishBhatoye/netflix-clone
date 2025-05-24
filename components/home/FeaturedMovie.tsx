import { ImageBackground } from "expo-image";
import React from "react";

import { View } from "react-native";

type FeatureMovieProps = {
  movie: MediaListData;
};

const FeaturedMovie = ({ movie }: FeatureMovieProps) => {
  return (
    <View className="">
      <ImageBackground>
        <View className=""></View>
      </ImageBackground>
    </View>
  );
};

export default FeaturedMovie;
