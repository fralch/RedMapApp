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
    bottom: 40,
    right: 20,
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
  left: 20,
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
});