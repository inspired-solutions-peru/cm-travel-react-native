import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Stack, useRouter } from 'expo-router';

export default function AgregarPagoScreen() {
  const router = useRouter();

  const handleSave = () => {
    // Aquí iría la lógica para guardar la tarjeta
    // Y luego regresamos
    router.back(); 
  };

  return (
    <ScrollView style={styles.container}>
      {/* Si prefieres que sea un MODAL que se desliza desde abajo, 
        cambia "title" por "presentation: 'modal'" en el _layout.tsx
      */}
      <Stack.Screen options={{ title: 'Agregar Tarjeta' }} />

      <View style={styles.form}>
        <Text style={styles.label}>Número de Tarjeta</Text>
        <TextInput
          style={styles.input}
          placeholder="0000 0000 0000 0000"
          placeholderTextColor="#999"
          keyboardType="number-pad"
        />
        
        <View style={styles.row}>
          <View style={styles.col}>
            <Text style={styles.label}>Vencimiento (MM/AA)</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/AA"
              placeholderTextColor="#999"
              keyboardType="number-pad"
            />
          </View>
          <View style={styles.col}>
            <Text style={styles.label}>CVC</Text>
            <TextInput
              style={styles.input}
              placeholder="123"
              placeholderTextColor="#999"
              keyboardType="number-pad"
              secureTextEntry
            />
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Tarjeta</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Estilos consistentes con tu login.tsx
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    width: '48%',
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