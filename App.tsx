import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "@/screens/HomeScreen";
import OtpScreen from "@/screens/OtpScreen";
import BalanceScreen from "@/screens/BalanceScreen";
import FocusScreen from "@/screens/FocusScreen";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";

type RootStackParamList = {
  HomeScreen: undefined;
  OtpScreen: undefined;
  BalanceScreen: undefined;
  FocusScreen: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="BalanceScreen" component={BalanceScreen} />
        <Stack.Screen name="FocusScreen" component={FocusScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
