// Importaciones necesarias para la navegación y componentes
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '../features/map/screens/MapScreen';
import { RootStackParamList } from './types';

// Creamos el navegador de pila nativo con los tipos definidos en RootStackParamList
const Stack = createNativeStackNavigator<RootStackParamList>();

// Componente principal de navegación de la aplicación
const AppNavigator: React.FC = () => {
  return (
    // Contenedor principal de navegación que mantiene el estado de la misma
    <NavigationContainer>
      {/* Configuración del navegador de pila */}
      <Stack.Navigator
        initialRouteName="Map" // Pantalla inicial de la aplicación
        screenOptions={{
          headerShown: false, // Ocultar encabezado globalmente
        }}
      >
        {/* Definición de la pantalla del mapa */}
        <Stack.Screen
          name="Map"
          component={MapScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
