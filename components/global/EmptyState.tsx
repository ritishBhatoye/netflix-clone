import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type EmptyStateProps = {
  message?: string;
};

const EmptyState = ({ message = "No Data Found" }: EmptyStateProps) => {
  return (
    <View style={styles.container}>
      <LottieView
        source={require("@/assets/global/emptyStateLoader.json")}
        autoPlay
        loop
        style={styles.animation}
      />
      <Text style={styles.message}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#000", // Netflix dark theme
  },
  animation: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  message: {
    color: "#E50914", // Netflix red
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

export default EmptyState;
