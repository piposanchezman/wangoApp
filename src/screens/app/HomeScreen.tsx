import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";

import { useAuth0 } from "react-native-auth0";

export function Home() {
  const { clearSession, user, isLoading } = useAuth0();

  const onLogout = async () => {
    try {
      await clearSession();
    } catch (e) {
      console.log("Log out cancelled");
    }
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text>You are logged in as {user?.name}</Text>

      <Button onPress={onLogout} title={"Log Out"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF",
  },
});
