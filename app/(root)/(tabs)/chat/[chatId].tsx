import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

const ChatScreen = () => {
  const { chatId } = useLocalSearchParams(); // Récupération du chatId depuis l'URL
  const router = useRouter();
  const [messages, setMessages] = useState([
    { id: 1, sender: "Alice", content: "Hello!", type: "text" },
    { id: 2, sender: "Me", content: "Hi, how are you?", type: "text" },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([
        ...messages,
        { id: Date.now(), sender: "Me", content: newMessage, type: "text" },
      ]);
      setNewMessage("");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Liste des messages */}
      <ScrollView style={{ flex: 1, padding: 16 }}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={{
              marginBottom: 8,
              alignSelf: msg.sender === "Me" ? "flex-end" : "flex-start",
              backgroundColor: msg.sender === "Me" ? "green" : "gray",
              padding: 10,
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white" }}>{msg.content}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Champ pour écrire un message */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          padding: 16,
          backgroundColor: "gray",
        }}
      >
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Écrire un message..."
          placeholderTextColor="#ccc"
          style={{
            flex: 1,
            backgroundColor: "black",
            color: "white",
            padding: 12,
            borderRadius: 8,
          }}
        />
        <TouchableOpacity
          onPress={sendMessage}
          style={{
            marginLeft: 8,
            backgroundColor: "green",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <Text style={{ color: "white" }}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChatScreen;
