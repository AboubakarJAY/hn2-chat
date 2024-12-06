import { createStackNavigator } from "@react-navigation/stack";
import ProfilePage from ".";

const Stack = createStackNavigator();

const customTransition = ({ current, next, layouts }: any) => {
  const translateY = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [layouts.screen.height, 0], // Slide depuis le bas
  });

  return {
    cardStyle: {
      transform: [{ translateY }],
    },
  };
};

const ProfileLayout = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        headerShown: false,
        cardStyleInterpolator: customTransition, // Transition personnalisée
      }}
    >
      <Stack.Screen name="Profile" component={ProfilePage} />
    </Stack.Navigator>
  );
};

export default ProfileLayout;
