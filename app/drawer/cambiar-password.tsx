import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function CambiarPasswordScreen() {
  const router = useRouter();

  const handleSave = () => {
    // Aquí va la lógica de validación y cambio
    Alert.alert("Éxito", "Tu contraseña ha sido actualizada.");
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Cambiar Contraseña' }} />
      <View style={styles.form}>
        <Text style={styles.label}>Contraseña Actual</Text>
        <TextInput style={styles.input} secureTextEntry />
        
        <Text style={styles.label}>Nueva Contraseña</Text>
        <TextInput style={styles.input} secureTextEntry />
        
        <Text style={styles.label}>Confirmar Nueva Contraseña</Text>
        <TextInput style={styles.input} secureTextEntry />

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Contraseña</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Usamos los mismos estilos del formulario anterior
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  form: {
    padding: 25,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 52,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#5A45FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
