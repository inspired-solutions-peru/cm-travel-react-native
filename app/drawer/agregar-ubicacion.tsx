import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function AgregarUbicacionScreen() {
  const router = useRouter();

  const handleSave = () => {
    // Lógica para guardar
    router.back(); 
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Agregar Ubicación' }} />

      <View style={styles.form}>
        <Text style={styles.label}>Nombre</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej: Casa, Trabajo, Gimnasio"
          placeholderTextColor="#999"
        />

        <Text style={styles.label}>Dirección</Text>
        <TextInput
          style={styles.input}
          placeholder="Busca una dirección o usa el mapa..."
          placeholderTextColor="#999"
        />
        {/* Aquí iría un componente de mapa pequeño */}
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapText}>Aquí iría un mini-mapa</Text>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Ubicación</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Mismos estilos que el formulario de pago
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
  mapPlaceholder: {
    width: '100%',
    height: 200,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mapText: {
    color: '#888',
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