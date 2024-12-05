import React, { useRef, useState } from "react";
import { Animated, StyleSheet, TextInput, View } from "react-native";

interface AnimatedInputFieldProps {
  placeholder: string; // Texte du placeholder
  value: string; // Valeur actuelle du champ
  onChange: (text: string) => void; // Callback pour la modification
  type?: "text" | "email" | "password"; // Type du champ (texte, email, mot de passe)
  error?: string; // Message d'erreur optionnel
}

const AnimatedInputField: React.FC<AnimatedInputFieldProps> = ({
  placeholder,
  value,
  onChange,
  type = "text",
  error = "",
}) => {
  const [isFocused, setIsFocused] = useState(false);

  // Création d'une animation pour la position du label
  const animatedLabel = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(animatedLabel, {
      toValue: 1, // Position de fin de l'animation
      duration: 300,
      useNativeDriver: false, // Les styles de position ne prennent pas en charge `native driver`
    }).start();
  };

  const handleBlur = () => {
    if (!value) {
      setIsFocused(false);
      Animated.timing(animatedLabel, {
        toValue: 0, // Retour à la position initiale
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  };

  // Calculer les styles animés en fonction de la progression de l'animation
  const labelStyle = {
    top: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [14, -10], // Position initiale et finale
    }),
    fontSize: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12], // Taille initiale et finale
    }),
    color: animatedLabel.interpolate({
      inputRange: [0, 1],
      outputRange: error ? ["#DC2626", "#DC2626"] : ["#9CA3AF", "#3B82F6"], // Couleur pour l'erreur ou normal
    }),
  };

  return (
    <View style={styles.container}>
      {/* Label animé ou erreur */}
      <Animated.Text style={[styles.label, labelStyle]}>
        {error || placeholder}
      </Animated.Text>

      {/* Champ de saisie */}
      <TextInput
        value={value}
        onChangeText={(text) => {
          if (error) setIsFocused(true); // Reset du label si erreur
          onChange(text);
        }}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={isFocused ? "" : placeholder}
        placeholderTextColor="transparent" // Rendre le placeholder natif invisible
        secureTextEntry={type === "password"}
        keyboardType={type === "email" ? "email-address" : "default"}
        style={[
          styles.input,
          error && { borderBottomColor: "#DC2626" }, // Bordure rouge si erreur
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    position: "relative",
  },
  label: {
    position: "absolute",
    left: 12,
  },
  input: {
    height: 50,
    borderBottomWidth: 1,
    borderBottomColor: "#9CA3AF",
    fontSize: 16,
    color: "#111827",
    paddingHorizontal: 10,
  },
});

export default AnimatedInputField;
