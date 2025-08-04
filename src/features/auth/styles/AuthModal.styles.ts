import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

export const authModalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  overlayTouchable: {
    flex: 1,
  },
  modalContainer: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 10,
    minHeight: height * 0.6,
    maxHeight: height * 0.8,
  },
  modalContainerLight: {
    backgroundColor: '#FFFFFF',
  },
  modalContainerDark: {
    backgroundColor: '#1a1a1a',
  },
  handleBar: {
    width: 40,
    height: 4,
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  handleBarLight: {
    backgroundColor: '#E0E0E0',
  },
  handleBarDark: {
    backgroundColor: '#555',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  titleLight: {
    color: '#1a1a1a',
  },
  titleDark: {
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
  },
  subtitleLight: {
    color: '#666666',
  },
  subtitleDark: {
    color: '#CCCCCC',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 16,
  },
  authButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    gap: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  googleButton: {
    borderWidth: 1,
  },
  googleButtonLight: {
    backgroundColor: '#FFFFFF',
    borderColor: '#E0E0E0',
  },
  googleButtonDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
  },
  emailButton: {
    borderWidth: 1,
  },
  emailButtonLight: {
    backgroundColor: '#F8F9FA',
    borderColor: '#E0E0E0',
  },
  emailButtonDark: {
    backgroundColor: '#2a2a2a',
    borderColor: '#444',
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
    fontSize: 16,
    fontWeight: '600',
  },
  buttonTextLight: {
    color: '#333333',
  },
  buttonTextDark: {
    color: '#FFFFFF',
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
    marginTop: 20,
    paddingTop: 20,
  },
  footerText: {
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 18,
  },
  footerTextLight: {
    color: '#999999',
  },
  footerTextDark: {
    color: '#AAAAAA',
  },
});