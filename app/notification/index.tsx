import NotificationItem from "@/components/NotificationItem";
import { DEFAULT_NOTIFICATIONS } from "@/constantes/constantes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Notification {
  id: number; // Identifiant unique
  title: string; // Titre
  message: string; // Message
  date: string; // Date formatée
  isRead: boolean; // Lu ou non
}

const NotificationsPage = () => {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState<Notification[]>(
    DEFAULT_NOTIFICATIONS
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        // Chargement initial : notifications par défaut
        setNotifications(DEFAULT_NOTIFICATIONS);

        // Étape 1 : Récupérer les notifications du stockage local
        const storedData = await AsyncStorage.getItem("notifications");
        if (storedData) {
          const parsedNotifications = JSON.parse(storedData);
          if (parsedNotifications && parsedNotifications.length > 0) {
            setNotifications(parsedNotifications);
            setLoading(false);
            return;
          }
        }

        // Étape 2 : Si le stockage local est vide, récupérer depuis le serveur
        const response = await fetch(
          "http://192.168.43.146:4012/user/notifications",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (data.notifications && data.notifications.length > 0) {
            setNotifications(data.notifications);
            await AsyncStorage.setItem(
              "notifications",
              JSON.stringify(data.notifications)
            );
          }
        }
      } catch (error) {
        console.error("Erreur lors du chargement des notifications :", error);
      }

      setLoading(false); // Fin du chargement
    };

    fetchNotifications();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-black">
      <View className="px-4 w-full flex-row justify-between">
        <TouchableOpacity
          className="mb-4"
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text className="font-black text-2xl text-white">&larr;</Text>
        </TouchableOpacity>
      </View>
      <Text className="mt-0 text-white font-black text-3xl self-center">
        Notifications
      </Text>
      <ScrollView className="p-4">
        {loading ? (
          <Text className="text-gray-400 text-center mt-4">
            Chargement des notifications...
          </Text>
        ) : (
          notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              title={notification.title}
              message={notification.message}
              date={notification.date}
              isRead={notification.isRead}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default NotificationsPage;
