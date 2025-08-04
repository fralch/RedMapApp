import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { errorScreenStyles } from '../styles/ErrorScreen.styles';
import { getPrimaryRed } from '../../../styles/colors';

interface ErrorScreenProps {
  isDarkMode: boolean;
  error?: string | null;
  onRetry?: () => void;
  title?: string;
  message?: string;
}

const ErrorScreen: React.FC<ErrorScreenProps> = ({ 
  isDarkMode, 
  error,
  onRetry,
  title = "Error de ubicación",
  message = "No se pudo obtener la ubicación"
}) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const shakeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Animación de shake para el ícono
    const shakeAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(shakeAnim, {
          toValue: 10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: -10,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(shakeAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.delay(2000), // Pausa entre shakes
      ])
    );

    shakeAnimation.start();

    return () => {
      shakeAnimation.stop();
    };
  }, [fadeAnim, shakeAnim]);

  const containerStyle = isDarkMode 
    ? errorScreenStyles.containerDark 
    : errorScreenStyles.container;

  const titleStyle = isDarkMode 
    ? errorScreenStyles.titleDark 
    : errorScreenStyles.title;

  const messageStyle = isDarkMode 
    ? errorScreenStyles.messageDark 
    : errorScreenStyles.message;

  const errorTextStyle = isDarkMode 
    ? errorScreenStyles.errorTextDark 
    : errorScreenStyles.errorText;

  const retryButtonStyle = isDarkMode 
    ? [errorScreenStyles.retryButton, errorScreenStyles.retryButtonDark]
    : [errorScreenStyles.retryButton, errorScreenStyles.retryButtonLight];

  const retryButtonTextStyle = isDarkMode 
    ? errorScreenStyles.retryButtonTextDark 
    : errorScreenStyles.retryButtonTextLight;

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Animated.View style={[containerStyle, { opacity: fadeAnim }]}>
        <View style={errorScreenStyles.content}>
          {/* Círculo de fondo decorativo */}
          <View style={[
            errorScreenStyles.backgroundCircle,
            isDarkMode ? errorScreenStyles.backgroundCircleDark : errorScreenStyles.backgroundCircleLight
          ]} />
          
          {/* Ícono principal con animación de shake */}
          <Animated.View style={[
            errorScreenStyles.iconContainer,
            isDarkMode ? errorScreenStyles.iconContainerDark : errorScreenStyles.iconContainerLight,
            { transform: [{ translateX: shakeAnim }] }
          ]}>
            <Ionicons 
              name="location-outline" 
              size={48} 
              color={getPrimaryRed(isDarkMode)} 
            />
          </Animated.View>

          {/* Título */}
          <Text style={titleStyle}>{title}</Text>
          
          {/* Mensaje principal */}
          <Text style={messageStyle}>{message}</Text>
          
          {/* Error específico si existe */}
          {error && (
            <View style={errorScreenStyles.errorContainer}>
              <Text style={errorTextStyle}>{error}</Text>
            </View>
          )}

          {/* Botón de reintentar */}
          {onRetry && (
            <TouchableOpacity 
              style={retryButtonStyle}
              onPress={onRetry}
              activeOpacity={0.8}
            >
              <Ionicons 
                name="refresh" 
                size={20} 
                color={isDarkMode ? "#fff" : "#007AFF"} 
                style={errorScreenStyles.retryButtonIcon}
              />
              <Text style={retryButtonTextStyle}>Intentar de nuevo</Text>
            </TouchableOpacity>
          )}

          {/* Sugerencias */}
          <View style={errorScreenStyles.suggestionsContainer}>
            <Text style={[
              errorScreenStyles.suggestionTitle,
              isDarkMode ? errorScreenStyles.suggestionTitleDark : errorScreenStyles.suggestionTitleLight
            ]}>
              Sugerencias:
            </Text>
            <Text style={[
              errorScreenStyles.suggestion,
              isDarkMode ? errorScreenStyles.suggestionDark : errorScreenStyles.suggestionLight
            ]}>
              • Verifica que los permisos de ubicación estén habilitados
            </Text>
            <Text style={[
              errorScreenStyles.suggestion,
              isDarkMode ? errorScreenStyles.suggestionDark : errorScreenStyles.suggestionLight
            ]}>
              • Asegúrate de tener una conexión a internet
            </Text>
            <Text style={[
              errorScreenStyles.suggestion,
              isDarkMode ? errorScreenStyles.suggestionDark : errorScreenStyles.suggestionLight
            ]}>
              • Intenta activar el GPS en tu dispositivo
            </Text>
          </View>
        </View>
      </Animated.View>
    </>
  );
};

export default ErrorScreen;