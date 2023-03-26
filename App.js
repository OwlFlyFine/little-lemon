import { useFonts } from "expo-font";
import OnboardingScreen from "./screens/Onboarding";

export default function App() {
  const [fontsLoaded] = useFonts({
    "MarkaziText-Regular": require("./assets/fonts/MarkaziText-Regular.ttf"),
    "Karla-Regular": require("./assets/fonts/Karla-Regular.ttf"),
  });

  if (!fontsLoaded) {
    return null;
  }

  return <OnboardingScreen />;
}
