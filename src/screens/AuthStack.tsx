import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Auth } from "./auth/AuthScreen";

const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default AuthStack;
