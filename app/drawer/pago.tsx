import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
// --- AÑADIDO: Link para ir a la nueva pantalla ---
import { Stack, Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo
const metodosPago = [
  { id: '1', tipo: 'Visa', numero: '**** **** **** 1234' },
  { id: '2', tipo: 'Mastercard', numero: '**** **** **** 5678' },
];

export default function PagoScreen() {
  
  const renderItem = ({ item }: { item: typeof metodosPago[0] }) => (
    <TouchableOpacity style={styles.paymentItem}>
      <View style={styles.iconContainer}>
        {/* Usamos un ícono real */}
        <Ionicons name="card" size={24} color="#5A45FF" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.paymentType}>{item.tipo}</Text>
        <Text style={styles.paymentNumber}>{item.numero}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  return (
    // Usamos View para que el botón flotante funcione
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Métodos de Pago' }} />

      <FlatList
        data={metodosPago}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No has agregado métodos de pago.</Text>
          </View>
        }
      />

      {/* --- BOTÓN FLOTANTE (Estilo Uber) --- 
          Usamos Link para navegar a la pantalla de "agregar"
      */}
      <Link href="/drawer/agregar-pago" asChild>
        <TouchableOpacity style={styles.addButton}>
          <Text style={styles.addButtonText}>Agregar Nuevo Método</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', // Fondo gris claro
  },
  paymentItem: {
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
    backgroundColor: '#f0f0f0', // Fondo gris para el ícono
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: {
    flex: 1,
  },
  paymentType: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  paymentNumber: {
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
    borderRadius: 30, // Más redondeado
    margin: 16,
    alignItems: 'center',
    // Sombra
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