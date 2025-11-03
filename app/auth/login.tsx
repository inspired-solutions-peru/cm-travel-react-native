import React, { useState } from 'react'; // --- AÑADIDO useState ---
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  ScrollView,
  StatusBar,
  Alert // --- AÑADIDO Alert ---
} from 'react-native';
// --- AÑADIDO useRouter ---
import { Link, Stack, useRouter } from 'expo-router'; 
import { Ionicons } from '@expo/vector-icons'; 

export default function LoginScreen() {
  // --- AÑADIDO: Hook para navegar ---
  const router = useRouter();

  // --- AÑADIDO: Estados para guardar los inputs ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // --- AÑADIDO: Función para manejar el login ---
  const handleLogin = () => {
    // Verificamos las credenciales de prueba
    if (email.trim().toLowerCase() === 'usuario@gmail.com' && password === 'usuario') {
      
      // Si es correcto, navegamos al drawer.
      // Usamos 'replace' para que el usuario no pueda "volver" al login
      router.replace('/drawer');

    } else {
      // Si es incorrecto, mostramos una alerta
      Alert.alert(
        'Error de Acceso',
        'El correo o la contraseña son incorrectos. Por favor, inténtalo de nuevo.'
      );
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="light-content" />

      <View style={styles.headerBanner}>
        <Image 
          source={require('../../assets/images/logo.png')} 
          style={styles.logo}
        />
      </View>

      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>Bienvenido de Vuelta</Text>
        <Text style={styles.subtitle}>Inicia sesión para continuar</Text>

        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@correo.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          // --- AÑADIDO ---
          value={email}
          onChangeText={setEmail}
        />
        
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
          // --- AÑADIDO ---
          value={password}
          onChangeText={setPassword}
        />

        {/* --- AÑADIDO onPress --- */}
        <TouchableOpacity style={styles.buttonPrimary} onPress={handleLogin}>
          <Text style={styles.buttonPrimaryText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <View style={styles.separatorContainer}>
          <Text style={styles.separatorText}>O inicia sesión con</Text>
        </View>

        <TouchableOpacity style={styles.buttonSocial}>
          <Image source={require('../../assets/icons/google.png')} style={styles.socialIcon} />
          <Text style={styles.buttonSocialText}>Iniciar Sesión con Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.buttonSocial, styles.facebookButton]}>
          <Image source={require('../../assets/icons/facebook.png')} style={styles.socialIcon} />
          <Text style={styles.buttonSocialText}>Iniciar Sesión con Facebook</Text>
        </TouchableOpacity>

        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿No tienes una cuenta? </Text>
          <Link href={'/auth/registro'} asChild>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Regístrate</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </ScrollView>
    </View>
  );
}

// (Tus estilos permanecen exactamente iguales)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Fondo blanco
  },
  headerBanner: {
    backgroundColor: '#2C2A4A', // Azul oscuro/púrpura del banner
    paddingTop: 60, // Espacio para la barra de estado
    paddingBottom: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  logo: {
    width: 250, // Ancho del logo en el banner
    height: 80,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    padding: 25,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
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
  buttonPrimary: {
    width: '100%',
    height: 52,
    backgroundColor: '#5A45FF', // Púrpura/Azul primario
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 25,
    elevation: 3,
  },
  buttonPrimaryText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  separatorContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  separatorText: {
    color: '#888',
    fontSize: 14,
  },
  buttonSocial: {
    flexDirection: 'row',
    width: '100%',
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#fff',
  },
  facebookButton: {
    // Estilo deshabilitado como en la imagen de ejemplo
    backgroundColor: '#f5f5f5', 
  },
  buttonSocialText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 10,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 40, // Espacio al final
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#5A45FF', // Color primario
    fontWeight: 'bold',
    fontSize: 14,
  },
});

