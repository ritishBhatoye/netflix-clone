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
      <View style={{ width, height: 650 }} className="bg-gray-900">
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
   
      <View style={{ width, height: 500 }} className="relative ">
      {/* Backdrop Image */}
      {backdropUri ? (
        <Image
          source={{ uri: backdropUri }}
          contentFit="cover"
          style={{ width: width * 90 / 100, height: 450, margin: 20,marginTop:20, borderRadius: 30 }}
        />
      ) : (
        <View className="bg-gray-800 w-full h-full" />
      )}

      {/* Strong Gradient Overlay - Covers entire image */}
      <LinearGradient
        colors={[
          "rgba(0,0,0,0)",
          "rgba(0,0,0,0.3)",
          "rgba(0,0,0,0.5)",
          "rgba(0,0,0,0.98)"
        ]}
        locations={[0, 0.3, 0.6, 1]}
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          top: 20,
          bottom: 20,
          borderRadius: 30
        }}
      />

      {/* Extra Bottom Gradient for content area */}
      <LinearGradient
        colors={[
          "transparent",
          "rgba(0,0,0,0.7)",
          "rgba(0,0,0,0.95)"
        ]}
        locations={[0, 0.5, 1]}
        style={{
          position: "absolute",
          left: 20,
          right: 20,
          bottom: 20,
          height: 300,
          borderBottomLeftRadius: 30,
          borderBottomRightRadius: 30
        }}
      />
      <View className="absolute bottom-0 left-0 right-0 p-14  ">
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
