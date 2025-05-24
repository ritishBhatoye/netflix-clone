import mediaList from "@/assets/data/mediaList.json";
import React from "react";
import { FlatList, SafeAreaView, Text } from "react-native";

const HomeScreen = () => {
  return (
    <SafeAreaView>
      <FlatList
        contentContainerClassName="flex flex-row items-center p-5 gap-4"
        data={mediaList}
        renderItem={({ item }) => (
          <Text className="text-white font-bold text-sm p-2 border rounded-full border-white">
            {item.title}
          </Text>
        )}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;
