import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AnimatedPage from "../../components/animation/AnimatedPage";
import ProfilePage from "./index";

const Stack = createNativeStackNavigator();

const ModalsLayout = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        presentation: "modal",
        animation: "slide_from_right",
        headerShown: false,
      }}
    >
      <Stack.Screen name="Profile" component={ProfilePage} />
      <Stack.Screen name="AnimatedPage" component={AnimatedPage} />
    </Stack.Navigator>
  );
};

export default ModalsLayout;
