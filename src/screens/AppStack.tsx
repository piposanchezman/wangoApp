import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./app/Home";

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AppStack;
