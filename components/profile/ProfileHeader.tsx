import { useSupabaseUser } from "@/hooks/useSupabase";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

import { Image } from "expo-image";

const ProfileHeader = () => {
  const { user, profile, loading } = useSupabaseUser();

  if (loading) {
    return (
      <View className="items-center py-8">
        <ActivityIndicator size="small" color="#fff" />
      </View>
    );
  }

  const username = profile?.username || user?.email?.split("@")[0] || "User";

  return (
    <View className="items-center py-6">
      {profile?.avatar_url ? (
        <Image
          source={{ uri: profile.avatar_url }}
          style={{ width: 120, height: 120, borderRadius: 40 }}
          className="w-24 h-24 rounded-xl mb-4"
        />
      ) : (
        <View className="w-24 h-24 rounded-2xl bg-blue-500 items-center justify-center mb-4">
          <Text className="text-white text-4xl">
            {username.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}
      <TouchableOpacity className="flex flex-row items-center gap-2">
        <Text className="text-white text-xl font-semibold">{username}</Text>
        <Ionicons name="chevron-down" size={20} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;
