import React from 'react';
import { StatusBar } from 'expo-status-bar';
// Importamos nuestro navegador principal de la aplicación
import AppNavigator from './src/navigation/AppNavigator';

// Componente principal de la aplicación
export default function App() {
  return (
    <>
      {/* Renderizamos el navegador principal que maneja todas las rutas */}
      <AppNavigator />
      {/* Configuramos la barra de estado para que se ajuste automáticamente */}
      <StatusBar style="auto" />
    </>
  );
}
