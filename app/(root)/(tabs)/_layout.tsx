import EnTete from "@/components/EnTete";
import Navigation from "@/components/Navigation"; // Composant de navigation persistante
import { Slot } from "expo-router"; // Slot pour afficher les pages enfants dynamiques
import { SafeAreaView, StatusBar } from "react-native";

const TabLayout = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Barre d'état (Statut du téléphone) */}

      {/* En-tête de l'application */}
      <EnTete />
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      {/* Contenu de la page */}
      <Slot />

      {/* Barre de navigation persistante */}
      <Navigation />
    </SafeAreaView>
  );
};

export default TabLayout;
