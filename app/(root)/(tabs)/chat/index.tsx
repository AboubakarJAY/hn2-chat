import ChatCard from "@/components/ChatCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";

const DEFAULT_CHATS = [
  {
    id: 1,
    profilePicture: "https://example.com/profile1.jpg",
    name: "Alice Doe",
    lastMessage: "Hello, how are you?",
    timestamp: "10:30 AM",
    unreadCount: 4,
  },
  {
    id: 2,
    profilePicture: "https://example.com/profile2.jpg",
    name: "John Smith",
    lastMessage: "Image",
    timestamp: "Yesterday",
    unreadCount: 6,
  },
];

// Définir le type des chats
interface Chat {
  id: number;
  profilePicture: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
}

const MessagesPage = () => {
  const [chats, setChats] = useState<Chat[]>([]); // Préciser le type du tableau
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const storedChats = await AsyncStorage.getItem("chats");
        if (storedChats) {
          setChats(JSON.parse(storedChats)); // TypeScript sait que ce sont des objets Chat
        } else {
          setChats(DEFAULT_CHATS); // Utilisation de la constante typée
          await AsyncStorage.setItem("chats", JSON.stringify(DEFAULT_CHATS));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des chats :", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []);

  const sortedChats = chats.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 16 }}>
      {loading ? (
        <Text style={{ color: "white", textAlign: "center", marginTop: 20 }}>
          Chargement...
        </Text>
      ) : (
        <>
          <TouchableOpacity
            className="absolute justify-between items-center w-16 h-16 rounded-lg z-30 right-2 bottom-20"
            onPress={() => router.push("/chat/new-message")}
          >
            <Image
              source={require("@/assets/icons/editer.png")}
              className="w-9 h-9"
            />
          </TouchableOpacity>

          {sortedChats.length === 0 ? (
            <Text
              style={{ color: "white", textAlign: "center", marginTop: 20 }}
            >
              Aucun chat disponible.
            </Text>
          ) : (
            <ScrollView>
              {sortedChats.map((chat) => (
                <ChatCard
                  key={chat.id}
                  profilePicture={chat.profilePicture}
                  name={chat.name}
                  lastMessage={chat.lastMessage}
                  timestamp={chat.timestamp}
                  unreadCount={chat.unreadCount}
                  onPress={() => router.push(`/chat/${chat.id}`)}
                />
              ))}
            </ScrollView>
          )}
        </>
      )}
    </View>
  );
};

export default MessagesPage;
