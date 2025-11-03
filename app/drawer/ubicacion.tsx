import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// --- AÑADIDO: Link ---
import { Stack, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo
const ubicaciones = [
  { id: '1', nombre: 'Casa', direccion: 'Jr. San Martín 123, Moyobamba', icon: 'home' },
  { id: '2', nombre: 'Trabajo', direccion: 'Plaza de Armas, Moyobamba', icon: 'briefcase' },
];

export default function UbicacionScreen() {
  
  const renderItem = ({ item }: { item: typeof ubicaciones[0] }) => (
    <TouchableOpacity style={styles.locationItem}>
      <View style={styles.iconContainer}>
        {/* Ícono dinámico */}
        <Ionicons name={item.icon as any} size={24} color="#5A45FF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.locationName}>{item.nombre}</Text>
        <Text style={styles.locationAddress}>{item.direccion}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Mis Ubicaciones' }} />

      <FlatList
        data={ubicaciones}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes ubicaciones guardadas.</Text>
          </View>
        }
      />

      {/* --- BOTÓN FLOTANTE --- */}
      <Link href="/drawer/agregar-ubicacion" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar Nueva Ubicación</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  locationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 100,
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
  },
  // --- ESTE ES EL BOTÓN FLOTANTE ---
  addButton: {
    backgroundColor: '#5A45FF', // Tu color primario
    padding: 15,
    borderRadius: 30,
    margin: 16,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});