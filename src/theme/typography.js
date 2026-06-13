import { Platform } from 'react-native';

export const typography = {
  fontFamilies: {
    // Custom font configuration, fallback to system fonts if not loaded yet
    heading: Platform.select({ ios: 'Outfit-Bold', android: 'Outfit-Bold', default: 'sans-serif' }),
    headingMedium: Platform.select({ ios: 'Outfit-Medium', android: 'Outfit-Medium', default: 'sans-serif-medium' }),
    body: Platform.select({ ios: 'Inter-Regular', android: 'Inter-Regular', default: 'sans-serif' }),
    bodyMedium: Platform.select({ ios: 'Inter-Medium', android: 'Inter-Medium', default: 'sans-serif-medium' }),
    bodyBold: Platform.select({ ios: 'Inter-Bold', android: 'Inter-Bold', default: 'sans-serif' }),
  },
  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    xxl: 24,
    xxxl: 28,
    jumbo: 36,
  },
  lineHeights: {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 26,
    xl: 28,
    xxl: 32,
    xxxl: 36,
    jumbo: 44,
  },
  styles: {
    h1: {
      fontSize: 32,
      lineHeight: 40,
      fontWeight: '700',
    },
    h2: {
      fontSize: 24,
      lineHeight: 30,
      fontWeight: '700',
    },
    h3: {
      fontSize: 20,
      lineHeight: 26,
      fontWeight: '600',
    },
    bodyLarge: {
      fontSize: 16,
      lineHeight: 24,
      fontWeight: '400',
    },
    bodyMedium: {
      fontSize: 14,
      lineHeight: 20,
      fontWeight: '400',
    },
    bodySmall: {
      fontSize: 12,
      lineHeight: 16,
      fontWeight: '400',
    },
    button: {
      fontSize: 16,
      fontWeight: '600',
      lineHeight: 20,
    },
    caption: {
      fontSize: 11,
      lineHeight: 14,
      fontWeight: '500',
    }
  }
};
