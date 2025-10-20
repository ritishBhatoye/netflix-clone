import { useAuth, useUser } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

export default function UserBar() {
  const { user } = useUser();
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    Alert.alert("Sign Out", "Are you sure you want to sign out?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Sign Out",
        style: "destructive",
        onPress: async () => {
          await signOut();
          Toast.show({
            type: "success",
            text1: "Signed out",
            text2: "See you next time!",
            position: "top",
            visibilityTime: 2000,
          });
          router.replace("/(auth)/login");
        },
      },
    ]);
  };

  const firstName =
    user?.firstName ||
    user?.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "User";

  return (
    <View className="flex flex-row justify-between items-center mb-4 px-5">
      <Text className="text-white font-bold text-2xl">For {firstName}</Text>
      <View className="flex-row gap-4 flex items-center">
        <TouchableOpacity>
          <Ionicons name="tv-outline" size={24} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Ionicons name="search" color="#fff" size={24} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <Ionicons name="person-circle-outline" size={28} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
