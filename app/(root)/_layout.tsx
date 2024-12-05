import { Stack } from "expo-router";

const Layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Le Slot charge dynamiquement les pages */}
    </Stack>
  );
};

export default Layout;
