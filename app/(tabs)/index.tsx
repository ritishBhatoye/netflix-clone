import React from "react";

import mediaList from "@/assets/data/mediaList.json";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import FeaturedMovie from "@/components/home/FeaturedMovie";
import MediaListItem from "@/components/MediaListItem";
import { FilterData } from "@/constants/home";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <FeaturedMovie movie={mediaList} />
      <View className="flex flex-row justify-between">
        <Text className="text-white font-bold text-2xl">For Ritish</Text>

        <Ionicons name="search" color={"#ffffff"} size={24} />
      </View>

      {/* Filters */}

      <View className="flex flex-row gap-10 mt-10">
        {FilterData.map((filter) => (
          <TouchableOpacity activeOpacity={0.5} key={filter.id} className="">
            <Text className="font-bold text-white text-sm rounded-full border-2 border-white p-1.5 px-5">
              {filter.title}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
    </SafeAreaView>
  );
};

export default HomeScreen;
