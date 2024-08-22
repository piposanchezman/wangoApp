import { View, StyleSheet } from "react-native";
import FastImage from "react-native-fast-image";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth0 } from "react-native-auth0";
import AppStack from "./AppStack";
import { Auth } from "./auth/AuthScreen";

const LoadingScreen = () => (
  <View style={styles.container}>
    <FastImage
      source={require("../assets/loading.gif")}
      style={{ width: "50%", height: "50%" }}
      resizeMode={FastImage.resizeMode.cover}
    />
  </View>
);

export const AppNav = () => {
  const { user, isLoading } = useAuth0();
  const renderContent = () => {
    if (isLoading) return <LoadingScreen />;
    return user ? <AppStack /> : <Auth />;
  };

  return <NavigationContainer>{renderContent()}</NavigationContainer>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
