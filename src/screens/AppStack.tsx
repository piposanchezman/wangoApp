import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "./app/HomeScreen";
import { Register } from "./app/RegisterScreen";

const Stack = createStackNavigator();

function AppStack() {
  const { userData } = useContext(AppContext);
  console.log(userData);
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData && userData.security.identity_verified ? (
        <Stack.Screen name="Home" component={Home} />
      ) : (
        <Stack.Screen name="Register" component={Register} />
      )}
    </Stack.Navigator>
  );
}

export default AppStack;
