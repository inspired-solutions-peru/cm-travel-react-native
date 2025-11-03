import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Stack } from 'expo-router';
// Importamos Ionicons
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo
const notificaciones = [
  { id: '1', tipo: 'promo', titulo: '¡Promoción especial!', descripcion: 'Descuento del 10% en el tour "Cataratas de Ahuashiyacu".' },
  { id: '2', tipo: 'recordatorio', titulo: 'Recordatorio', descripcion: 'Tu viaje a los Baños Termales es mañana.' },
  { id: '3', tipo: 'ruta', titulo: '¡Nueva ruta disponible!', descripcion: 'Se ha agregado la ruta "Mirador de la Cruz".' },
];

// Componente para el ícono
const NotifIcon = ({ tipo }: { tipo: string }) => {
  let iconName: any = 'notifications';
  let color = '#5A45FF'; // Tu color primario

  if (tipo === 'promo') {
    iconName = 'pricetag';
    color = '#4CAF50'; // Verde para promos
  } else if (tipo === 'recordatorio') {
    iconName = 'calendar';
    color = '#FFC107'; // Amarillo para recordatorios
  } else if (tipo === 'ruta') {
    iconName = 'map';
  }

  return (
    <View style={[styles.iconContainer, { backgroundColor: color }]}>
      <Ionicons name={iconName} size={22} color="#fff" />
    </View>
  );
};

export default function NotificacionesScreen() {
  
  const renderItem = ({ item }: { item: typeof notificaciones[0] }) => (
    <View style={styles.notificationItem}>
      <NotifIcon tipo={item.tipo} />
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.titulo}</Text>
        <Text style={styles.notificationDescription}>{item.descripcion}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Notificaciones' }} />

      <FlatList
        data={notificaciones}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tienes notificaciones nuevas.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco limpio
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5', // Separador sutil
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  notificationDescription: {
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
  }
});