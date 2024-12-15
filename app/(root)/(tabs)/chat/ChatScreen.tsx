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
  const { chatId } = useLocalSearchParams(); // Récupère l'ID du chat
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

      <View className="flex flex-row items-center p-4 bg-red-400">
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Écrire un message..."
          placeholderTextColor="#ccc"
          className="bg-orange-500"
          style={{
            flex: 1,
            // backgroundColor: "black",
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
