import React, { useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export default function SplashScreen() {
  const spinValue = useRef(new Animated.Value(0)).current;
  const fadeValue = useRef(new Animated.Value(0)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    const useNativeDriver = Platform.OS !== 'web';

    // 1. Rotation animation for compass icon
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear,
        useNativeDriver,
      })
    ).start();

    // 2. Fade in and scale up animation for logo and text
    Animated.parallel([
      Animated.timing(fadeValue, {
        toValue: 1,
        duration: 1200,
        useNativeDriver,
      }),
      Animated.spring(scaleValue, {
        toValue: 1,
        friction: 5,
        tension: 40,
        useNativeDriver,
      })
    ]).start();
  }, [spinValue, fadeValue, scaleValue]);

  // Interpolate spin value for rotation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LinearGradient
      colors={['#ffffff', '#f0fdfa', '#ecfdf5']}
      style={styles.container}
    >
      <View style={styles.contentContainer}>
        {/* Animated Compass Icon */}
        <Animated.View style={[styles.iconContainer, { transform: [{ rotate: spin }] }]}>
          <Ionicons name="compass" size={80} color={colors.primary} />
        </Animated.View>

        {/* Animated App Logo Name */}
        <Animated.View style={{ opacity: fadeValue, transform: [{ scale: scaleValue }], alignItems: 'center' }}>
          <Text style={styles.logoText}>
            go<Text style={styles.logoHighlight}>Easy</Text>
          </Text>
          <Text style={styles.tagline}>Vacations made easy</Text>
        </Animated.View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 24,
    ...Platform.select({
      web: {
        boxShadow: '0px 8px 16px rgba(13, 148, 136, 0.15)',
      },
      default: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.15,
        shadowRadius: 16,
        elevation: 4,
      },
    }),
  },
  logoText: {
    fontSize: 42,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  logoHighlight: {
    color: colors.primary,
  },
  tagline: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 8,
    letterSpacing: 0.5,
  },
});
