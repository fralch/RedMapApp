import React, { useEffect, useRef } from 'react';
import { View, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMapStore } from '../store/mapStore';
import { mapScreenStyles, darkMapStyle, lightMapStyle } from '../styles';
import coordinates from '../data/coordinates.json';

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const {
    userLocation,
    isLoadingLocation,
    error,
    isDarkMode,
    getCurrentLocation,
    setError,
    toggleDarkMode,
    loadDarkModeFromStorage,
  } = useMapStore();

  useEffect(() => {
    // Cargar el estado del modo oscuro desde AsyncStorage
    loadDarkModeFromStorage();
    // Obtener la ubicación del usuario al montar el componente
    getCurrentLocation();
  }, [getCurrentLocation, loadDarkModeFromStorage]);

  useEffect(() => {
    // Mostrar error si existe
    if (error) {
      Alert.alert('Error', error, [
        { text: 'OK', onPress: () => setError(null) },
      ]);
    }
  }, [error, setError]);

  const centerOnUserLocation = () => {
    if (userLocation && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 1000);
    }
  };

  if (isLoadingLocation) {
    return (
      <>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <View style={isDarkMode ? mapScreenStyles.loadingContainerDark : mapScreenStyles.loadingContainer}>
          <ActivityIndicator size="large" color={isDarkMode ? "#64B5F6" : "#007AFF"} />
          <Text style={isDarkMode ? mapScreenStyles.loadingTextDark : mapScreenStyles.loadingText}>Obteniendo ubicación...</Text>
        </View>
      </>
    );
  }

  if (!userLocation) {
    return (
      <>
        <StatusBar style={isDarkMode ? "light" : "dark"} />
        <View style={isDarkMode ? mapScreenStyles.errorContainerDark : mapScreenStyles.errorContainer}>
          <Text style={isDarkMode ? mapScreenStyles.errorTextDark : mapScreenStyles.errorText}>
            No se pudo obtener la ubicación.
            {error && `\n${error}`}
          </Text>
        </View>
      </>
    );
  }

  const mapStyle = isDarkMode ? darkMapStyle : lightMapStyle;

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View style={mapScreenStyles.container}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={mapScreenStyles.map}
          customMapStyle={mapStyle}
          initialRegion={{
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          showsUserLocation={true}
          showsMyLocationButton={false} // Desactivamos el botón nativo
          followsUserLocation={false} // Cambiado a false para control manual
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Mi ubicación"
            description="Estás aquí"
          />
          <Heatmap
            points={coordinates.map(c => ({ latitude: c.latitud, longitude: c.longitud, weight: 1 }))}
            radius={30}
            opacity={0.3}
            gradient={{
              colors: [
                'rgba(255, 0, 0, 0)',      // Completely transparent
                'rgba(255, 0, 0, 0)',      // Transparent border
                'rgba(255, 0, 0, 0.7)',    // Sharp transition to solid red
                'rgba(255, 0, 0, 0.9)',    // Strong red center
              ],
              startPoints: [0.0, 0.7, 0.85, 1.0],
              colorMapSize: 64,
            }}
          />
        </MapView>
        
        {/* Botón para centrar en la ubicación - Inferior Izquierda */}
        <TouchableOpacity
          style={[mapScreenStyles.locationButton, isDarkMode ? mapScreenStyles.locationButtonDark : mapScreenStyles.locationButtonLight]}
          onPress={centerOnUserLocation}
          activeOpacity={0.7}
        >
          <Ionicons
            name="locate"
            size={24}
            color={isDarkMode ? '#FFF' : '#000'}
          />
        </TouchableOpacity>
        
        {/* Botón para cambiar el tema del mapa */}
        <TouchableOpacity
          style={[mapScreenStyles.themeButton, isDarkMode ? mapScreenStyles.themeButtonDark : mapScreenStyles.themeButtonLight]}
          onPress={toggleDarkMode}
          activeOpacity={0.7}
        >
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={24}
            color={isDarkMode ? '#FFF' : '#000'}
          />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MapScreen;