import ChatCard from "@/components/ChatCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, TouchableOpacity, View } from "react-native";

const DEFAULT_CHATS = [
  {
    id: 1,
    profilePicture: "https://example.com/profile1.jpg",
    name: "Alice Doe",
    lastMessage: "Hello, how are you?",
    timestamp: "10:30 AM",
    unreadCount: 2,
  },
  {
    id: 2,
    profilePicture: "https://example.com/profile2.jpg",
    name: "John Smith",
    lastMessage: "Image",
    timestamp: "Yesterday",
    unreadCount: 0,
  },
];

const MessagesPage = () => {
  const [chats, setChats] = useState(DEFAULT_CHATS);
  const router = useRouter(); // Utiliser useRouter au lieu de navigation

  useEffect(() => {
    const fetchChats = async () => {
      const storedChats = await AsyncStorage.getItem("chats");
      if (storedChats) {
        setChats(JSON.parse(storedChats));
        return;
      }

      try {
        const response = await fetch("http://example.com/api/chats");
        if (response.ok) {
          const data = await response.json();
          setChats(data);
          await AsyncStorage.setItem("chats", JSON.stringify(data));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des chats :", error);
      }
    };

    fetchChats();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 16 }}>
      <TouchableOpacity
        className="absolute justify-between items-center w-16 h-16 rounded-lg z-30 right-2 bottom-20"
        onPress={() => router.push("/chat/new-message")} // Navigation avec router.push
      >
        <Image
          source={require("@/assets/icons/editer.png")}
          className="w-9 h-9"
        />
      </TouchableOpacity>

      <ScrollView>
        {chats.map((chat) => (
          <ChatCard
            key={chat.id}
            profilePicture={chat.profilePicture}
            name={chat.name}
            lastMessage={chat.lastMessage}
            timestamp={chat.timestamp}
            unreadCount={chat.unreadCount}
            onPress={() => router.push(`/chat/${chat.id}`)} // Navigation vers la page d'un chat
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default MessagesPage;
