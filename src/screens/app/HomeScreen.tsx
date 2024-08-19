import React from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert, StyleSheet, ImageSourcePropType } from 'react-native';
import { useAuth0 } from "react-native-auth0";
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

// Define the types for your navigation stack
type RootStackParamList = {
  Home: undefined;
  UserProfile: undefined;
};

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;
type HomeScreenRouteProp = RouteProp<RootStackParamList, 'Home'>;

type Props = {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
};

const FeatureButton = ({ imageUrl, label, onPress }: { imageUrl: ImageSourcePropType, label: string, onPress: () => void }) => (
  <TouchableOpacity onPress={onPress} style={styles.featureButtonContainer}>
    <Image source={imageUrl} style={styles.featureImage} />
    <Text style={styles.featureLabel}>{label}</Text>
  </TouchableOpacity>
);

export function Home({ navigation }: Props) {
  const { clearSession, user, isLoading } = useAuth0();

  const onFeaturePress = (label: string) => {
    Alert.alert("Action", `You tapped on ${label}`);
  };

  const onLogout = async () => {
    try {
      await clearSession();
      navigation.navigate('Login' as never); // Suponiendo que tienes una pantalla de Login
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

  const features = [
    { id: 1, imageUrl: require('../../assets/icons/mis_lotes.png'), label: "Mis lotes" },
    { id: 2, imageUrl: require('../../assets/icons/mi_perfil.png'), label: "Mi perfil", action: () => navigation.navigate('UserProfile') },
    { id: 3, imageUrl: require('../../assets/icons/agregar_trabajador.png'), label: "Crear un usuario\ntrabajador" },
    { id: 4, imageUrl: require('../../assets/icons/ver_mis_trabajadores.png'), label: "Ver mis\ntrabajadores" },
    { id: 5, imageUrl: require('../../assets/icons/cerrar_sesion.png'), label: "Cerrar sesión", action: onLogout },
  ];

  const featureRows = [];
  for (let i = 0; i < features.length; i += 2) {
    const row = features.slice(i, i + 2);
    featureRows.push(row);
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>¡Bienvenido {user?.name}!</Text>
          <View style={styles.featuresContainer}>
            {featureRows.map((row, rowIndex) => (
              <View key={rowIndex} style={styles.featureRow}>
                {row.map(feature => (
                  <FeatureButton 
                    key={feature.id} 
                    imageUrl={feature.imageUrl} 
                    label={feature.label} 
                    onPress={feature.action || (() => onFeaturePress(feature.label))} 
                  />
                ))}
                {row.length === 1 && <View style={{ flex: 1 }} />}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContainer: {
    paddingBottom: 48,
    alignItems: 'center',
  },
  welcomeContainer: {
    paddingHorizontal: 40,
    marginTop: 56,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 0.7)',
  },
  featuresContainer: {
    marginTop: 36,
    width: '100%',
  },
  featureRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  featureButtonContainer: {
    alignItems: 'center',
    flex: 1,
  },
  featureImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  featureLabel: {
    marginTop: 10,
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Home;
