// Colores estandarizados para todo el proyecto
export const colors = {
  // Color rojo primario estandarizado
  primary: {
    red: {
      light: '#DC2626', // Rojo para modo claro
      dark: '#EF4444',  // Rojo para modo oscuro
    },
  },
  
  // Otros colores del sistema
  text: {
    light: '#1a1a1a',
    dark: '#ffffff',
  },
  
  background: {
    light: '#ffffff',
    dark: '#1a1a1a',
  },
  
  gray: {
    light: '#f8f9fa',
    medium: '#6c757d',
    dark: '#343a40',
  },
};

// Función helper para obtener el color rojo según el modo
export const getPrimaryRed = (isDarkMode: boolean): string => {
  return isDarkMode ? colors.primary.red.dark : colors.primary.red.light;
};