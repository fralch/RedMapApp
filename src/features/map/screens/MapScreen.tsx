import React, { useEffect } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Text } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useMapStore } from '../store/mapStore';

const MapScreen: React.FC = () => {
  const {
    userLocation,
    isLoadingLocation,
    error,
    getCurrentLocation,
    setError,
  } = useMapStore();

  useEffect(() => {
    // Obtener la ubicación del usuario al montar el componente
    getCurrentLocation();
  }, [getCurrentLocation]);

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
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  if (!userLocation) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          No se pudo obtener la ubicación.
          {error && `\n${error}`}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: '#d32f2f',
    textAlign: 'center',
    lineHeight: 24,
  },
});

export default MapScreen;