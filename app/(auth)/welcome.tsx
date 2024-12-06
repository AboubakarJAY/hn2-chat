import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  BackHandler,
  Dimensions,
  FlatList,
  Image,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    image: require("../../assets/images/icon.png"),
    title: "Bienvenue",
    description: "Connectez-vous facilement avec vos amis et vos proches.",
  },
  {
    id: "2",
    image: require("../../assets/images/profile.jpg"),
    title: "Partagez des moments",
    description: "Créez et partagez vos souvenirs en toute simplicité.",
  },
  {
    id: "3",
    image: require("../../assets/images/icon.png"),
    title: "Organisez vos événements",
    description: "Gérez vos rendez-vous et événements facilement.",
  },
];

export default function Onboarding() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex + 1) * width,
      });
      setCurrentIndex(currentIndex + 1);
    } else {
      router.replace("/(auth)/signUp"); // Redirection vers la page SignUp
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current?.scrollToOffset({
        offset: (currentIndex - 1) * width,
      });
      setCurrentIndex(currentIndex - 1);
      return true; // Empêche la fermeture de l'application
    }
    return false; // Permet la fermeture de l'application si on est sur le premier slide
  };

  const handleScroll = (event: any) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);
  };

  useEffect(() => {
    // Ajout d'un listener pour le bouton Retour
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      handleBack
    );

    return () => {
      backHandler.remove(); // Nettoyage
    };
  }, [currentIndex]);

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#3B82F6" />

      <TouchableOpacity
        onPress={() => router.replace("/(auth)/signUp")}
        className="absolute flex z-10 right-2 top-2 self-end w-14 items-center rounded-full bg-slate-300"
      >
        <Text className="text-gray-600 text-center">passer</Text>
      </TouchableOpacity>

      {/* Slider */}
      <FlatList
        data={slides}
        ref={flatListRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View
            style={{ width }}
            className="flex h-full items-center justify-center bg-white"
          >
            <Image source={item.image} className="w-64 h-64 mb-4" />
            <Text className="text-xl font-bold text-gray-800">
              {item.title}
            </Text>
            <Text className="text-2xl font-black text-gray-600 text-center mt-2 px-10">
              {item.description}
            </Text>
          </View>
        )}
      />

      {/* Barre de progression */}
      <View className="flex-row justify-center items-center mt-4">
        {slides.map((_, index) => (
          <View
            key={index}
            className={`h-2 w-2 rounded-full mx-1 ${
              index === currentIndex ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </View>

      {/* Bouton */}
      <View className="flex items-center justify-center mt-8 mb-4">
        <TouchableOpacity
          onPress={handleNext}
          className="bg-blue-500 w-40 px-8 py-3 rounded-full"
        >
          <Text className="text-white text-center font-bold">
            {currentIndex === slides.length - 1 ? "Get Started" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
