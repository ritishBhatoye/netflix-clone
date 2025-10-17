import { Ionicons } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { FlatList, Modal, Text, TouchableOpacity, View } from "react-native";

const CATEGORIES = [
  "Action",
  "Comedy",
  "Drama",
  "Horror",
  "Sci-Fi",
  "Romance",
  "Thriller",
  "Documentary",
];

const FILTERS = ["Movies", "TV Shows", "Categories"];

const HomeAppBar = () => {
  const [selectedFilter, setSelectedFilter] = useState("Movies");
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleFilterPress = (filter: string) => {
    if (filter === "Categories") setShowCategoriesModal(true);
    else setSelectedFilter(filter);
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const applyCategories = () => {
    if (selectedCategories.length > 0) setSelectedFilter("Categories");
    setShowCategoriesModal(false);
  };

  return (
    <View className="px-4">
      {/* Header */}
      <View className="flex flex-row justify-between items-center mb-4">
        <Text className="text-white font-bold text-2xl">For Ritish</Text>
        <Ionicons name="search" color="#fff" size={24} />
      </View>

      {/* Filter Bar */}
      <View className="flex flex-row gap-3 mb-4">
        {FILTERS.map((filter) => {
          const isSelected = selectedFilter === filter;
          const baseClasses =
            "flex-row items-center px-4 py-2 rounded-full overflow-hidden";
          return (
            <TouchableOpacity
              key={filter}
              activeOpacity={0.8}
              onPress={() => handleFilterPress(filter)}
            >
              {isSelected ? (
                <LinearGradient
                  colors={["#E50914", "#111111"]} // Netflix Red → Deep Black
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={{
                    borderRadius: 16,
                    paddingVertical: 8,
                    paddingHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    shadowColor: "#E50914",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.3,
                    shadowRadius: 8,
                    elevation: 8, // Android shadow
                  }}
                >
                  <Text className="text-white font-semibold mr-1">
                    {filter}
                  </Text>
                  {filter === "Categories" && (
                    <Ionicons name="chevron-down" color="#fff" size={14} />
                  )}
                </LinearGradient>
              ) : (
                <BlurView
                  intensity={60}
                  tint="light"
                  className={`${baseClasses} bg-white/10 border border-white/20`}
                >
                  <Text className="text-white font-semibold mr-1">
                    {filter}
                  </Text>
                  {filter === "Categories" && (
                    <Ionicons name="chevron-down" color="#fff" size={14} />
                  )}
                </BlurView>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Categories Modal */}
      <Modal
        animationType="fade"
        transparent
        visible={showCategoriesModal}
        onRequestClose={() => setShowCategoriesModal(false)}
      >
        <BlurView
          intensity={90}
          tint="dark"
          className="flex-1 justify-center items-center"
        >
          <BlurView
            intensity={100}
            tint="light"
            className="w-4/5 max-h-[70%] rounded-3xl p-5"
          >
            {/* Header */}
            <View className="flex flex-row justify-between items-center mb-4">
              <Text className="text-white text-xl font-bold">
                Select Categories
              </Text>
              <TouchableOpacity onPress={() => setShowCategoriesModal(false)}>
                <Ionicons name="close" color="#fff" size={24} />
              </TouchableOpacity>
            </View>

            {/* Category List */}
            <FlatList
              data={CATEGORIES}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="flex-row justify-between items-center py-3 border-b border-white/10"
                  onPress={() => toggleCategory(item)}
                >
                  <Text className="text-white text-base">{item}</Text>
                  {selectedCategories.includes(item) && (
                    <Ionicons name="checkmark" color="#3B82F6" size={20} />
                  )}
                </TouchableOpacity>
              )}
            />

            {/* Apply Button */}
            <TouchableOpacity onPress={applyCategories} activeOpacity={0.9}>
              <LinearGradient
                colors={["#3B82F6", "#1E3A8A"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                className="mt-5 rounded-full py-2.5 items-center shadow-md shadow-blue-700/30"
              >
                <Text className="text-white font-semibold text-base">
                  Apply
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </BlurView>
      </Modal>
    </View>
  );
};

export default HomeAppBar;
