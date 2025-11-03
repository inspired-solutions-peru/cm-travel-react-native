import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList,
  TouchableOpacity
} from 'react-native';
import { Stack } from 'expo-router';
// Asegúrate de tener @expo/vector-icons instalado
import { Ionicons } from '@expo/vector-icons';

// Datos de ejemplo para sugerencias
const sugerencias = [
  { id: '1', nombre: 'Baños Termales' },
  { id: '2', nombre: 'Cataratas' },
  { id: '3', nombre: 'Restaurantes' },
  { id: '4', nombre: 'Miradores' },
];

export default function BusquedaScreen() {
  const [query, setQuery] = useState('');

  return (
    <View style={styles.container}>
      {/* Esto oculta el título por defecto, ya que tenemos nuestra
          propia barra de búsqueda personalizada. */}
      <Stack.Screen 
        options={{ 
          title: 'Buscar',
          headerShadowVisible: false,
          headerStyle: { backgroundColor: '#fff' },
        }} 
      />

      {/* Barra de Búsqueda Personalizada */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Busca lugares, restaurantes..."
          placeholderTextColor="#888"
          value={query}
          onChangeText={setQuery}
          autoFocus={true} // El teclado se abre al entrar
        />
      </View>

      {/* Aquí se mostrarían los resultados o sugerencias */}
      <FlatList
        data={sugerencias}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <Text style={styles.suggestionTitle}>Sugerencias</Text>
        }
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.suggestionItem}>
            <Ionicons name="compass-outline" size={22} color="#555" />
            <Text style={styles.suggestionText}>{item.nombre}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Fondo blanco limpio
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', // Fondo gris claro
    borderRadius: 10,
    margin: 16,
    paddingHorizontal: 12,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: 16,
    color: '#111',
  },
  suggestionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  suggestionText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 15,
  },
});