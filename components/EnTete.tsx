import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { DEFAULT_USER } from "../constantes/constantes";

const EnTete = () => {
  const router = useRouter();

  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des données utilisateur :",
          error
        );
      }
    };

    fetchUserData();
  }, []);

  return (
    <View className="flex flex-row items-center justify-between p-4 bg-blue-500 h-28 border-b border-gray-400">
      {/* Image de profil à gauche */}
      <TouchableOpacity onPress={() => router.push("/(modal)")}>
        <Image source={user.profilePicture} className="w-12 h-12 rounded-lg" />
      </TouchableOpacity>

      {/* Informations utilisateur */}
      <View className="ml-4 flex-1">
        <Text className="text-white text-lg font-bold">{user.name}</Text>
        <Text className="text-gray-400 font-medium text-lg">
          {user.lastNotification}
        </Text>
      </View>

      {/* Notifications à droite */}
      <TouchableOpacity className="relative w-10 h-10">
        {/* Image de la cloche */}
        <Image
          source={require("../assets/icons/bell.png")}
          className="w-10 h-10 -rotate-12"
        />

        {/* Cercle pour les notifications */}
        <View className="absolute top-0 right-0 w-5 h-5 bg-orange-400 border-2 border-white rounded-full flex items-center justify-center">
          <Text className="text-white text-xs font-bold">
            {user.unreadNotifications}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default EnTete;
