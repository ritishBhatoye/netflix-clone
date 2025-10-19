import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface MediaRowProps {
  title: string;
  data?: FeaturedMovieProps[] | TVShowProps[];
  isLoading?: boolean;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MediaRow = ({ title, data, isLoading }: MediaRowProps) => {
  if (isLoading) {
    return (
      <View className="mb-6">
        <Text className="text-white text-lg font-bold px-4 mb-3">{title}</Text>
        <View className="flex-row px-4">
          {[1, 2, 3].map((i) => (
            <View
              key={i}
              className="bg-gray-800 rounded-md mr-2"
              style={{ width: 110, height: 160 }}
            />
          ))}
        </View>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const renderItem = ({ item }: { item: FeaturedMovieProps | TVShowProps }) => {
    const posterPath = item.poster_path;
    const imageUri = posterPath ? `${TMDB_IMAGE_BASE}${posterPath}` : null;
    const mediaId = item.id;

    return (
      <Link href={`/(tabs)/home/media-detail/${mediaId}`} asChild>
        <TouchableOpacity className="mr-2">
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              contentFit="cover"
              style={{ width: 110, height: 160, borderRadius: 5 }}
            />
          ) : (
            <View
              className="bg-gray-700 rounded-md items-center justify-center"
              style={{ width: 110, height: 160 }}
            >
              <Text className="text-gray-500 text-xs">No Image</Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>
    );
  };

  return (
    <View className="mb-6">
      <Text className="text-white text-lg font-bold px-4 mb-3">{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default MediaRow;
