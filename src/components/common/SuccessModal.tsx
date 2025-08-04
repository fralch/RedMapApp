import React from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { successModalStyles } from '../../styles/SuccessModal.styles';
import { getPrimaryRed } from '../../styles/colors';

interface SuccessModalProps {
  visible: boolean;
  title: string;
  message: string;
  onClose: () => void;
  isDarkMode: boolean;
}

const SuccessModal: React.FC<SuccessModalProps> = ({
  visible,
  title,
  message,
  onClose,
  isDarkMode,
}) => {
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={successModalStyles.modalOverlay}>
        <View style={[
          successModalStyles.modalContainer,
          isDarkMode ? successModalStyles.modalContainerDark : successModalStyles.modalContainerLight
        ]}>
          <View style={successModalStyles.modalHeader}>
            <View style={[
              successModalStyles.iconContainer,
              isDarkMode ? successModalStyles.iconContainerDark : successModalStyles.iconContainerLight
            ]}>
              <Ionicons
                name="checkmark-circle"
                size={32}
                color={getPrimaryRed(isDarkMode)}
              />
            </View>
            <Text style={[
              successModalStyles.modalTitle,
              isDarkMode ? successModalStyles.modalTitleDark : successModalStyles.modalTitleLight
            ]}>
              {title}
            </Text>
          </View>
          
          <Text style={[
            successModalStyles.modalMessage,
            isDarkMode ? successModalStyles.modalMessageDark : successModalStyles.modalMessageLight
          ]}>
            {message}
          </Text>
          
          <TouchableOpacity
            style={[
              successModalStyles.modalButton,
              isDarkMode ? successModalStyles.modalButtonDark : successModalStyles.modalButtonLight
            ]}
            onPress={onClose}
            activeOpacity={0.7}
          >
            <Text style={[
              successModalStyles.modalButtonText,
              isDarkMode ? successModalStyles.modalButtonTextDark : successModalStyles.modalButtonTextLight
            ]}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SuccessModal;