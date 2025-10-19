import { Ionicons } from "@expo/vector-icons"
import { Text, TouchableOpacity, View } from "react-native"

export default function UserBar(){
    return (
  <View className="flex flex-row justify-between items-center mb-4 px-5">
        <Text className="text-white font-bold text-2xl">For Ritish</Text>
        <View className='flex-row gap-4 flex items-center'>
            <TouchableOpacity>
     <Ionicons name="tv-outline" size={24} color="#fff" />
</TouchableOpacity>
  <TouchableOpacity>
        <Ionicons name="search" color="#fff" size={24} />
</TouchableOpacity>
        </View>
      </View>
    )
}

