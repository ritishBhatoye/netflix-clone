import { ImageBackground } from "expo-image";
import React from "react";

import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import Button from "../atoms/Button";

type FeatureMovieProps = {
  movie: MediaListData;
};

const FeaturedMovie = ({ movie }: FeatureMovieProps) => {
  return (
    <View className="">
      <ImageBackground source={{ uri: movie.image }}>
        <Text className="text-xs text-white font-thin">
          #1 {movie.type} Today
        </Text>
        <View className="flex flex-row justify-around">
          <Button>
            <Ionicons className="play" color={"#000000"} size={10} />
            <Text className="text-black">Play</Text>
          </Button>
          <Button>
            <Ionicons className="plus" color={"#000000"} size={10} />
            <Text className="text-white">My List</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FeaturedMovie;
