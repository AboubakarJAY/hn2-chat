import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  BackHandler,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import AnimatedInputField from "@/components/AnimatedInputField";
import { SafeAreaView } from "react-native-safe-area-context";

const SignUp = () => {
  const [form, setForm] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    nom: "",
    email: "",
    password: "",
    confirmPassword: "",
    general: "",
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    let valid = true;
    let newErrors = {
      nom: "",
      email: "",
      password: "",
      confirmPassword: "",
      general: "",
    };

    if (!form.nom) {
      newErrors.nom = "Le nom est requis";
      valid = false;
    }

    if (!form.email || !validateEmail(form.email)) {
      newErrors.email = "Email invalide";
      valid = false;
    }

    if (form.password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
      valid = false;
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleInputChange = (field: keyof typeof form, value: string) => {
    setForm({ ...form, [field]: value });
    setErrors({ ...errors, [field]: "", general: "" });
  };

  const submitForm = async () => {
    if (validateForm()) {
      try {
        const response = await fetch(
          "http://192.168.43.146:4012/user/register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
          }
        );

        const data = await response.json();

        if (response.ok) {
          await AsyncStorage.setItem("token", data.token);
          Alert.alert("Succès", "Inscription réussie");
          router.replace("/(root)/(tabs)/home");
        } else {
          setErrors({
            ...errors,
            general: data.message || "Erreur lors de l'inscription",
          });
        }
      } catch (error) {
        Alert.alert("Erreur", "Impossible de se connecter au serveur");
      }
    }
  };

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        router.replace("/(auth)/welcome");
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );

  return (
    <ScrollView className="flex-1 bg-white">
      <SafeAreaView className="flex-1 mt-5 px-5 bg-gray-50 rounded-lg">
        {/* En-tête */}
        <TouchableOpacity
          onPress={() => router.replace("/(auth)/welcome")}
          className="mb-4"
        >
          <Text className="font-black text-2xl text-black">&larr;</Text>
        </TouchableOpacity>

        <View className="items-center">
          <Text className="font-black text-3xl text-blue-500">Bienvenue</Text>
          <Text className="text-lg text-gray-600 mt-2 text-center">
            Inscrivez-vous pour commencer.
          </Text>
        </View>

        {/* Formulaire */}
        <View className="mt-8">
          <AnimatedInputField
            placeholder="Entrer votre adresse mail"
            value={form.nom}
            onChange={(value) => handleInputChange("nom", value)}
            type="text"
            error={errors.nom}
          />
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
          <AnimatedInputField
            placeholder="Confirmer le mot de passe"
            value={form.confirmPassword}
            onChange={(value) => handleInputChange("confirmPassword", value)}
            type="password"
            error={errors.confirmPassword}
          />
        </View>

        {/* Erreur générale */}
        {errors.general && (
          <Text className="text-red-500 text-center mt-2">
            {errors.general}
          </Text>
        )}

        {/* Boutons */}
        <View className="mt-10 flex items-center">
          <TouchableOpacity
            onPress={submitForm}
            className="bg-blue-500 w-3/4 px-8 py-3 rounded-full"
          >
            <Text className="text-white text-center font-bold">
              Créer le compte
            </Text>
          </TouchableOpacity>
        </View>

        <View className="mt-5 items-center">
          <Text className="text-gray-600">Ou</Text>
          <TouchableOpacity
            onPress={() => router.replace("/(auth)/signIn")}
            className="mt-2"
          >
            <Text className="text-blue-500 font-black">Connectez-vous</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;
