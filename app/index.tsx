import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
// Importamos useRouter para poder navegar al Login desde la alerta
import { useRouter } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';

// Coordenadas de Moyobamba
const MOYOBAMBA_REGION = {
  latitude: -6.0335,
  longitude: -76.9714,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Datos de ejemplo de tus lugares
const lugaresMoyobamba = [
  { id: '1', nombre: 'Baños Termales', coords: { latitude: -6.0483, longitude: -76.9698 } },
  { id: '2', nombre: 'Orquideario', coords: { latitude: -6.0350, longitude: -76.9730 } },
  { id: '3', nombre: 'Morro de Calzada', coords: { latitude: -6.0642, longitude: -77.0601 } },
];

export default function IndexGuestScreen() {
  const [region, setRegion] = useState(MOYOBAMBA_REGION);
  const router = useRouter(); // Hook para navegar

  useEffect(() => {
    // Pedir permiso de ubicación
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        // No es necesario alertar al invitado, solo centramos el mapa
        console.warn('Permiso de ubicación denegado');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
  }, []);

  // --- ¡AQUÍ ESTÁ LA MAGIA! ---
  // Esta función maneja el clic en la "barra de navegación" (búsqueda)
  const handleGuestInteraction = () => {
    Alert.alert(
      "Función Exclusiva", // Título
      "Para buscar lugares o ver categorías, necesitas iniciar sesión.", // Mensaje
      [
        // Botón 1: Cancelar
        {
          text: "Ahora no",
          style: "cancel"
        },
        // Botón 2: Ir al Login
        { 
          text: "Iniciar Sesión", 
          onPress: () => router.push('/auth/login'), // Navega a la pantalla de login
          style: "default"
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* El Mapa ocupa toda la pantalla */}
      <MapView
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
      >
        {/* Marcadores de lugares */}
        {lugaresMoyobamba.map(lugar => (
          <Marker
            key={lugar.id}
            coordinate={lugar.coords}
            title={lugar.nombre}
          />
        ))}
      </MapView>

      {/* --- Barra de Navegación Flotante (para Invitado) --- */}

      {/* 1. Barra de Búsqueda Falsa (con el manejador de clic) */}
      <TouchableOpacity 
        style={styles.searchButton}
        onPress={handleGuestInteraction} // Llama a la alerta
      >
        <Ionicons name="search" size={20} color="#333" />
        <Text style={styles.searchButtonText}>¿A dónde quieres ir?</Text>
      </TouchableOpacity>

      {/* 2. Botones de Acceso Rápido (también deshabilitados) */}
      <View style={styles.quickActionsContainer}>
        <TouchableOpacity style={styles.quickAction} onPress={handleGuestInteraction}>
          <Ionicons name="restaurant" size={24} color="#5A45FF" />
          <Text style={styles.quickActionText}>Comida</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction} onPress={handleGuestInteraction}>
          <Ionicons name="bed" size={24} color="#5A45FF" />
          <Text style={styles.quickActionText}>Hoteles</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.quickAction} onPress={handleGuestInteraction}>
          <Ionicons name="rose" size={24} color="#5A45FF" />
          <Text style={styles.quickActionText}>Tours</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

// Usamos los mismos estilos del mapa del usuario logueado
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchButton: {
    position: 'absolute',
    top: 60, // Ajusta si es necesario
    left: 15,
    right: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 30,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  searchButtonText: {
    fontSize: 18,
    color: '#666',
    marginLeft: 10,
    fontWeight: '500',
  },
  quickActionsContainer: {
    position: 'absolute',
    bottom: 30,
    left: 15,
    right: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'transparent',
  },
  quickAction: {
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  quickActionText: {
    color: '#5A45FF',
    fontWeight: '600',
    marginTop: 4,
  },
});