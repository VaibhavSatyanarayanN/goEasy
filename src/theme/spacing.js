import { Platform } from 'react-native';

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 28,
  xxxl: 36,
  jumbo: 48,
  
  headerPaddingTop: Platform.select({
    ios: 54,
    android: 36,
    web: 14,
  }),
  headerPaddingTopDetail: Platform.select({
    ios: 44,
    android: 28,
    web: 14,
  }),
  
  borderRadius: {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    xxl: 32,
    full: 9999,
  },
  
  shadows: {
    sm: Platform.select({
      web: {
        boxShadow: '0px 1px 2px rgba(15, 23, 42, 0.05)',
      },
      default: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
      }
    }),
    md: Platform.select({
      web: {
        boxShadow: '0px 4px 6px rgba(15, 23, 42, 0.08)',
      },
      default: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
      }
    }),
    lg: Platform.select({
      web: {
        boxShadow: '0px 10px 15px rgba(15, 23, 42, 0.12)',
      },
      default: {
        shadowColor: '#0f172a',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.12,
        shadowRadius: 15,
        elevation: 6,
      }
    }),
  }
};
