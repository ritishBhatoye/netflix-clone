import React from "react";

import mediaList from "@/assets/data/mediaList.json";
import {
  FlatList,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { FilterData } from "@/constants/Hosme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <View className="flex flex-row justify-between">
        <Text className="text-white font-bold text-2xl">For Ritish</Text>

        <Ionicons name="search" color={"#ffffff"} size={24} />
      </View>

      {/* Filters */}

      <View className="flex flex-row gap-10">
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
                <View className="">
                  <Image
                    source={{ uri: horizontalListItem.image }}
                    style={{ width: 110, aspectRatio: 3 / 4 }}
                  />
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
