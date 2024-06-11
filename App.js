import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Home } from "./screens/Home";
import { Main } from "./screens/Main";

const Stack = createNativeStackNavigator();

export default function App() {
  const BGImage = require("./assets/nextflix-home-bg.jpeg");
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="Nextflix" component={Main} options={{ headerStyle: styles.nextflixHeader, headerTitleStyle: styles.nextflixHeaderText }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  nextflixHeader: {
    backgroundColor: "red",
  },
  nextflixHeaderText: {
    color: "black",
  }
})