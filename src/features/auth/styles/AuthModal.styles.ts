import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const authModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContainer: {
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: 24,
    paddingBottom: 40,
    paddingTop: 10,
    minHeight: height * 0.45,
    maxHeight: height * 0.65,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  modalContainerLight: {
    backgroundColor: '#FFFFFF',
    borderTopWidth: 3
  },
  modalContainerDark: {
    backgroundColor: '#1a1a1a',
    borderTopWidth: 3
  },
  dragArea: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 5,
  },
  handleBar: {
    width: 50,
    height: 5,
    borderRadius: 3,
  },
  handleBarLight: {
    backgroundColor: '#DC2626',
  },
  handleBarDark: {
    backgroundColor: '#EF4444',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  titleLight: {
    color: '#DC2626',
  },
  titleDark: {
    color: '#EF4444',
  },
  subtitle: {
    fontSize: 17,
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '500',
  },
  subtitleLight: {
    color: '#666666',
  },
  subtitleDark: {
    color: '#CCCCCC',
  },
  buttonsContainer: {
    justifyContent: 'flex-start',
    gap: 20,
    paddingHorizontal: 4,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    paddingHorizontal: 24,
    borderRadius: 16,
    gap: 14,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    transform: [{ scale: 1 }],
  },
  googleButton: {
    borderWidth: 2,
  },
  googleButtonLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#DC2626',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  googleButtonDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#EF4444',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },

  createAccountButton: {
    borderWidth: 0,
  },
  createAccountButtonLight: {
    backgroundColor: '#DC2626',
  },
  createAccountButtonDark: {
    backgroundColor: '#EF4444',
  },
  buttonText: {
    fontSize: 17,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  buttonTextLight: {
    color: '#DC2626',
  },
  buttonTextDark: {
    color: '#EF4444',
  },
  createAccountButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  createAccountButtonTextLight: {
    color: '#FFFFFF',
  },
  createAccountButtonTextDark: {
    color: '#1a1a1a',
  },
  separatorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  separatorLine: {
    flex: 1,
    height: 1,
  },
  separatorLineLight: {
    backgroundColor: '#E0E0E0',
  },
  separatorLineDark: {
    backgroundColor: '#444',
  },
  separatorText: {
    marginHorizontal: 16,
    fontSize: 14,
    fontWeight: '500',
  },
  separatorTextLight: {
    color: '#666666',
  },
  separatorTextDark: {
    color: '#CCCCCC',
  },
  footer: {
    marginTop: 30,
    paddingTop: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(220, 38, 38, 0.1)',
  },
  footerText: {
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '500',
  },
  footerTextLight: {
    color: '#999999',
  },
  footerTextDark: {
    color: '#AAAAAA',
  },
});