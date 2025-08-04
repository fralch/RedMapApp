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

interface AuthModalProps {
  visible: boolean;
  onClose: () => void;
  isDarkMode: boolean;
}

const { height: screenHeight } = Dimensions.get('window');

const AuthModal: React.FC<AuthModalProps> = ({ visible, onClose, isDarkMode }) => {
  const slideAnim = useRef(new Animated.Value(screenHeight)).current;
  const panY = useRef(new Animated.Value(0)).current;

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
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
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
    Alert.alert('Iniciar Sesión con Google', 'Funcionalidad de Google Auth pendiente de implementar');
  };

  const handleCreateAccount = () => {
    Alert.alert('Crear Cuenta', 'Funcionalidad de registro pendiente de implementar');
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
            <Text style={[
              authModalStyles.title,
              isDarkMode ? authModalStyles.titleDark : authModalStyles.titleLight
            ]}>
              Bienvenido a RedMap
            </Text>
            <Text style={[
              authModalStyles.subtitle,
              isDarkMode ? authModalStyles.subtitleDark : authModalStyles.subtitleLight
            ]}>
              Inicia sesión o crea una cuenta para continuar
            </Text>
          </View>

          {/* Botones de autenticación */}
          <View style={authModalStyles.buttonsContainer}>
            {/* Botón de Google */}
            <TouchableOpacity
              style={[
                authModalStyles.authButton,
                authModalStyles.googleButton,
                isDarkMode ? authModalStyles.googleButtonDark : authModalStyles.googleButtonLight
              ]}
              onPress={handleGoogleLogin}
              activeOpacity={0.8}
            >
              <Ionicons name="logo-google" size={24} color={isDarkMode ? '#FFF' : '#4285F4'} />
              <Text style={[
                authModalStyles.buttonText,
                isDarkMode ? authModalStyles.buttonTextDark : authModalStyles.buttonTextLight
              ]}>
                Continuar con Google
              </Text>
            </TouchableOpacity>

            {/* Separador */}
            <View style={authModalStyles.separatorContainer}>
              <View style={[
                authModalStyles.separatorLine,
                isDarkMode ? authModalStyles.separatorLineDark : authModalStyles.separatorLineLight
              ]} />
              <Text style={[
                authModalStyles.separatorText,
                isDarkMode ? authModalStyles.separatorTextDark : authModalStyles.separatorTextLight
              ]}>
                o
              </Text>
              <View style={[
                authModalStyles.separatorLine,
                isDarkMode ? authModalStyles.separatorLineDark : authModalStyles.separatorLineLight
              ]} />
            </View>

            {/* Botón de crear cuenta */}
            <TouchableOpacity
              style={[
                authModalStyles.authButton,
                authModalStyles.createAccountButton,
                isDarkMode ? authModalStyles.createAccountButtonDark : authModalStyles.createAccountButtonLight
              ]}
              onPress={handleCreateAccount}
              activeOpacity={0.8}
            >
              <Ionicons name="person-add" size={24} color={isDarkMode ? '#333' : '#FFF'} />
              <Text style={[
                authModalStyles.buttonText,
                authModalStyles.createAccountButtonText,
                isDarkMode ? authModalStyles.createAccountButtonTextDark : authModalStyles.createAccountButtonTextLight
              ]}>
                Crear nueva cuenta
              </Text>
            </TouchableOpacity>
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