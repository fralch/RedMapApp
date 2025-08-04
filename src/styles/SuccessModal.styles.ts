import { StyleSheet } from 'react-native';
import { colors } from './colors';

export const successModalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  modalContainer: {
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 320,
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  
  modalContainerLight: {
    backgroundColor: '#FFFFFF',
  },
  
  modalContainerDark: {
    backgroundColor: '#1F1F1F',
  },
  
  modalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  iconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  
  iconContainerLight: {
    backgroundColor: '#F0FDF4',
  },
  
  iconContainerDark: {
    backgroundColor: '#1F0F0F',
  },
  
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  
  modalTitleLight: {
    color: '#1F2937',
  },
  
  modalTitleDark: {
    color: '#F9FAFB',
  },
  
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  
  modalMessageLight: {
    color: '#6B7280',
  },
  
  modalMessageDark: {
    color: '#D1D5DB',
  },
  
  modalButton: {
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  modalButtonLight: {
    backgroundColor: colors.primary.red.light,
  },
  
  modalButtonDark: {
    backgroundColor: colors.primary.red.dark,
  },
  
  modalButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  modalButtonTextLight: {
    color: '#FFFFFF',
  },
  
  modalButtonTextDark: {
    color: '#FFFFFF',
  },
});