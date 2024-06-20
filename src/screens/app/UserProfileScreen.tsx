import React, { useContext, useState, useEffect } from "react";
import { Text, View, StyleSheet, Pressable, TextInput, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { AppContext } from "../../context/AppContext";
import { ApiContext } from "../../context/ApiContext";

export const UserProfile = () => {
  const { backendApiCall } = useContext(ApiContext);
  const { userData, setRefetchData } = useContext(AppContext);
  const [editedData, setEditedData] = useState(userData);

  useEffect(() => {
    setEditedData(userData);
  }, [userData]);

  const handleSubmit = async () => {
    console.log("Formulario enviado:", editedData);

    const response = await backendApiCall({
      method: "PUT",
      endpoint: "v1/user/info/update",
      body: editedData,
    });

    if (response.status === "error") {
      console.error(response.message);
      return;
    }

    Alert.alert("Cambios guardados", "¡Cambios guardados correctamente!", [
      { text: "Aceptar", onPress: () => setRefetchData((prevData) => prevData + 1) },
    ]);
  };

  const handleChange = (name: string, value: string) => {
    setEditedData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.userInfoContainer}>
        <Text style={styles.headerText}>Información de usuario</Text>

        {/* Tipo e Identificación en la misma fila */}
        <View style={styles.rowContainer}>
          {/* Tipo */}
          <View style={[styles.formfield, { flex: 1 }]}>
            <Text style={styles.label}>Tipo</Text>
            <Picker
              style={[styles.input, styles.picker]}
              selectedValue={editedData.id_type}
              onValueChange={(value) => handleChange("id_type", value)}
              enabled={false}
            >
              <Picker.Item label="C.C." value="C.C." />
              <Picker.Item label="C.E." value="C.E." />
            </Picker>
          </View>

          {/* Identificación */}
          <View style={[styles.formfield, { flex: 2 }]}>
            <Text style={styles.label}>Identificación</Text>
            <TextInput
              style={styles.input}
              value={editedData.id_number}
              onChangeText={(text) => handleChange("id_number", text)}
              editable={false}
            />
          </View>
        </View>

        {/* Nombre */}
        <View style={styles.formfield}>
          <Text style={styles.label}>Nombre</Text>
          <TextInput
            style={styles.input}
            value={editedData.name}
            onChangeText={(text) => handleChange("name", text)}
          />
        </View>

        {/* Apellidos */}
        <View style={styles.formfield}>
          <Text style={styles.label}>Apellidos</Text>
          <TextInput
            style={styles.input}
            value={editedData.last_name}
            onChangeText={(text) => handleChange("last_name", text)}
          />
        </View>

        {/* Correo */}
        <View style={styles.formfield}>
          <Text style={styles.label}>Correo</Text>
          <TextInput
            style={styles.input}
            value={editedData.email}
            onChangeText={(text) => handleChange("email", text)}
            editable={false}
          />
        </View>

      </View>

      {/* Botones */}
      <View style={styles.buttonContainer}>
        <Pressable style={styles.cancelButton}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </Pressable>
        <Pressable style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Guardar cambios</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
    height: "100%",
    width: "100%",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 40,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
  },
  userInfoContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  headerText: {
    color: "rgba(0, 0, 0, 0.70)",
    textAlign: "center",
    marginTop: 0,
    marginBottom: 10,
    fontSize: 14,
    fontWeight: "600",
    paddingTop: 56,
    paddingBottom: 44,
  },
  formfield: {
    marginBottom: 10,
  },
  label: {
    color: "#000",
    fontFamily: "Inter, sans-serif",
    fontWeight: "700",
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: "rgba(0, 0, 0, 1)",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: "#FFF",
    color: "rgba(0, 0, 0, 0.70)",
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
    width: "100%",
  },
  picker: {
    marginTop: -8, // Ajusta este valor para elevar el Picker
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#CF352B",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  saveButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: "#39CA07",
    paddingVertical: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: "#FFF",
    fontFamily: "Inter, sans-serif",
    fontWeight: "600",
  },
});
