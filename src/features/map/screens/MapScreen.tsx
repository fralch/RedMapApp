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
import SuccessModal from '../../../components/common/SuccessModal';
import { getPrimaryRed } from '../../../styles/colors';
import coordinates from '../data/coordinates.json';

interface UserHotPoint {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

const MapScreen: React.FC = () => {
  const mapRef = useRef<MapView>(null);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [pendingCoordinate, setPendingCoordinate] = useState<{latitude: number, longitude: number} | null>(null);
  const [userHotPoints, setUserHotPoints] = useState<UserHotPoint[]>([]);
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

  const handleLongPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setPendingCoordinate(coordinate);
    setIsConfirmModalVisible(true);
  };

  const handleConfirmAddHotPoint = () => {
    if (pendingCoordinate) {
      const newHotPoint: UserHotPoint = {
        id: `hotpoint_${Date.now()}`,
        latitude: pendingCoordinate.latitude,
        longitude: pendingCoordinate.longitude,
        timestamp: Date.now(),
      };
      
      setUserHotPoints(prevPoints => [...prevPoints, newHotPoint]);
      setIsConfirmModalVisible(false);
      setPendingCoordinate(null);
      
      // Mostrar modal de éxito
      setIsSuccessModalVisible(true);
    }
  };

  const handleCancelAddHotPoint = () => {
    setIsConfirmModalVisible(false);
    setPendingCoordinate(null);
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
          onLongPress={handleLongPress}
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
            points={[
              ...coordinates.map(c => ({ latitude: c.latitud, longitude: c.longitud, weight: 1 })),
              ...userHotPoints.map(point => ({ latitude: point.latitude, longitude: point.longitude, weight: 1 }))
            ]}
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
                  color={getPrimaryRed(isDarkMode)}
                  style={mapScreenStyles.modalIcon}
                />
                <Text style={[mapScreenStyles.modalTitle, isDarkMode ? mapScreenStyles.modalTitleDark : mapScreenStyles.modalTitleLight]}>
                  Agregar un nuevo punto 
                </Text>
              </View>
              
              <Text style={[mapScreenStyles.modalMessage, isDarkMode ? mapScreenStyles.modalMessageDark : mapScreenStyles.modalMessageLight]}>
                Para agregar un nuevo punto de calor, mantén presionado (long press) cualquier punto en la pantalla del mapa donde desees marcarlo.
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

        {/* Modal de Confirmación para Agregar Hot Point */}
        <Modal
          visible={isConfirmModalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={handleCancelAddHotPoint}
        >
          <View style={mapScreenStyles.modalOverlay}>
            <View style={[mapScreenStyles.confirmModalContainer, isDarkMode ? mapScreenStyles.modalContainerDark : mapScreenStyles.modalContainerLight]}>
              <View style={mapScreenStyles.confirmModalHeader}>
                <View style={[mapScreenStyles.confirmIconContainer, isDarkMode ? mapScreenStyles.confirmIconContainerDark : mapScreenStyles.confirmIconContainerLight]}>
                  <Ionicons
                    name="location"
                    size={28}
                    color={getPrimaryRed(isDarkMode)}
                  />
                </View>
                <Text style={[mapScreenStyles.confirmModalTitle, isDarkMode ? mapScreenStyles.modalTitleDark : mapScreenStyles.modalTitleLight]}>
                  Confirmar Hot Point
                </Text>
              </View>
              
              <Text style={[mapScreenStyles.confirmModalMessage, isDarkMode ? mapScreenStyles.modalMessageDark : mapScreenStyles.modalMessageLight]}>
                ¿Deseas agregar un punto de calor en esta ubicación?
              </Text>
              
              {pendingCoordinate && (
                 <View style={[mapScreenStyles.coordinatesContainer, isDarkMode ? mapScreenStyles.coordinatesContainerDark : mapScreenStyles.coordinatesContainerLight]}>
                  <View style={mapScreenStyles.coordinateRow}>
                    <Ionicons name="compass" size={16} color={isDarkMode ? '#CCC' : '#666'} />
                    <Text style={[mapScreenStyles.coordinateLabel, isDarkMode ? mapScreenStyles.coordinateLabelDark : mapScreenStyles.coordinateLabelLight]}>Latitud:</Text>
                    <Text style={[mapScreenStyles.coordinateValue, isDarkMode ? mapScreenStyles.coordinateValueDark : mapScreenStyles.coordinateValueLight]}>
                      {pendingCoordinate.latitude.toFixed(6)}
                    </Text>
                  </View>
                  <View style={mapScreenStyles.coordinateRow}>
                    <Ionicons name="compass" size={16} color={isDarkMode ? '#CCC' : '#666'} />
                    <Text style={[mapScreenStyles.coordinateLabel, isDarkMode ? mapScreenStyles.coordinateLabelDark : mapScreenStyles.coordinateLabelLight]}>Longitud:</Text>
                    <Text style={[mapScreenStyles.coordinateValue, isDarkMode ? mapScreenStyles.coordinateValueDark : mapScreenStyles.coordinateValueLight]}>
                      {pendingCoordinate.longitude.toFixed(6)}
                    </Text>
                  </View>
                </View>
              )}
              
              <View style={mapScreenStyles.confirmModalButtons}>
                <TouchableOpacity
                  style={[mapScreenStyles.cancelButton, isDarkMode ? mapScreenStyles.cancelButtonDark : mapScreenStyles.cancelButtonLight]}
                  onPress={handleCancelAddHotPoint}
                  activeOpacity={0.7}
                >
                  <Text style={[mapScreenStyles.cancelButtonText, isDarkMode ? mapScreenStyles.cancelButtonTextDark : mapScreenStyles.cancelButtonTextLight]}>
                    Cancelar
                  </Text>
                </TouchableOpacity>
                
                <TouchableOpacity
                  style={[mapScreenStyles.confirmButton, isDarkMode ? mapScreenStyles.modalButtonDark : mapScreenStyles.modalButtonLight]}
                  onPress={handleConfirmAddHotPoint}
                  activeOpacity={0.7}
                >
                  <Ionicons name="add-circle" size={18} color="#FFF" style={mapScreenStyles.buttonIcon} />
                  <Text style={[mapScreenStyles.confirmButtonText, isDarkMode ? mapScreenStyles.modalButtonTextDark : mapScreenStyles.modalButtonTextLight]}>
                    Agregar
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        {/* Modal de Éxito */}
        <SuccessModal
          visible={isSuccessModalVisible}
          title="Hot Point Agregado"
          message="El punto de calor ha sido agregado exitosamente."
          onClose={() => setIsSuccessModalVisible(false)}
          isDarkMode={isDarkMode}
        />
      </View>
    </>
  );
};

export default MapScreen;