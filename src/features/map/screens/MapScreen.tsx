import React, { useEffect, useRef, useState } from 'react';
import { View, Alert, Text, TouchableOpacity, Modal } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMapStore } from '../store/mapStore';
import { mapScreenStyles, darkMapStyle, lightMapStyle } from '../styles';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import AuthModal from '../../auth/components/AuthModal';
import coordinates from '../data/coordinates.json';

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
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
    return <LoadingScreen isDarkMode={isDarkMode} />;
  }

  if (!userLocation) {
    return (
      <ErrorScreen 
        isDarkMode={isDarkMode} 
        error={error}
        onRetry={getCurrentLocation}
      />
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

        {/* Botón para agregar hot points - Centro Inferior */}
        <TouchableOpacity
          style={[mapScreenStyles.addHotPointButton, isDarkMode ? mapScreenStyles.addHotPointButtonDark : mapScreenStyles.addHotPointButtonLight]}
          onPress={() => setIsInfoModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons
            name="add-circle"
            size={24}
            color={isDarkMode ? '#FFF' : '#000'}
          />
        </TouchableOpacity>

        {/* Botón para gestión de usuario - Centro Inferior Derecha */}
        <TouchableOpacity
          style={[mapScreenStyles.userManagementButton, isDarkMode ? mapScreenStyles.userManagementButtonDark : mapScreenStyles.userManagementButtonLight]}
          onPress={() => setIsAuthModalVisible(true)}
          activeOpacity={0.7}
        >
          <Ionicons
            name="person-circle"
            size={24}
            color={isDarkMode ? '#FFF' : '#000'}
          />
        </TouchableOpacity>

        {/* Modal de Autenticación */}
        <AuthModal
          visible={isAuthModalVisible}
          onClose={() => setIsAuthModalVisible(false)}
          isDarkMode={isDarkMode}
        />

        {/* Modal Informativo para Agregar Hot Point */}
        <Modal
          visible={isInfoModalVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsInfoModalVisible(false)}
        >
          <View style={mapScreenStyles.modalOverlay}>
            <View style={[mapScreenStyles.modalContainer, isDarkMode ? mapScreenStyles.modalContainerDark : mapScreenStyles.modalContainerLight]}>
              <View style={mapScreenStyles.modalHeader}>
                <Ionicons
                  name="information-circle"
                  size={32}
                  color={isDarkMode ? '#FF6B6B' : '#DC3545'}
                  style={mapScreenStyles.modalIcon}
                />
                <Text style={[mapScreenStyles.modalTitle, isDarkMode ? mapScreenStyles.modalTitleDark : mapScreenStyles.modalTitleLight]}>
                  Agregar un nuevo punto 
                </Text>
              </View>
              
              <Text style={[mapScreenStyles.modalMessage, isDarkMode ? mapScreenStyles.modalMessageDark : mapScreenStyles.modalMessageLight]}>
                Para agregar un nuevo punto de calor, simplemente presiona cualquier punto en la pantalla del mapa donde desees marcarlo.
              </Text>
              
              <TouchableOpacity
                style={[mapScreenStyles.modalButton, isDarkMode ? mapScreenStyles.modalButtonDark : mapScreenStyles.modalButtonLight]}
                onPress={() => setIsInfoModalVisible(false)}
                activeOpacity={0.7}
              >
                <Text style={[mapScreenStyles.modalButtonText, isDarkMode ? mapScreenStyles.modalButtonTextDark : mapScreenStyles.modalButtonTextLight]}>
                  Entendido
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
};

export default MapScreen;