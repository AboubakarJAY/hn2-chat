import React, { useState } from "react";
import { Alert, Button, Text, TextInput } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const EditProfile = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSave = async () => {
    // Simule une requête serveur
    try {
      // Appel à l'API pour sauvegarder
      Alert.alert("Succès", "Modifications enregistrées avec succès !");
    } catch (error) {
      Alert.alert("Erreur", "Impossible d'enregistrer vos modifications.");
    }
  };

  return (
    <ScrollView className="flex-1 p-4 bg-white">
      <Text className="text-lg font-bold">Modifier le profil</Text>
      <TextInput
        placeholder="Nom"
        value={name}
        onChangeText={setName}
        className="border p-2 mt-4"
      />
      <TextInput
        placeholder="Mot de passe"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
        className="border p-2 mt-4"
      />
      <Button title="Sauvegarder" onPress={handleSave} />
    </ScrollView>
  );
};

export default EditProfile;
