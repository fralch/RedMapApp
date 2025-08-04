import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../../styles/colors';

const { width, height } = Dimensions.get('window');

export const loadingScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 20,
  },
  containerDark: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#170d0d',
    paddingHorizontal: 20,
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundCircle: {
    position: 'absolute',
    width: 200,
    height: 200,
    borderRadius: 100,
    opacity: 0.1,
    top: -50,
  },
  backgroundCircleLight: {
    backgroundColor: colors.primary.red.light,
  },
  backgroundCircleDark: {
    backgroundColor: colors.primary.red.dark,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(246, 100, 100, 0.1)',
    marginBottom: 30,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  dotLight: {
    backgroundColor: colors.primary.red.light,
  },
  dotDark: {
    backgroundColor: colors.primary.red.dark,
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  textDark: {
    fontSize: 18,
    fontWeight: '600',
    color: '#e6edf3',
    textAlign: 'center',
    marginBottom: 8,
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b7280',
    textAlign: 'center',
    fontWeight: '400',
    opacity: 0.8,
  },
  subtitleDark: {
    fontSize: 14,
    color: '#8b949e',
    textAlign: 'center',
    fontWeight: '400',
    opacity: 0.8,
  },
});