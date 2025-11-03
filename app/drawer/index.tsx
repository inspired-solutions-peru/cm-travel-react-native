import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Link } from 'expo-router';
import MapView, { Marker, PROVIDER_GOOGLE, MapViewProps } from 'react-native-maps';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
// --- ¡NUEVAS IMPORTACIONES! ---
import MapViewDirections from 'react-native-maps-directions';

// --- ¡DEBES PONER TU API KEY AQUÍ! ---
const GOOGLE_MAPS_API_KEY = 'TU_API_KEY_DE_GOOGLE_MAPS_AQUI'; 

// Coordenadas de Moyobamba
const MOYOBAMBA_REGION = {
  latitude: -6.0335,
  longitude: -76.9714,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

// Lugares con coordenadas
const lugaresMoyobamba = [
  { id: '1', nombre: 'Baños Termales', coords: { latitude: -6.0483, longitude: -76.9698 } },
  { id: '2', nombre: 'Orquideario', coords: { latitude: -6.0350, longitude: -76.9730 } },
  { id: '3', nombre: 'Morro de Calzada', coords: { latitude: -6.0642, longitude: -77.0601 } },
];

// Tipo para el estado de la ubicación
type LocationCoords = { latitude: number; longitude: number };

export default function DashboardMapaScreen() {
  const [origin, setOrigin] = useState<LocationCoords | null>(null);
  const [selectedLugar, setSelectedLugar] = useState<typeof lugaresMoyobamba[0] | null>(null);
  const [distance, setDistance] = useState<number | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  
  const mapRef = useRef<MapView>(null); // Referencia al mapa

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado');
        setOrigin(MOYOBAMBA_REGION); // Usamos Moyobamba como origen
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setOrigin({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // Centramos el mapa en el usuario
      mapRef.current?.animateToRegion({
        ...MOYOBAMBA_REGION,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      }, 1000);
    })();
  }, []);

  // Cuando se selecciona un lugar
  const onMarkerPress = (lugar: typeof lugaresMoyobamba[0]) => {
    setSelectedLugar(lugar);
    setDistance(null); // Reseteamos
    setDuration(null);

    // Animamos la cámara para enfocar la ruta
    if (origin && mapRef.current) {
      mapRef.current.fitToCoordinates([origin, lugar.coords], {
        edgePadding: { top: 150, right: 50, bottom: 350, left: 50 }, // Espacio para el bottom sheet
        animated: true,
      });
    }
  };

  // Cuando no se selecciona nada (cancelar)
  const onCancelRoute = () => {
    setSelectedLugar(null);
    setDistance(null);
    setDuration(null);
    // Volvemos a centrar en el usuario
    if (origin && mapRef.current) {
      mapRef.current.animateToRegion({ ...MOYOBAMBA_REGION, ...origin }, 1000);
    }
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Asignamos la referencia
        style={StyleSheet.absoluteFillObject}
        provider={PROVIDER_GOOGLE}
        initialRegion={MOYOBAMBA_REGION}
        showsUserLocation={true}
        showsMyLocationButton={false} // Usaremos uno personalizado si queremos
      >
        {/* Dibuja la ruta si hay origen y destino */}
        {origin && selectedLugar && (
          <MapViewDirections
            origin={origin}
            destination={selectedLugar.coords}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={5}
            strokeColor="#5A45FF" // Tu color primario
            onReady={result => {
              // Obtenemos distancia y duración
              setDistance(result.distance);
              setDuration(result.duration);
            }}
          />
        )}

        {/* Marcadores de los lugares */}
        {lugaresMoyobamba.map(lugar => (
          <Marker
            key={lugar.id}
            coordinate={lugar.coords}
            title={lugar.nombre}
            onPress={() => onMarkerPress(lugar)}
          />
        ))}
      </MapView>

      {/* --- Barra de Búsqueda (Sigue igual) --- */}
      {/* La ocultamos si hay una ruta seleccionada */}
      {!selectedLugar && (
        <Link href="/drawer/busqueda" asChild>
          <TouchableOpacity style={styles.searchButton}>
            <Ionicons name="search" size={20} color="#333" />
            <Text style={styles.searchButtonText}>¿A dónde quieres ir?</Text>
          </TouchableOpacity>
        </Link>
      )}

      {/* --- EL NUEVO "BOTTOM SHEET" DE RUTA --- */}
      {selectedLugar && (
        <View style={styles.bottomSheet}>
          <Text style={styles.bottomSheetTitle}>{selectedLugar.nombre}</Text>
          
          {/* Muestra distancia y tiempo cuando estén listos */}
          {distance && duration ? (
            <View style={styles.routeInfo}>
              <Text style={styles.infoText}>{distance.toFixed(1)} km</Text>
              <Text style={styles.infoText}>{duration.toFixed(0)} min</Text>
            </View>
          ) : (
            <Text style={styles.infoText}>Calculando ruta...</Text>
          )}

          <TouchableOpacity style={styles.confirmButton}>
            <Text style={styles.confirmButtonText}>Confirmar Viaje</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={onCancelRoute}>
            <Text style={styles.cancelButtonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

// --- ESTILOS ACTUALIZADOS ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchButton: {
    position: 'absolute',
    top: 60,
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
  // --- ESTILOS DEL BOTTOM SHEET ---
  bottomSheet: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 25,
    paddingBottom: 40, // Espacio para el notch
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  bottomSheetTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#111',
    textAlign: 'center',
    marginBottom: 10,
  },
  routeInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    color: '#555',
    marginHorizontal: 10,
  },
  confirmButton: {
    backgroundColor: '#5A45FF',
    padding: 15,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 10,
  },
  confirmButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#555',
    fontSize: 16,
  }
});