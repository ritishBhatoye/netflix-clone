import { Image } from "expo-image";
import { Link } from "expo-router";
import React from "react";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

interface Top10MediaRowProps {
  title: string;
  data?: FeaturedMovieProps[] | TVShowProps[];
  isLoading?: boolean;
}

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const Top10MediaRow = ({ title, data, isLoading }: Top10MediaRowProps) => {
  if (isLoading) {
    return (
      <View className="mb-6">
        <Text className="text-white text-lg font-bold px-4 mb-3">{title}</Text>
        <View className="flex-row px-4">
          {[1, 2, 3].map((i) => (
            <View key={i} className="mr-2 flex-row">
              <View
                className="bg-gray-800 rounded-md"
                style={{ width: 110, height: 160 }}
              />
            </View>
          ))}
        </View>
      </View>
    );
  }

  if (!data || data.length === 0) {
    return null;
  }

  const renderItem = ({
    item,
    index,
  }: {
    item: FeaturedMovieProps | TVShowProps;
    index: number;
  }) => {
    const posterPath = item.poster_path;
    const imageUri = posterPath ? `${TMDB_IMAGE_BASE}${posterPath}` : null;
    const mediaId = item.id;
    const rank = index + 1;

    return (
      <Link href={`/(tabs)/home/media-detail/${mediaId}`} asChild>
        <TouchableOpacity className="mr-3 flex-row items-end">
          {/* Rank Number */}
          <Text
            className="text-white font-black mr-1"
            style={{
              fontSize: 100,
              lineHeight: 100,
              textShadowColor: "rgba(0, 0, 0, 0.75)",
              textShadowOffset: { width: -2, height: 2 },
              textShadowRadius: 5,
            }}
          >
            {rank}
          </Text>

          {/* Poster Image */}
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
        data={data?.slice(0, 10)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default Top10MediaRow;
