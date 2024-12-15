import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

const NewMessage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (message.trim()) {
      console.log("Message envoyé :", message);
      router.back(); // Retourner à la page précédente
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black", padding: 16 }}>
      <TextInput
        value={message}
        onChangeText={setMessage}
        placeholder="Écrire un message..."
        placeholderTextColor="#ccc"
        style={{
          backgroundColor: "gray",
          color: "white",
          padding: 16,
          borderRadius: 8,
          marginBottom: 16,
        }}
      />
      <TouchableOpacity
        style={{
          backgroundColor: "green",
          padding: 16,
          borderRadius: 8,
        }}
        onPress={handleSendMessage}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Envoyer
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default NewMessage;
