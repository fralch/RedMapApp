/**
 * STORE DE GESTIÓN DE UBICACIÓN Y MAPAS
 * 
 * Este código implementa un store de estado global utilizando Zustand para manejar
 * toda la funcionalidad relacionada con la ubicación del usuario en una aplicación
 * móvil con React Native y Expo.
 * 
 * Funcionalidades principales:
 * - Solicitar y verificar permisos de ubicación al usuario
 * - Obtener la ubicación actual del dispositivo (latitud y longitud)
 * - Manejar estados de carga durante las operaciones asíncronas
 * - Gestionar errores relacionados con permisos y obtención de ubicación
 * - Almacenar el estado de la ubicación de manera centralizada y accesible
 * 
 * Es ideal para aplicaciones que requieren funcionalidades de mapas, navegación,
 * servicios basados en ubicación, o cualquier característica que necesite conocer
 * la posición geográfica del usuario.
 */

import { create } from 'zustand';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Interfaz que define el estado y las acciones del store del mapa
interface MapState {
  // Estado para almacenar la ubicación actual del usuario
  userLocation: {
    latitude: number;
    longitude: number;
  } | null;
  // Indica si se tienen permisos de ubicación
  locationPermission: boolean;
  // Indica si se está obteniendo la ubicación
  isLoadingLocation: boolean;
  // Almacena mensajes de error
  error: string | null;
  // Indica si el mapa está en modo oscuro
  isDarkMode: boolean;
  
  // Acciones disponibles en el store
  requestLocationPermission: () => Promise<boolean>;
  getCurrentLocation: () => Promise<void>;
  setError: (error: string | null) => void;
  toggleDarkMode: () => Promise<void>;
  setDarkMode: (isDark: boolean) => Promise<void>;
  loadDarkModeFromStorage: () => Promise<void>;
}

// Clave para AsyncStorage
const DARK_MODE_STORAGE_KEY = '@redmap_dark_mode';

// Creación del store utilizando Zustand
export const useMapStore = create<MapState>((set, get) => ({
  // Estado inicial
  userLocation: null,
  locationPermission: false,
  isLoadingLocation: false,
  error: null,
  isDarkMode: false,

  // Solicita permisos de ubicación al usuario
  requestLocationPermission: async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      const hasPermission = status === 'granted';
      set({ locationPermission: hasPermission });
      return hasPermission;
    } catch (error) {
      set({ error: 'Error al solicitar permisos de ubicación' });
      return false;
    }
  },

  // Obtiene la ubicación actual del usuario
  getCurrentLocation: async () => {
    const { locationPermission } = get();
    
    // Verifica si hay permisos, si no los hay, los solicita
    if (!locationPermission) {
      const hasPermission = await get().requestLocationPermission();
      if (!hasPermission) {
        set({ error: 'Permisos de ubicación denegados' });
        return;
      }
    }

    // Inicia la obtención de la ubicación
    set({ isLoadingLocation: true, error: null });
    
    try {
      // Obtiene la ubicación con alta precisión
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      
      // Actualiza el estado con la nueva ubicación
      set({
        userLocation: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        isLoadingLocation: false,
      });
    } catch (error) {
      // Maneja errores durante la obtención de la ubicación
      set({
        error: 'Error al obtener la ubicación actual',
        isLoadingLocation: false,
      });
    }
  },

  // Función auxiliar para establecer mensajes de error
  setError: (error: string | null) => set({ error }),

  // Alterna entre modo claro y oscuro del mapa y guarda en AsyncStorage
  toggleDarkMode: async () => {
    const currentState = get();
    const newDarkMode = !currentState.isDarkMode;
    set({ isDarkMode: newDarkMode });
    
    try {
      await AsyncStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(newDarkMode));
    } catch (error) {
      console.error('Error guardando modo oscuro:', error);
    }
  },

  // Establece el modo oscuro del mapa y guarda en AsyncStorage
  setDarkMode: async (isDark: boolean) => {
    set({ isDarkMode: isDark });
    
    try {
      await AsyncStorage.setItem(DARK_MODE_STORAGE_KEY, JSON.stringify(isDark));
    } catch (error) {
      console.error('Error guardando modo oscuro:', error);
    }
  },

  // Carga el estado del modo oscuro desde AsyncStorage
  loadDarkModeFromStorage: async () => {
    try {
      const storedDarkMode = await AsyncStorage.getItem(DARK_MODE_STORAGE_KEY);
      if (storedDarkMode !== null) {
        const isDarkMode = JSON.parse(storedDarkMode);
        set({ isDarkMode });
      }
    } catch (error) {
      console.error('Error cargando modo oscuro:', error);
    }
  },
}));
