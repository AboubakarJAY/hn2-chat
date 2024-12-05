import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Navigation principale */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Navigation pour les modales */}
      <Stack.Screen
        name="(modals)"
        options={{
          presentation: "modal", // Animation modale
          headerShown: false, // Pas de header natif
        }}
      />
    </Stack>
  );
};

export default RootLayout;
