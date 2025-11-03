import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  ScrollView,
  StatusBar
} from 'react-native';
import { Link, Stack } from 'expo-router'; 

export default function RegistroScreen() {
  return (
    <View style={styles.container}>
      {/* Muestra la cabecera, pero la hace transparente 
        para que se vea el banner. 
        La flecha de "atrás" será blanca.
      */}
      <Stack.Screen 
        options={{ 
          title: '',
          headerTransparent: true, 
          headerShadowVisible: false,
          headerTintColor: '#FFFFFF', // Color de la flecha de "atrás"
        }} 
      />
      <StatusBar barStyle="light-content" />

      {/* 1. Banner Superior con Logo */}
      <View style={styles.headerBanner}>
        <Image 
          source={require('../../assets/images/logo.png')} // Misma imagen de logo
          style={styles.logo}
        />
      </View>

      {/* 2. Contenedor del Formulario */}
      <ScrollView style={styles.contentContainer}>
        <Text style={styles.title}>Crea tu nueva cuenta</Text>
        <Text style={styles.subtitle}>Regístrate para empezar a explorar</Text>

        {/* Campo de Nombre */}
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          placeholder="Juan Pérez"
          placeholderTextColor="#999"
          autoCapitalize="words"
        />

        {/* Campo de Correo */}
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          placeholder="tu@correo.com"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        
        {/* Campo de Contraseña */}
        <Text style={styles.label}>Contraseña</Text>
        <TextInput
          style={styles.input}
          placeholder="••••••••"
          placeholderTextColor="#999"
          secureTextEntry
        />

        {/* Botón de Registro */}
        <TouchableOpacity style={styles.buttonPrimary}>
          <Text style={styles.buttonPrimaryText}>Crear Cuenta</Text>
        </TouchableOpacity>


        {/* Enlace para ir a la pantalla de Login */}
        <View style={styles.registerContainer}>
          <Text style={styles.registerText}>¿Ya tienes una cuenta? </Text>
          <Link href={'/auth/login'} asChild>
            <TouchableOpacity>
              <Text style={styles.registerLink}>Inicia Sesión</Text>
            </TouchableOpacity>
          </Link>
        </View>

      </ScrollView>
    </View>
  );
}

// USAMOS LOS MISMOS ESTILOS DEL LOGIN PARA MANTENER LA CONSISTENCIA
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerBanner: {
    backgroundColor: '#2C2A4A',
    paddingTop: 60, // Más padding porque la flecha "atrás" está aquí
    paddingBottom: 30,
    paddingHorizontal: 25,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
    marginTop: 20, // Espacio extra para la flecha de "atrás"
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
    backgroundColor: '#5A45FF',
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
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
    paddingBottom: 40,
  },
  registerText: {
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    color: '#5A45FF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  
  // (Estilos de botones sociales omitidos aquí, pero puedes copiarlos del login si los necesitas)
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
});
