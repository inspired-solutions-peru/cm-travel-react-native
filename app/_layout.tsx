import React from 'react';
import { Stack, Link } from 'expo-router';
import { TouchableOpacity, Text } from 'react-native';

export default function RootLayout() {
  return (
    <Stack>
      {/* Pantallas que ya tenías */}
      <Stack.Screen
        name="index"
        options={{
          title: 'Explorar Moyobamba',
          headerRight: () => (
            <Link href="/auth/login" asChild>
              <TouchableOpacity style={{ marginRight: 15 }}>
                <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: 'bold' }}>
                  Login
                </Text>
              </TouchableOpacity>
            </Link>
          ),
        }}
      />
      <Stack.Screen
        name="auth"
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="drawer"
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="modal" 
        options={{ presentation: 'modal' }} 
      />
      
      {/* --- AÑADE ESTAS DOS PANTALLAS AQUÍ --- */}
      <Stack.Screen 
        name="editar-perfil"
        options={{ 
          title: 'Editar Perfil', 
          presentation: 'modal' // Aquí sí funciona
        }} 
      />
      <Stack.Screen 
        name="cambiar-password" 
        options={{ 
          title: 'Cambiar Contraseña', 
          presentation: 'modal' // Aquí sí funciona
        }} 
      />
      
    </Stack>
  );
}