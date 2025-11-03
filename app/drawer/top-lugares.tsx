import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ImageBackground, 
  TouchableOpacity 
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo
const topLugares = [
  { id: '1', nombre: 'Baños Termales', imagen: require('../../assets/images/logo.png'), rating: 4.8 },
  { id: '2', nombre: 'Cataratas de Ahuashiyacu', imagen: require('../../assets/images/logo.png'), rating: 4.7 },
  { id: '3', nombre: 'Morro de Calzada', imagen: require('../../assets/images/logo.png'), rating: 4.5 },
];

export default function TopLugaresScreen() {
  const router = useRouter();

  const renderItem = ({ item }: { item: typeof topLugares[0] }) => (
    <TouchableOpacity 
      style={styles.card}
      // Al presionar, podría ir al mapa y centrarse en el lugar
      onPress={() => router.push('/drawer/index')} 
    >
      <ImageBackground 
        source={item.imagen} 
        style={styles.imageBackground}
        imageStyle={{ borderRadius: 15 }}
      >
        <View style={styles.overlay} />
        <Text style={styles.cardTitle}>{item.nombre}</Text>
        <View style={styles.ratingContainer}>
          <Ionicons name="star" size={16} color="#FFD700" />
          <Text style={styles.cardRating}>{item.rating}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Lugares Más Visitados' }} />
      <FlatList
        data={topLugares}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={{ padding: 16 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    height: 200,
    borderRadius: 15,
    marginBottom: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Pone el texto abajo
    padding: 15,
  },
  overlay: { // Sombra sutil sobre la imagen
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 10,
    alignSelf: 'flex-start', // Solo ocupa el espacio necesario
    marginTop: 5,
  },
  cardRating: {
    fontSize: 14,
    color: '#fff',
    marginLeft: 5,
    fontWeight: '600',
  }
});
