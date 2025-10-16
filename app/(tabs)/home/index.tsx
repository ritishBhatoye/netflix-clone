import mediaList from "@/assets/data/mediaList.json";
import {
  ActivityIndicator,
  FlatList,
  ScrollView,
  Text,
  View,
} from "react-native";

import EmptyState from "@/components/global/EmptyState";
import FeaturedMovie from "@/components/home/FeaturedMovie";
import MediaListItem from "@/components/MediaListItem";

import { useGetTrendingMoviesQuery } from "@/services/moviesApi";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  const {
    data: trending = [],
    isLoading: loading,
    error,
  } = useGetTrendingMoviesQuery();

  if (loading)
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color="#E50914" />
      </SafeAreaView>
    );
  if (error) return <EmptyState />;

  const featuredMovie = trending[0];
  console.log(trending[0]);
  // console.log("Trending :- ", JSON.stringify(trending, null, 2));
  return (
    <SafeAreaView>
      <ScrollView>
        <View className="flex flex-row justify-between">
          <Text className="text-white font-bold text-2xl">For Ritish</Text>

          <Ionicons name="search" color={"#ffffff"} size={24} />
        </View>
        {featuredMovie && <FeaturedMovie movie={featuredMovie} />}

        {/* Filters */}

        <FlatList
          data={mediaList}
          renderItem={({ item: verticalListItem }) => (
            <View>
              <Text className="text-white font-bold text-sm py-6">
                {verticalListItem.title}
              </Text>
              <FlatList
                horizontal
                data={verticalListItem.data}
                renderItem={({ item: horizontalListItem }) => (
                  <View className="px-2">
                    <MediaListItem mediaItem={horizontalListItem} />
                  </View>
                )}
              />
            </View>
          )}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
