import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./app/HomeScreen";
import { UserProfile } from "./app/UserProfileScreen";

const Stack = createStackNavigator();

function AppStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
    </Stack.Navigator>
  );
}

export default AppStack;
