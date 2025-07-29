import React from 'react';
// Importamos nuestro navegador principal de la aplicación
import AppNavigator from './src/navigation/AppNavigator';

// Componente principal de la aplicación
export default function App() {
  return (
    <>
      {/* Renderizamos el navegador principal que maneja todas las rutas */}
      <AppNavigator />
      {/* StatusBar se maneja ahora desde MapScreen para cambiar con el modo oscuro */}
    </>
  );
}
