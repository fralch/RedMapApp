import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { loadingScreenStyles } from '../styles/LoadingScreen.styles';
import { getPrimaryRed } from '../../../styles/colors';

interface LoadingScreenProps {
  isDarkMode: boolean;
  message?: string;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  isDarkMode, 
  message = "Obteniendo ubicación..." 
}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Animación de pulso para el ícono
    const pulseAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );

    // Animación de rotación para el ícono de ubicación
    const rotateAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );

    pulseAnimation.start();
    rotateAnimation.start();

    return () => {
      pulseAnimation.stop();
      rotateAnimation.stop();
    };
  }, [pulseAnim, rotateAnim, fadeAnim]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const containerStyle = isDarkMode 
    ? loadingScreenStyles.containerDark 
    : loadingScreenStyles.container;

  const textStyle = isDarkMode 
    ? loadingScreenStyles.textDark 
    : loadingScreenStyles.text;

  const subtitleStyle = isDarkMode 
    ? loadingScreenStyles.subtitleDark 
    : loadingScreenStyles.subtitle;

  return (
    <>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
      <Animated.View style={[containerStyle, { opacity: fadeAnim }]}>
        <View style={loadingScreenStyles.content}>
          {/* Círculo de fondo decorativo */}
          <View style={[
            loadingScreenStyles.backgroundCircle,
            isDarkMode ? loadingScreenStyles.backgroundCircleDark : loadingScreenStyles.backgroundCircleLight
          ]} />
          
          {/* Ícono principal con animaciones */}
          <Animated.View style={[
            loadingScreenStyles.iconContainer,
            { 
              transform: [{ scale: pulseAnim }, { rotate: spin }] 
            }
          ]}>
            <Ionicons 
              name="location" 
              size={48} 
              color={getPrimaryRed(isDarkMode)}
            />
          </Animated.View>

          {/* Puntos de carga animados */}
          <View style={loadingScreenStyles.dotsContainer}>
            {[0, 1, 2].map((index) => (
              <AnimatedDot 
                key={index} 
                delay={index * 200} 
                isDarkMode={isDarkMode} 
              />
            ))}
          </View>

          {/* Texto principal */}
          <Text style={textStyle}>{message}</Text>
          
          {/* Subtítulo */}
          <Text style={subtitleStyle}>
            Esto puede tomar unos segundos
          </Text>
        </View>
      </Animated.View>
    </>
  );
};

// Componente para los puntos animados
interface AnimatedDotProps {
  delay: number;
  isDarkMode: boolean;
}

const AnimatedDot: React.FC<AnimatedDotProps> = ({ delay, isDarkMode }) => {
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 600,
          delay,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0.5,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [scaleAnim, delay]);

  return (
    <Animated.View style={[
      loadingScreenStyles.dot,
      isDarkMode ? loadingScreenStyles.dotDark : loadingScreenStyles.dotLight,
      { transform: [{ scale: scaleAnim }] }
    ]} />
  );
};

export default LoadingScreen;