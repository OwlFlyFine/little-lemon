import React, { useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import OnboardingScreen from "./screens/Onboarding";
import HomeScreen from "./screens/Home";
import ProfileScreen from "./screens/Profile";
import SplashScreen from "./screens/Splash";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState(null);

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("onboard");
      setState(jsonValue != null ? JSON.parse(jsonValue) : null);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

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

  console.log("app state -", state);

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        {state?.isOnboardingCompleted ? (
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
