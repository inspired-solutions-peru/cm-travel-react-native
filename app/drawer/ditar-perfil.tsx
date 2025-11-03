import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView,
  Image,
  Alert
} from 'react-native';
import { Stack, useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';

export default function EditarPerfilScreen() {
  const router = useRouter();
  const [nombre, setNombre] = useState('Usuario de Prueba');
  const [email, setEmail] = useState('usuario@gmail.com');
  const [imageUri, setImageUri] = useState<string | null>(null); // Para la nueva foto

  // Función para seleccionar imagen
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Foto cuadrada
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleSave = () => {
    // Aquí guardarías los datos en tu base de datos
    Alert.alert("Guardado", "Tu perfil ha sido actualizado.");
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Editar Perfil' }} />
      
      {/* --- Sección de Foto --- */}
      <View style={styles.photoSection}>
        <Image 
          source={
            imageUri 
              ? { uri: imageUri } 
              : require('../../assets/images/foto-perfil.png') // Imagen por defecto
          } 
          style={styles.profileImage} 
        />
        <TouchableOpacity style={styles.cameraButton} onPress={pickImage}>
          <Ionicons name="camera" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* --- Formulario de Datos --- */}
      <View style={styles.form}>
        <Text style={styles.label}>Nombre Completo</Text>
        <TextInput
          style={styles.input}
          value={nombre}
          onChangeText={setNombre}
        />
        
        <Text style={styles.label}>Correo Electrónico</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Botón para cambiar contraseña */}
        <TouchableOpacity 
          style={styles.passwordButton}
          onPress={() => router.push('/drawer/cambiar-password')}
        >
          <Text style={styles.passwordButtonText}>Cambiar Contraseña</Text>
        </TouchableOpacity>

        {/* Botón de Guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  photoSection: {
    alignItems: 'center',
    padding: 30,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#e0e0e0',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 30,
    right: 120, // Ajusta esto para centrarlo
    backgroundColor: '#5A45FF',
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  form: {
    paddingHorizontal: 25,
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
  passwordButton: {
    width: '100%',
    height: 52,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
  },
  passwordButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: 'bold',
  },
  saveButton: {
    width: '100%',
    height: 52,
    backgroundColor: '#5A45FF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});