import { usePathname, useRouter } from "expo-router";
import { useEffect } from "react";
import {
  BackHandler,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";

const Navigation = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onBackPress = () => {
      if (pathname === "/(root)/(tabs)/home") {
        // L'utilisateur est sur la page d'accueil, ne pas revenir en arrière
        return true;
      } else {
        // Redirige vers la page d'accueil si le retour en arrière n'est pas possible
        router.replace("/(root)/(tabs)/home");
        return true;
      }
    };
    BackHandler.addEventListener("hardwareBackPress", onBackPress);

    return () =>
      BackHandler.removeEventListener("hardwareBackPress", onBackPress);
  }, [pathname]);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/home")}>
        <Image
          source={
            pathname === "/home"
              ? require("../assets/icons/home.png")
              : require("../assets/icons/home1.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/chat")}>
        <Image
          source={
            pathname === "/chat"
              ? require("../assets/icons/messages2.png")
              : require("../assets/icons/messages.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => router.replace("/(root)/(tabs)/contacts")}
      >
        <Image
          source={
            pathname === "/contacts"
              ? require("../assets/icons/user.png")
              : require("../assets/icons/user1.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.replace("/(root)/(tabs)/events")}>
        <Image
          source={
            pathname === "/events"
              ? require("../assets/icons/events1.png")
              : require("../assets/icons/events.png")
          }
          style={styles.icon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#3B82F6", // Blue-500 en Tailwind
    height: 60,
    position: "absolute",
    bottom: 0,
    width: "100%",
  },
  icon: {
    width: 28,
    height: 28,
    marginHorizontal: 10,
  },
});

export default Navigation;
