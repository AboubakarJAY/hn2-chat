import { Stack } from "expo-router";

const RootLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      {/* Navigation principale */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

      {/* Navigation modale */}
      <Stack.Screen
        name="(modal)"
        options={{
          presentation: "modal", // Transition modale
          headerShown: false,
        }}
      />
    </Stack>
  );
};

export default RootLayout;
