import React, { useEffect, useRef, useState } from 'react';
import { View, Alert, Text, TouchableOpacity, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useMapStore } from '../store/mapStore';
import { mapScreenStyles } from '../styles';
import LoadingScreen from '../components/LoadingScreen';
import ErrorScreen from '../components/ErrorScreen';
import AuthModal from '../../auth/components/AuthModal';
import SuccessModal from '../../../components/common/SuccessModal';
import { getPrimaryRed } from '../../../styles/colors';
import coordinates from '../data/coordinates.json';
import LeafletMapView from '../components/LeafletMapView';

interface UserHotPoint {
  id: string;
  latitude: number;
  longitude: number;
  timestamp: number;
}

const MapScreen: React.FC = () => {
  const mapRef = useRef<any>(null);
  const [isAuthModalVisible, setIsAuthModalVisible] = useState(false);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
  const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
  const [pendingCoordinate, setPendingCoordinate] = useState<{latitude: number, longitude: number} | null>(null);
  const [userHotPoints, setUserHotPoints] = useState<UserHotPoint[]>([]);
  const [mapCenter, setMapCenter] = useState<{latitude: number, longitude: number} | null>(null);
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
    if (userLocation) {
      // Force re-center by updating the map center state
      setMapCenter({
        latitude: userLocation.latitude + 0.00001, // Small offset to trigger re-render
        longitude: userLocation.longitude
      });
      
      // Reset after a brief delay to allow the map to center
      setTimeout(() => {
        setMapCenter(userLocation);
      }, 100);
    }
  };

  const handleLongPress = (coordinate: { latitude: number; longitude: number }) => {
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

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <View style={mapScreenStyles.container}>
        <LeafletMapView
          center={mapCenter || {
            latitude: userLocation.latitude,
            longitude: userLocation.longitude,
          }}
          zoom={16}
          isDarkMode={isDarkMode}
          style={mapScreenStyles.map}
          markers={[
            {
              id: 'user-location',
              latitude: userLocation.latitude,
              longitude: userLocation.longitude,
              title: 'Mi ubicación',
              description: 'Tu ubicación actual',
            }
          ]}
          heatmapPoints={[
            ...coordinates.map((c, index) => ({ 
              latitude: c.latitud, 
              longitude: c.longitud, 
              weight: 1.0 // Uniform weight for all points
            })),
            ...userHotPoints.map(point => ({ 
              latitude: point.latitude, 
              longitude: point.longitude, 
              weight: 1.0 // Same weight as other points
            }))
          ]}
          heatmapOptions={{
            radius: isDarkMode ? 20 : 18,
            blur: 15,
            maxZoom: 16,
            max: 2.0,
          }}
          onLongPress={handleLongPress}
        />
        
        {/* Botón para centrar en la ubicación - Inferior Izquierda */}
        <TouchableOpacity
          style={[mapScreenStyles.locationButton, isDarkMode ? mapScreenStyles.locationButtonDark : mapScreenStyles.locationButtonLight]}
          onPress={centerOnUserLocation}
          activeOpacity={0.8}
        >
          <Ionicons
            name="locate"
            size={26}
            color={isDarkMode ? '#FFF' : '#333'}
          />
        </TouchableOpacity>
        
        {/* Botón para cambiar el tema del mapa */}
        <TouchableOpacity
          style={[mapScreenStyles.themeButton, isDarkMode ? mapScreenStyles.themeButtonDark : mapScreenStyles.themeButtonLight]}
          onPress={toggleDarkMode}
          activeOpacity={0.8}
        >
          <Ionicons
            name={isDarkMode ? 'sunny' : 'moon'}
            size={26}
            color={isDarkMode ? '#FFF' : '#333'}
          />
        </TouchableOpacity>

        {/* Botón para agregar hot points - Centro Inferior */}
        <TouchableOpacity
          style={[mapScreenStyles.addHotPointButton, isDarkMode ? mapScreenStyles.addHotPointButtonDark : mapScreenStyles.addHotPointButtonLight]}
          onPress={() => setIsInfoModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="add"
            size={28}
            color="#FFFFFF"
          />
        </TouchableOpacity>

        {/* Botón para gestión de usuario - Centro Inferior Derecha */}
        <TouchableOpacity
          style={[mapScreenStyles.userManagementButton, isDarkMode ? mapScreenStyles.userManagementButtonDark : mapScreenStyles.userManagementButtonLight]}
          onPress={() => setIsAuthModalVisible(true)}
          activeOpacity={0.8}
        >
          <Ionicons
            name="person-circle"
            size={26}
            color={isDarkMode ? '#FFF' : '#333'}
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