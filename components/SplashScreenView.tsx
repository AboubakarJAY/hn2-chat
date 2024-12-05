import { Image, View } from "react-native";

export default function SplashScreen() {
  return (
    <View className="flex-1">
      <Image
        source={require("../assets/images/splash2.png")}
        className="flex bg-white w-full h-full"
      />
    </View>
  );
}
