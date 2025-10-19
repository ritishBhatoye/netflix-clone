import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

const ShimmerEffect = ({ children }: { children: React.ReactNode }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const opacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });

  return (
    <Animated.View style={{ opacity }}>
      {children}
    </Animated.View>
  );
};

const HeroBannerSkeleton = () => {
  return (
    <View style={{ width, height: 500 }} className="relative px-5 pt-5">
      <ShimmerEffect>
        <View 
          style={{ width: width * 90 / 100, height: 450 }} 
          className="bg-gray-800 rounded-[30px]"
        />
      </ShimmerEffect>
      
      {/* Content overlay skeleton */}
      <View className="absolute bottom-0 left-0 right-0 p-14">
        <ShimmerEffect>
          <View className="bg-gray-700 h-8 w-3/4 rounded-md mb-3" />
        </ShimmerEffect>
        
        <ShimmerEffect>
          <View className="flex-row items-center mb-4">
            <View className="bg-gray-700 h-4 w-16 rounded-md" />
            <View className="w-1 h-1 bg-gray-600 rounded-full mx-2" />
            <View className="bg-gray-700 h-4 w-12 rounded-md" />
          </View>
        </ShimmerEffect>

        <View className="flex-row gap-3">
          <ShimmerEffect>
            <View className="flex-1 bg-gray-700 rounded-md h-12" />
          </ShimmerEffect>
          <ShimmerEffect>
            <View className="flex-1 bg-gray-700 rounded-md h-12" />
          </ShimmerEffect>
        </View>
      </View>
    </View>
  );
};

const MediaRowSkeleton = ({ title }: { title: string }) => {
  return (
    <View className="mb-6">
      <ShimmerEffect>
        <View className="bg-gray-700 h-6 w-32 rounded-md mx-4 mb-3" />
      </ShimmerEffect>
      <View className="flex-row px-4">
        {[1, 2, 3, 4].map((i) => (
          <ShimmerEffect key={i}>
            <View
              className="bg-gray-800 rounded-md mr-2"
              style={{ width: 110, height: 160 }}
            />
          </ShimmerEffect>
        ))}
      </View>
    </View>
  );
};

export default function HomeScreenSkeleton() {
  return (
    <View className="flex-1 bg-black">
      <HeroBannerSkeleton />
      <MediaRowSkeleton title="Top 10 Today" />
      <MediaRowSkeleton title="Only on Netflix" />
      <MediaRowSkeleton title="Popular" />
      <MediaRowSkeleton title="Action" />
      <MediaRowSkeleton title="Comedy" />
    </View>
  );
}
