import IframeVideoPlayer from "@/components/atoms/VideoPlayer";
import React from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

const PlayerScreen = () => {
  const vidkingUrl = "https://www.vidking.net/embed/movie/1078605";

  // Custom fallback component
  const FallbackComponent = (
    <View style={styles.fallbackContainer}>
      <Text style={styles.fallbackText}>Video content not available</Text>
      <Button title="Try Again" onPress={() => window.location.reload()} />
    </View>
  );

  // Handle non-video content detection
  const handleNonVideoContent = () => {
    Alert.alert(
      "Content Redirect",
      "The content has been redirected to a non-video page. Would you like to go back?",
      [
        { text: "Go Back", onPress: () => console.log("Go back pressed") },
        { text: "Continue Anyway", style: "cancel" },
      ]
    );
  };

  return (
    <View style={styles.screen}>
      <IframeVideoPlayer
        videoEmbedUrl={vidkingUrl}
        onNonVideoContent={handleNonVideoContent}
        fallbackComponent={FallbackComponent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  fallbackText: {
    color: "white",
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
});

export default PlayerScreen;
