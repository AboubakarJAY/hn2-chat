import React, { useEffect } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const { width } = Dimensions.get("window"); // Récupère la largeur de l'écran

export default function AnimatedPage() {
  const translateX = useSharedValue(-width); // Commence en dehors de l'écran (à gauche)

  // Lancement de l'animation à l'affichage de la page
  useEffect(() => {
    translateX.value = withTiming(0, { duration: 500 }); // Anime jusqu'à la position finale (0)
  }, []);

  // Style animé
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={[styles.box, animatedStyle]}>
        <Text style={styles.text}>Bienvenue sur la page animée !</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  box: {
    width: "80%",
    height: "30%",
    backgroundColor: "#6200ea",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
});
