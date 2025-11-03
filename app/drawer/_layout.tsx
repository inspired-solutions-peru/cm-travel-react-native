import { Drawer } from 'expo-router/drawer';
import { Link } from 'expo-router';
import { TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function CustomHeaderIcons() {
  return (
    <View style={{ flexDirection: 'row', marginRight: 15 }}>
      <Link href="/drawer/busqueda" asChild> 
        <TouchableOpacity style={{ marginRight: 20 }}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
      </Link>
      <Link href="/drawer/perfil" asChild>
        <TouchableOpacity>
          <Ionicons name="person-circle" size={26} color="black" />
        </TouchableOpacity>
      </Link>
    </View>
  );
}

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerRight: () => <CustomHeaderIcons />,
      }}
    >
      <Drawer.Screen name="index" options={{ drawerLabel: 'Inicio', title: 'Inicio' }} />
      <Drawer.Screen 
        name="top-lugares" 
        options={{ 
          drawerLabel: 'Más Visitados', 
          title: 'Lugares Más Visitados' 
        }} 
      />
      <Drawer.Screen name="perfil" options={{ drawerLabel: 'Mi Perfil', title: 'Mi Cuenta', headerRight: () => null }} />
      <Drawer.Screen name="notificaciones" options={{ drawerLabel: 'Notificaciones', title: 'Notificaciones' }} />
      <Drawer.Screen name="ubicacion" options={{ drawerLabel: 'Mis Ubicaciones', title: 'Mis Ubicaciones' }} />
      <Drawer.Screen name="pago" options={{ drawerLabel: 'Métodos de Pago', title: 'Métodos de Pago' }} />

      {/* Pantallas Ocultas */}
      <Drawer.Screen 
        name="busqueda"
        options={{ title: 'Buscar', drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen 
        name="historial"
        options={{ title: 'Historial', drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen 
        name="agregar-pago"
        options={{ title: 'Agregar Tarjeta', drawerItemStyle: { display: 'none' } }}
      />
      <Drawer.Screen 
        name="agregar-ubicacion"
        options={{ title: 'Agregar Ubicación', drawerItemStyle: { display: 'none' } }}
      />
      
      {/* --- ELIMINASTE LAS PANTALLAS DE "editar-perfil" Y "cambiar-password" DE AQUÍ --- */}
      
    </Drawer>
  );
}