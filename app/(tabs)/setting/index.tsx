import DownloadItem from "@/components/profile/DownloadItem";
import NotificationCard from "@/components/profile/NotificationCard";
import ProfileHeader from "@/components/profile/ProfileHeader";
import SectionHeader from "@/components/profile/SectionHeader";
import React from "react";
import { Image, ScrollView, View } from "react-native";

const Setting = () => {
  // Mock notification data
  const notifications = [
    {
      id: 1,
      thumbnail:
        "https://image.tmdb.org/t/p/w500/3V4kLQg0kSqPLctI5ziYWabAZYF.jpg",
      title: "Now available",
      subtitle: "Live episode",
      date: "Today",
      isNew: true,
    },
    {
      id: 2,
      thumbnail:
        "https://image.tmdb.org/t/p/w500/wWba3TaojhK7NdycRhoQpsG0FaH.jpg",
      title: "Coming 26 October",
      subtitle: "Get a first look today",
      date: "Yesterday",
      isNew: true,
    },
  ];

  // Mock download data
  const downloads = [
    {
      id: 1,
      thumbnail:
        "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
      episodeCount: "20 Episodes",
    },
    {
      id: 2,
      thumbnail:
        "https://image.tmdb.org/t/p/w500/4m1Au3YkjqsxF8iwQy0fPYSxE0h.jpg",
      episodeCount: "1 Episode",
      badge: "New Season",
    },
    {
      id: 3,
      thumbnail:
        "https://image.tmdb.org/t/p/w500/gdIrmf2DdY5mgN6ycVP0XlzKzbE.jpg",
      episodeCount: "4 Episodes",
    },
  ];

  // Mock liked content
  const likedContent = [
    "https://image.tmdb.org/t/p/w500/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    "https://image.tmdb.org/t/p/w500/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
    "https://image.tmdb.org/t/p/w500/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg",
    "https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg",
  ];

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="px-4">
        <ProfileHeader />

        {/* Notifications Section */}
        <View className="mb-6">
          <SectionHeader
            icon="notifications"
            title="Notifications"
            onPress={() => console.log("View all notifications")}
          />
          <View className="gap-4 mt-2">
            {notifications.map((notification) => (
              <NotificationCard key={notification.id} {...notification} />
            ))}
          </View>
        </View>

        {/* Downloads Section */}
        <View className="mb-6">
          <SectionHeader
            icon="download"
            title="Downloads"
            onPress={() => console.log("View all downloads")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
            contentContainerStyle={{ gap: 12 }}
          >
            {downloads.map((download) => (
              <DownloadItem key={download.id} {...download} />
            ))}
          </ScrollView>
        </View>

        {/* Liked Content Section */}
        <View className="mb-6">
          <SectionHeader
            icon="heart"
            title="Shows & Movies You have Liked"
            onPress={() => console.log("View all liked")}
          />
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mt-2"
            contentContainerStyle={{ gap: 8 }}
          >
            {likedContent.map((uri, index) => (
              <Image
                key={index}
                source={{ uri }}
                className="w-28 h-40 rounded"
                resizeMode="cover"
              />
            ))}
          </ScrollView>
        </View>
      </View>
    </ScrollView>
  );
};

export default Setting;
