import { StyleSheet } from 'react-native';
import { colors } from '../../../styles/colors';

export const mapScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },

  themeButton: {
    position: 'absolute',
    bottom: 45,
    right: '6.25%', // 87.5% desde la izquierda (100% - 12.5%)
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  themeButtonLight: {
    backgroundColor: '#FFF',
  },
  themeButtonDark: {
    backgroundColor: '#333',
  },
  locationButton: {
  position: 'absolute',
  bottom: 45,
  left: '6.25%', // 12.5% desde la izquierda
  width: 50,
  height: 50,
  borderRadius: 25,
  justifyContent: 'center',
  alignItems: 'center',
  elevation: 5,
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
},

locationButtonLight: {
  backgroundColor: '#FFF',
  borderWidth: 1,
  borderColor: '#E0E0E0',
},

locationButtonDark: {
  backgroundColor: '#333',
  borderWidth: 1,
  borderColor: '#555',
},

  // Botón para agregar hot points
  addHotPointButton: {
    position: 'absolute',
    bottom: 45,
    left: '31.25%', // 37.5% desde la izquierda
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  addHotPointButtonLight: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  addHotPointButtonDark: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
  },

  // Botón para gestión de usuario
  userManagementButton: {
    position: 'absolute',
    bottom: 45,
    left: '56.25%', // 62.5% desde la izquierda
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  userManagementButtonLight: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  userManagementButtonDark: {
    backgroundColor: '#333',
    borderWidth: 1,
    borderColor: '#555',
  },

  // Texto de los botones
  buttonText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 5,
  },

  // Estilos del Modal Informativo
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    borderRadius: 15,
    padding: 25,
    width: '90%',
    maxWidth: 350,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  modalContainerLight: {
    backgroundColor: '#FFF',
  },
  modalContainerDark: {
    backgroundColor: '#2C2C2C',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalIcon: {
    marginRight: 12,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
  },
  modalTitleLight: {
    color: '#333',
  },
  modalTitleDark: {
    color: '#FFF',
  },
  modalMessage: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 25,
    textAlign: 'center',
  },
  modalMessageLight: {
    color: '#666',
  },
  modalMessageDark: {
    color: '#CCC',
  },
  modalButton: {
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
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
    color: '#FFF',
  },
  modalButtonTextDark: {
    color: '#FFF',
  },
  
  // Estilos para el modal de confirmación
  confirmModalContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    margin: 20,
    maxWidth: 340,
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
  
  confirmModalHeader: {
    alignItems: 'center',
    marginBottom: 20,
  },
  
  confirmIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  
  confirmIconContainerLight: {
    backgroundColor: '#F8F9FA',
  },
  
  confirmIconContainerDark: {
    backgroundColor: '#2A2A2A',
  },
  
  confirmModalTitle: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 4,
  },
  
  confirmModalMessage: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 22,
  },
  
  coordinatesContainer: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  
  coordinatesContainerLight: {
    backgroundColor: '#F8F9FA',
  },
  
  coordinatesContainerDark: {
    backgroundColor: '#2A2A2A',
  },
  
  coordinateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  
  coordinateLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
    marginRight: 8,
    minWidth: 70,
  },
  
  coordinateLabelLight: {
    color: '#495057',
  },
  
  coordinateLabelDark: {
    color: '#CED4DA',
  },
  
  coordinateValue: {
    fontSize: 14,
    fontFamily: 'monospace',
    flex: 1,
  },
  
  coordinateValueLight: {
    color: '#212529',
  },
  
  coordinateValueDark: {
    color: '#F8F9FA',
  },
  
  confirmModalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  
  cancelButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#DEE2E6',
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  cancelButtonLight: {
    borderColor: '#DEE2E6',
    backgroundColor: 'transparent',
  },
  
  cancelButtonDark: {
    borderColor: '#495057',
    backgroundColor: 'transparent',
  },
  
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  
  cancelButtonTextLight: {
    color: '#6C757D',
  },
  
  cancelButtonTextDark: {
    color: '#ADB5BD',
  },
  
  confirmButton: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  
  confirmButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 6,
  },
  
  buttonIcon: {
    marginRight: 2,
  },
});