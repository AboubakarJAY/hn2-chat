import AnimatedInputField from "@/components/AnimatedInputField";
import AsyncStorage from "@react-native-async-storage/async-storage"; // Importer AsyncStorage
import { router } from "expo-router";
import { useState } from "react";
import {
  Alert,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    general: "",
  });

  // Validation de l'email
  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validation du mot de passe
  const validatePassword = (password: string) => {
    return password.length >= 8; // Exemple de condition pour la longueur du mot de passe
  };

  // Fonction de validation
  const validateForm = () => {
    let valid = true;
    let newErrors = { email: "", password: "", general: "" };

    if (!form.email || !validateEmail(form.email)) {
      newErrors.email = "Email invalide";
      valid = false;
    }

    if (!form.password || !validatePassword(form.password)) {
      newErrors.password = "mot de passe incorect";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  // Mettre à jour les champs du formulaire
  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });

    // Réinitialiser l'erreur associée dès que l'utilisateur tape quelque chose
    setErrors({ ...errors, [field]: "", general: "" });
  };

  // Soumettre le formulaire au serveur local pour la connexion
  const submitForm = async () => {
    if (validateForm()) {
      try {
        const response = await fetch("http://192.168.43.146:4012/user/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });

        const data = await response.json();

        if (response.ok) {
          // Stocker le JWT dans AsyncStorage
          await AsyncStorage.setItem("jwtToken", data.token);
          Alert.alert("Succès", "Connexion réussie");

          // Rediriger vers la page d'accueil après connexion réussie
          // router.replace("/(root)/(tabs)/home");
        } else {
          // Afficher le message d'erreur envoyé par le serveur
          setErrors({
            ...errors,
            general: data.message || "Erreur de connexion",
          });
        }
      } catch (error) {
        Alert.alert("Erreur", "Impossible de se connecter au serveur");
      }
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      <SafeAreaView className="flex-1 mt-5 px-5 bg-gray-50 rounded-lg">
        <TouchableOpacity
          className="mb-4"
          onPress={() => {
            router.replace("/(auth)/welcome");
          }}
        >
          <Text className="font-black text-2xl text-black">&larr;</Text>
        </TouchableOpacity>
        <View className="items-center">
          <View className="items-center">
            <Text className="font-black text-3xl text-black">
              Heureux de vous revoir
            </Text>
            <Text className="text-lg text-gray-600 mt-2 text-center">
              Connectez-vous pour continuer
            </Text>
          </View>
        </View>

        {/* Formulaire */}
        <View className="mt-8">
          <AnimatedInputField
            placeholder="Entrer votre adresse mail"
            value={form.email}
            onChange={(value) => handleInputChange("email", value)}
            type="email"
            error={errors.email}
          />
          <AnimatedInputField
            placeholder="Entrer votre mot de passe"
            value={form.password}
            onChange={(value) => handleInputChange("password", value)}
            type="password"
            error={errors.password}
          />
        </View>
        {/* Erreur générale */}
        {errors.general ? (
          <Text className="text-red-500 text-center mt-2">
            {errors.general}
          </Text>
        ) : null}

        {/* Boutons */}
        <View className="mt-10 flex items-center">
          <TouchableOpacity
            onPress={submitForm}
            className="bg-black w-3/4 px-8 py-3 rounded-lg"
          >
            <Text className="text-white text-center font-bold">
              Se connecter
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-5 items-center">
          <Text className="text-gray-600">Ou</Text>
          <TouchableOpacity
            onPress={() => router.replace("/(root)/(tabs)/home")}
            // onPress={() => router.replace("/(auth)/signUp")}
            // router.replace("/(root)/(tabs)/home"); //Ajouter pour rediriger vers la page d'acceuil meme sans etre connecter
            className="mt-2"
          >
            <Text className="text-black font-black">Inscrivez-vous</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignIn;
