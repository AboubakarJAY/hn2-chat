import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DEFAULT_USER } from "../../constantes/constantes";

const ProfilePage = () => {
  const [user, setUser] = useState(DEFAULT_USER);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <ScrollView className="flex-1 bg-white p-4">
      <View className="items-center">
        {/* Photo de profil */}
        <Image
          source={user.profilePicture}
          className="w-32 h-32 rounded-full border-2 border-gray-300"
        />
        {/* Nom et email */}
        <Text className="text-xl font-bold mt-4">{user.name}</Text>
        <Text className="text-gray-500">{user.email}</Text>

        {/* Boutons d'actions */}
        <TouchableOpacity
          onPress={() => Alert.alert("Abonnés")}
          className="bg-blue-500 mt-6 px-4 py-2 rounded"
        >
          <Text className="text-white">Abonnés : {user.followers}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => Alert.alert("Abonnements")}
          className="bg-blue-500 mt-2 px-4 py-2 rounded"
        >
          <Text className="text-white">Abonnements : {user.following}</Text>
        </TouchableOpacity>

        {/* Bouton Modifier */}
        <TouchableOpacity
          onPress={() => router.push("/edit")}
          className="bg-orange-500 mt-6 px-6 py-3 rounded"
        >
          <Text className="text-white font-bold">Modifier le profil</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
