import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

import Home from "./Screens/Home";
import Note from "./Screens/Note";

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="light" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false, animation: "fade_from_bottom" }}
        />
        <Stack.Screen
          name="Note"
          component={Note}
          options={{ headerShown: false, animation: "fade_from_bottom" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
