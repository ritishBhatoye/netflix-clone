import React from "react";
import { ActivityIndicator, ScrollView, Text, View } from "react-native";
import { useHomeContent } from "../../hooks/useHomeContent";
import FeaturedMovie from "./FeaturedMovie";
import MediaRow from "./MediaRow";
import Top10MediaRow from "./Top10MediaRow";

const HomeContent = () => {
  const {
    featured,
    top10,
    onlyOnNetflix,
    popular,
    nowPlaying,
    genres,
    isLoading,
    isError,
  } = useHomeContent();

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <ActivityIndicator size="large" color="#E50914" />
        <Text className="text-white mt-4">Loading content...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View className="flex-1 items-center justify-center bg-black px-4">
        <Text className="text-white text-lg font-bold mb-2">
          Oops! Something went wrong
        </Text>
        <Text className="text-gray-400 text-center">
          Unable to load content. Please check your connection and try again.
        </Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-black" showsVerticalScrollIndicator={false}>
      {/* Featured/Hero Section */}
      {featured.data && featured.data.length > 0 && (
        <View className="mb-6">
          <FeaturedMovie movie={featured.data[0]} />
        </View>
      )}

      {/* Top 10 Today */}
      <Top10MediaRow
        title="Top 10 Movies Today"
        data={top10.movies}
        isLoading={top10.isLoading}
      />

      {/* Only on Netflix */}
      <MediaRow
        title="Only on Netflix"
        data={onlyOnNetflix.movies}
        isLoading={onlyOnNetflix.isLoading}
      />

      {/* Trending Now */}
      <MediaRow
        title="Trending Now"
        data={featured.data}
        isLoading={featured.isLoading}
      />

      {/* Popular on Netflix */}
      <MediaRow
        title="Popular on Netflix"
        data={popular.data}
        isLoading={popular.isLoading}
      />

      {/* Now Playing */}
      <MediaRow
        title="Now Playing"
        data={nowPlaying.data}
        isLoading={nowPlaying.isLoading}
      />

      {/* Action Movies */}
      <MediaRow title="Action Movies" data={genres.action} />

      {/* Comedy */}
      <MediaRow title="Comedy" data={genres.comedy} />

      {/* Horror */}
      <MediaRow title="Horror" data={genres.horror} />

      {/* Romance */}
      <MediaRow title="Romance" data={genres.romance} />

      {/* Documentaries */}
      <MediaRow title="Documentaries" data={genres.documentaries} />

      {/* Bottom Spacing */}
      <View className="h-8" />
    </ScrollView>
  );
};

export default HomeContent;
