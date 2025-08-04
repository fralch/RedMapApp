import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
  PanResponder,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { authModalStyles } from '../styles/AuthModal.styles';
import { getPrimaryRed } from '../../../styles/colors';

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose, isDarkMode }) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const panY = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
      },
      onPanResponderGrant: () => {
        panY.setOffset(panY._value);
        panY.setValue(0);
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        panY.flattenOffset();
        if (gestureState.dy > 100 || gestureState.vy > 0.8) {
          closeModal();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            tension: 100,
            friction: 8,
          }).start();
        }
      },
      onPanResponderTerminate: () => {
        panY.flattenOffset();
        Animated.spring(panY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
      },
    })
  ).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 500,
          delay: 200,
          useNativeDriver: true,
        })
      ]).start();
    } else {
      titleOpacity.setValue(0);
    }
  }, [visible]);

  const closeModal = () => {
    Animated.timing(slideAnim, {
      toValue: screenHeight,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      panY.setValue(0);
      onClose();
    });
  };

  const handleGoogleLogin = () => {
    // Animación de presión del botón
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      })
    ]).start();
    
    Alert.alert('Iniciar Sesión con Google', 'Funcionalidad de Google Auth pendiente de implementar');
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={closeModal}
    >
      <View style={authModalStyles.overlay}>
        <TouchableOpacity
          style={authModalStyles.overlayTouchable}
          activeOpacity={1}
          onPress={closeModal}
        />
        <Animated.View
          style={[
            authModalStyles.modalContainer,
            isDarkMode ? authModalStyles.modalContainerDark : authModalStyles.modalContainerLight,
            {
              transform: [
                { translateY: slideAnim },
                { translateY: panY },
              ],
            },
          ]}
        >
          {/* Área de deslizamiento con handle bar */}
          <View 
            style={authModalStyles.dragArea}
            {...panResponder.panHandlers}
          >
            <View style={[
              authModalStyles.handleBar,
              isDarkMode ? authModalStyles.handleBarDark : authModalStyles.handleBarLight
            ]} />
          </View>

          {/* Header */}
          <View style={authModalStyles.header}>
            <Animated.Text style={[
              authModalStyles.title,
              isDarkMode ? authModalStyles.titleDark : authModalStyles.titleLight,
              { opacity: titleOpacity }
            ]}>
              Bienvenido a RedMap
            </Animated.Text>
            <Animated.Text style={[
              authModalStyles.subtitle,
              isDarkMode ? authModalStyles.subtitleDark : authModalStyles.subtitleLight,
              { opacity: titleOpacity }
            ]}>
              Inicia sesión para continuar
            </Animated.Text>
          </View>

          {/* Botones de autenticación */}
          <View style={authModalStyles.buttonsContainer}>
            {/* Botón de Google */}
            <Animated.View style={{ transform: [{ scale: buttonScale }] }}>
              <TouchableOpacity
                style={[
                  authModalStyles.authButton,
                  authModalStyles.googleButton,
                  isDarkMode ? authModalStyles.googleButtonDark : authModalStyles.googleButtonLight
                ]}
                onPress={handleGoogleLogin}
                activeOpacity={0.9}
              >
                <Ionicons name="logo-google" size={26} color={getPrimaryRed(isDarkMode)} />
                <Text style={[
                  authModalStyles.buttonText,
                  isDarkMode ? authModalStyles.buttonTextDark : authModalStyles.buttonTextLight
                ]}>
                  Continuar con Google
                </Text>
              </TouchableOpacity>
            </Animated.View>


          </View>

          {/* Footer */}
          <View style={authModalStyles.footer}>
            <Text style={[
              authModalStyles.footerText,
              isDarkMode ? authModalStyles.footerTextDark : authModalStyles.footerTextLight
            ]}>
              Al continuar, aceptas nuestros términos y condiciones
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default AuthModal;