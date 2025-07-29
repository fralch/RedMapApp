import React, { useEffect } from 'react';
import { View, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMapStore } from '../store/mapStore';
import { mapScreenStyles, darkMapStyle, lightMapStyle } from '../styles';

const MapScreen: React.FC = () => {
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
          showsMyLocationButton={true}
          followsUserLocation={true}
        >
          <Marker
            coordinate={{
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
            }}
            title="Mi ubicación"
            description="Estás aquí"
          />
        </MapView>
        
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