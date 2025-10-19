import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import React from "react";
import { Dimensions, Text, TouchableOpacity, View } from "react-native";

interface HeroBannerProps {
  movie?: FeaturedMovieProps;
}

const { width } = Dimensions.get("window");
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/original";

const HeroBanner = ({ movie }: HeroBannerProps) => {
  if (!movie) {
    return (
      <View style={{ width, height: 500 }} className="bg-gray-900">
        <View className="flex-1 items-center justify-center">
          <Text className="text-gray-500">No featured content</Text>
        </View>
      </View>
    );
  }

  const backdropUri = movie.backdrop_path
    ? `${TMDB_IMAGE_BASE}${movie.backdrop_path}`
    : null;

  return (
    <View style={{ width, height: 500 }} className="relative">
      {/* Backdrop Image */}
      {backdropUri ? (
        <Image
          source={{ uri: backdropUri }}
          contentFit="cover"
          style={{ width, height: 500 }}
        />
      ) : (
        <View className="bg-gray-800 w-full h-full" />
      )}

      {/* Gradient Overlay */}
      <LinearGradient
        colors={["transparent", "rgba(0,0,0,0.7)", "rgba(0,0,0,0.95)"]}
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: 300,
        }}
      />

      {/* Content */}
      <View className="absolute bottom-0 left-0 right-0 px-4 pb-6">
        <Text className="text-white text-3xl font-bold mb-2">
          {movie.title}
        </Text>
        
        <View className="flex-row items-center mb-4">
          <Text className="text-gray-300 text-sm">
            {movie.release_date?.split("-")[0]}
          </Text>
          <View className="w-1 h-1 bg-gray-400 rounded-full mx-2" />
          <Text className="text-gray-300 text-sm">
            ⭐ {movie.vote_average.toFixed(1)}
          </Text>
        </View>

        {/* Action Buttons */}
        <View className="flex-row gap-3">
          <Link href={`/(tabs)/home/media-detail/${movie.id}`} asChild>
            <TouchableOpacity className="flex-1 bg-white rounded-md py-3 items-center justify-center flex-row">
              <Text className="text-black font-semibold text-base">▶ Play</Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity className="flex-1 bg-gray-700/80 rounded-md py-3 items-center justify-center flex-row">
            <Text className="text-white font-semibold text-base">+ My List</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default HeroBanner;
