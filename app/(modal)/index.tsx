import EventList from "@/components/EventList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { router, useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  Modal,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DEFAULT_USER } from "../../constantes/constantes";

const ProfilePage = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState(DEFAULT_USER);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        } else {
          const response = await fetch(
            "http://192.168.1.100:3000/api/user-profile"
          );
          if (response.ok) {
            const serverUser = await response.json();
            setUser(serverUser);
            await AsyncStorage.setItem("user", JSON.stringify(serverUser));
          } else {
            console.warn("Impossible de récupérer les données du serveur.");
          }
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfilePicture = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const uri = result.assets[0].uri;

        // Convertir l'image en Blob pour FormData
        const response = await fetch(uri);
        const blob = await response.blob();

        const formData = new FormData();
        formData.append("profilePicture", blob, "profile.jpg");

        const serverResponse = await fetch(
          "http://192.168.1.100:3000/api/update-profile",
          {
            method: "POST",
            headers: {
              Accept: "application/json",
            },
            body: formData,
          }
        );

        if (serverResponse.ok) {
          const updatedUser = await serverResponse.json();
          setUser({ ...user, profilePicture: updatedUser.profilePicture });
          await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
          Alert.alert("Succès", "Votre photo de profil a été mise à jour.");
        } else {
          throw new Error("Échec de la mise à jour de la photo de profil.");
        }
      }
    } catch (error) {
      Alert.alert("Erreur", "Problème de connexion.");
      console.error(
        "Erreur lors de la mise à jour de la photo de profil :",
        error
      );
    }
  };

  return (
    <ScrollView className="flex-1 bg-black">
      <View className="w-full flex items-center bg-black h-64 p-4">
        <View className="flex flex-row justify-between w-full">
          <TouchableOpacity
            className="mb-4"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Text className="font-black text-2xl text-white">&larr;</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/edit")}
            className="bg-transparent"
          >
            <Image
              source={require("../../assets/icons/parametres.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
        </View>
        <View className="relative">
          <TouchableOpacity
            className="absolute bottom-0 right-0 -rotate-90 z-20 w-6 h-6"
            onPress={handleEditProfilePicture}
          >
            <Image
              source={require("../../assets/icons/crayon.png")}
              className="w-6 h-6"
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setImageModalVisible(true)}>
            <Image
              source={user.profilePicture}
              className="w-24 h-24 mt-8 rounded-full"
            />
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={isImageModalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setImageModalVisible(false)}
      >
        <View className="flex-1 bg-black justify-center items-center">
          <TouchableOpacity
            style={{ position: "absolute", top: 40, right: 20 }}
            onPress={() => setImageModalVisible(false)}
          >
            <Text className="text-white text-2xl">×</Text>
          </TouchableOpacity>
          <Image
            source={user.profilePicture}
            className="w-full h-4/5"
            resizeMode="contain"
          />
        </View>
      </Modal>

      <View className="w-full bg-white p-4 mt-8">
        <Text className="text-3xl text-black font-black mt-2">
          {user.name.toUpperCase()}
        </Text>
        <Text className="text-gray-500">{user.email}</Text>
        <View className="flex flex-row w-full justify-between mt-4 text-xl ">
          <TouchableOpacity
            onPress={() => Alert.alert("Abonnés")}
            className="flex bg-gray-300 w-40 px-2"
          >
            <Text className="font-black text-sm text-black">
              {user.followers}
            </Text>
            <Text className="text-gray-800 text-xs">suivis</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => Alert.alert("Abonnements")}
            className="flex bg-gray-300 w-40 px-2"
          >
            <Text className="font-black text-sm text-black">
              {user.following}
            </Text>
            <Text className="text-gray-800 text-xs">abonnés</Text>
          </TouchableOpacity>
        </View>
        <EventList />
      </View>
    </ScrollView>
  );
};

export default ProfilePage;
