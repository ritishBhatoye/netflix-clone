import React from "react";

import { ScrollView, Text, View } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import Button from "../atoms/Button";

type MediaDetailProps = {
  title: string;
  thumbnail: string;
  releaseYear: number;
  ageRestriction: string;
  duration: string;
  description: string;
  type: string;
};

const MediaDetailScreen = (props: MediaDetailProps) => {
  const {
    title,
    thumbnail,
    releaseYear,
    ageRestriction,
    duration,
    description,
    type,
  } = props;

  return (
    <View className="">
      <Image
        contentFit="cover"
        source={{ uri: thumbnail }}
        style={{ height: "40%" }}
      />
      <ScrollView>
        <Text className="text-base text-white font-bold text-start">
          {title}
        </Text>
        <View className="flex flex-row items-center gap-4">
          <Text className="text-sm font-normal text-tertiary-100">
            {releaseYear}
          </Text>
          <Text className="text-sm font-normal p-2 px-4 bg-tertiary-400 text-tertiary-100">
            {ageRestriction}
          </Text>
          <Text className="text-sm font-normal p-1 px-2 border-tertiary-100 border text-tertiary-100">
            HD
          </Text>
          <Text className="text-sm font-normal text-tertiary-100">
            {duration}
          </Text>
        </View>
        <View className="gap-3 my-4 mb-5">
          <Button variant="isWhite">
            <Ionicons name="play" size={24} color={"black"} />
            <Text className="text-lg text-black font-semibold">Play</Text>
          </Button>
          <Button variant="secondary">
            <Ionicons name="download" size={24} color={"white"} />
            <Text className="text-lg text-black font-semibold">Download</Text>
          </Button>
        </View>
        <Text className="text-sm font-medium text-tertiary-100">
          {description}
        </Text>
      </ScrollView>
    </View>
  );
};

export default MediaDetailScreen;
