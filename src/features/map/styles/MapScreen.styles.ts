import { StyleSheet } from 'react-native';

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
});