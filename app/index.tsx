import { Redirect } from "expo-router";
import { enableScreens } from "react-native-screens";

enableScreens();

export default function Index() {
  return <Redirect href="/(auth)/welcome" />;
}
