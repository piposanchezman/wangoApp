import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { useAuth0 } from "react-native-auth0";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the types for your navigation stack
type RootStackParamList = {
  Home: undefined;
  UserProfile: undefined;
};

// Define the props type for the Home component
type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

export function Home({ navigation }: Props) {
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
      <Button 
        onPress={() => navigation.navigate('UserProfile')} 
        title="Go to Profile" 
      />
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
