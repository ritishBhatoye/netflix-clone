import TileCTA from "@/components/profile/TileCTA";
import UserInfo from "@/components/profile/UserInfo";
import React from "react";
import { ScrollView, View } from "react-native";

const Setting = () => {
  const tileData: TileCtaType[] = [
    {
      trailingIcon: "notifications-outline",
      title: "Notifications",
      handleOnPress: () => {
        console.log("Notifications pressed");
      },
    },
    {
      trailingIcon: "download-outline",
      title: "Downloads",
      handleOnPress: () => {
        console.log("Downloads pressed");
      },
    },
    {
      trailingIcon: "heart-outline",
      title: "Shows & Movies You have liked",
      handleOnPress: () => {
        console.log("Liked content pressed");
      },
    },
    {
      trailingIcon: "settings-outline",
      title: "App Settings",
      handleOnPress: () => {
        console.log("Settings pressed");
      },
    },
    {
      trailingIcon: "help-circle-outline",
      title: "Help",
      handleOnPress: () => {
        console.log("Help pressed");
      },
    },
    {
      trailingIcon: "log-out-outline",
      title: "Sign Out",
      handleOnPress: () => {
        console.log("Sign out pressed");
      },
    },
  ];

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="p-4 gap-6">
        <UserInfo />
        <View className="gap-3 mt-4">
          {tileData.map((tile, index) => (
            <TileCTA key={index} tile={tile} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
};

export default Setting;
