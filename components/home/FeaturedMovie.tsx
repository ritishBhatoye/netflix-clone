import { ImageBackground } from "expo-image";
import React from "react";

import { View } from "react-native";
import Button from "../atoms/Button";

type FeatureMovieProps = {
  movie: MediaListData;
};

const FeaturedMovie = ({ movie }: FeatureMovieProps) => {
  return (
    <View className="">
      <ImageBackground>
        <View className="">
          <Button label="Play" />
        </View>
      </ImageBackground>
    </View>
  );
};

export default FeaturedMovie;
