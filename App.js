import React, { useEffect, useState, useContext } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SplashScreen from "./screens/Splash";
import OnboardingScreen from "./screens/Onboarding";
import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import { getItem } from "./utils/asyncStorage";
import { Provider as AuthProvider } from "./contexts/authContext";
import { Context as AuthContext } from "./contexts/authContext";

const Stack = createNativeStackNavigator();

function App() {
  const { state } = useContext(AuthContext);
  console.log(state);
  const [isLoading, setIsLoading] = useState(true);
  const [onboardCompleted, setOnboardCompleted] = useState(false);

  useEffect(() => {
    (() => {
      setTimeout(() => {
        getOnboardState();
        setIsLoading(false);
      }, 1000);
    })();
  }, [state]);

  const getOnboardState = async () => {
    try {
      const jsonValue = await getItem("OnboardingCompleted");
      console.log("state ", jsonValue);
      setOnboardCompleted(jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const [fontsLoaded] = useFonts({
    "MarkaziText-Regular": require("./assets/fonts/MarkaziText-Regular.ttf"),
    "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
  });

  if (isLoading) {
    return <SplashScreen />;
  }

  if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {onboardCompleted && state.isOnboardingCompleted ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="Profile" component={ProfileScreen} />
          </>
        ) : (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
};
