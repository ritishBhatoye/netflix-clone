import { Ionicons } from "@expo/vector-icons";
import { ImageBackground } from "expo-image";
import React from "react";
import { Text, View } from "react-native";
import Button from "../atoms/Button";

type FeatureMovieProps = {
  movie: {
    title: string;
    poster_path: string;
    media_type: string;
  };
};

const FeaturedMovie = ({ movie }: FeatureMovieProps) => {
  const imageUri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  return (
    <View className="px-16">
      <ImageBackground
        source={{ uri: imageUri }}
        contentFit="cover"
        style={{
          borderRadius: 40,
          height: "50%",
          flexGrow: 1,
          justifyContent: "flex-end",
          alignItems: "center",
        }}
      >
        <Text className="text-white font-bold text-lg py-2">
          #1 {movie.media_type?.toUpperCase()} Today
        </Text>
        <View className="flex flex-row gap-4 px-8">
          <Button variant="primary" halfWidth>
            <Ionicons name="play" color="white" size={20} />
            <Text className="text-white text-base font-bold ml-2">Play</Text>
          </Button>
          <Button variant="tertiary" halfWidth>
            <Ionicons name="add" color="white" size={16} />
            <Text className="text-white font-bold text-base ml-2">My List</Text>
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default FeaturedMovie;
