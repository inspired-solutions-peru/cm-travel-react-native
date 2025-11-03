import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo
const historialViajes = [
  { id: '1', destino: 'Tour a las Cataratas', fecha: '28 de Octubre, 2025', precio: 'S/ 50.00' },
  { id: '2', destino: 'Visita a Baños Termales', fecha: '25 de Octubre, 2025', precio: 'S/ 30.00' },
  { id: '3', destino: 'Viaje al Morro de Calzada', fecha: '20 de Octubre, 2025', precio: 'S/ 40.00' },
];

export default function HistorialScreen() {
  
  const renderItem = ({ item }: { item: typeof historialViajes[0] }) => (
    <TouchableOpacity style={styles.tripItem}>
      <View style={styles.tripIcon}>
        <Ionicons name="map-outline" size={24} color="#5A45FF" />
      </View>
      <View style={styles.tripDetails}>
        <Text style={styles.tripDestination}>{item.destino}</Text>
        <Text style={styles.tripDate}>{item.fecha}</Text>
      </View>
      <Text style={styles.tripPrice}>{item.precio}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Historial de Viajes' }} />
      <FlatList
        data={historialViajes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={<Text style={styles.emptyText}>No tienes viajes anteriores.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tripItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
  },
  tripIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  tripDetails: {
    flex: 1,
  },
  tripDestination: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  tripDate: {
    fontSize: 14,
    color: '#777',
  },
  tripPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  }
});