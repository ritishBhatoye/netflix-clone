import { useSupabaseUser } from "@/hooks/useSupabase";
import React from "react";
import { ActivityIndicator, Image, Text, View } from "react-native";

const UserInfo = () => {
  const { user, profile, loading } = useSupabaseUser();

  if (loading) {
    return (
      <View className="flex flex-row items-center">
        <ActivityIndicator size="small" />
      </View>
    );
  }

  return (
    <View className="flex flex-row items-center gap-3">
      {profile?.avatar_url && (
        <Image
          source={{ uri: profile.avatar_url }}
          className="w-10 h-10 rounded-full"
        />
      )}
      <View>
        <Text className="text-lg font-semibold">
          {profile?.username || user?.email?.split("@")[0] || "User"}
        </Text>
        <Text className="text-sm text-gray-500">{user?.email}</Text>
      </View>
    </View>
  );
};

export default UserInfo;
