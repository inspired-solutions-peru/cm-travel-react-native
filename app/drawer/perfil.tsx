import React from 'react';
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  TouchableOpacity, 
  Alert,
  ScrollView 
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// Componente reutilizable para las filas del menú
const MenuRow = ({ title, icon, onPress }: { title: string, icon: any, onPress: () => void }) => (
  <TouchableOpacity style={styles.menuRow} onPress={onPress}>
    <Ionicons name={icon} size={22} color="#555" style={styles.menuIcon} />
    <Text style={styles.menuText}>{title}</Text>
    <Ionicons name="chevron-forward" size={20} color="#999" />
  </TouchableOpacity>
);

export default function PerfilScreen() {
  const router = useRouter();

  // Función para cerrar sesión
  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Sí, cerrar sesión",
          onPress: () => router.replace('/'),
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Mi Cuenta' }} />
      
      {/* --- 1. Información del Usuario (con botón Editar) --- */}
      <View style={styles.header}>
        <Image 
          style={styles.profileImage}
          source={require('../../assets/images/foto-perfil.png')} // Asegúrate de tener esta imagen
        />
        <View style={styles.headerText}>
          <Text style={styles.title}>Usuario de Prueba</Text>
          <Text style={styles.email}>usuario@gmail.com</Text>
        </View>
        
        {/* --- Botón de Editar Perfil --- */}
        <TouchableOpacity 
          style={styles.editButton} 
          onPress={() => router.push('/drawer/editar-perfil')} // Navega a la nueva pantalla
        >
          <Ionicons name="pencil" size={20} color="#5A45FF" />
        </TouchableOpacity>
      </View>

      {/* --- 2. Publicidad Agresiva --- */}
      <TouchableOpacity 
        style={styles.ctaBanner}
        onPress={() => Alert.alert("¡Próximamente!", "Conoce más sobre nuestros planes premium.")}
      >
        <Ionicons name="sparkles" size={24} color="#fff" />
        <View style={styles.ctaTextContainer}>
          <Text style={styles.ctaTitle}>Desbloquea Moyobamba Premium</Text>
          <Text style={styles.ctaSubtitle}>Rutas exclusivas y descuentos.</Text>
        </View>
        <Ionicons name="arrow-forward" size={20} color="#fff" />
      </TouchableOpacity>

      {/* --- 3. Widget de Último Viaje --- */}
      <View style={styles.lastTripCard}>
        <Text style={styles.sectionTitle}>Tu último viaje</Text>
        <View style={styles.tripInfo}>
          <View style={styles.tripIcon}>
            <Ionicons name="car-sport" size={24} color="#5A45FF" />
          </View>
          <View>
            <Text style={styles.tripDestination}>Tour a las Cataratas</Text>
            <Text style={styles.tripDate}>28 de Octubre, 2025 · S/ 50.00</Text>
          </View>
        </View>
      </View>

      {/* --- 4. Menú de Cuenta --- */}
      <View style={styles.menuContainer}>
        <MenuRow 
          title="Historial de Viajes" 
          icon="receipt-outline"
          onPress={() => router.push('/drawer/historial')} 
        />
        <MenuRow 
          title="Métodos de Pago" 
          icon="card-outline"
          onPress={() => router.push('/drawer/pago')} 
        />
        <MenuRow 
          title="Notificaciones" 
          icon="notifications-outline"
          onPress={() => router.push('/drawer/notificaciones')} 
        />
        <MenuRow 
          title="Mis Ubicaciones" 
          icon="location-outline"
          onPress={() => router.push('/drawer/ubicacion')} 
        />
        <MenuRow 
          title="Ayuda y Soporte" 
          icon="help-circle-outline"
          onPress={() => Alert.alert("Soporte", "Contacta a soporte@moyobamba.travel")}
        />
      </View>
      
      {/* --- 5. Botón de Cerrar Sesión --- */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// --- ESTILOS PROFESIONALES (Actualizados) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5', 
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerText: { // Para que el botón se alinee a la derecha
    flex: 1,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
    backgroundColor: '#e0e0e0',
  },
  editButton: { // Estilo del botón de editar
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#111',
  },
  email: {
    fontSize: 14,
    color: '#666',
  },
  ctaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#5A45FF', 
    padding: 20,
    margin: 16,
    borderRadius: 15,
  },
  ctaTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  ctaTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  ctaSubtitle: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.9,
  },
  lastTripCard: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  tripInfo: {
    flexDirection: 'row',
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
  tripDestination: {
    fontSize: 16,
    fontWeight: '500',
    color: '#222',
  },
  tripDate: {
    fontSize: 14,
    color: '#777',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 10,
    marginBottom: 20,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  menuIcon: {
    marginRight: 15,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    width: '90%',
    alignSelf: 'center',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    alignItems: 'center',
    marginBottom: 40,
  },
  logoutButtonText: {
    color: '#D32F2F', 
    fontSize: 16,
    fontWeight: 'bold',
  },
});