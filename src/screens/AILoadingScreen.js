import React, { useEffect, useState, useRef } from 'react';
import { StyleSheet, Text, View, Animated, Easing, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const loadingTexts = [
  'Analyzing your preferences...',
  'Finding the best destinations...',
  'Curating hotels matching your budget...',
  'Planning day-by-day itineraries...',
  'Organizing flight schedules...',
  'Almost there, finishing up...',
];

export default function AILoadingScreen({ route, navigation }) {
  const { tripDetails } = route.params;
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);
  const progressAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Rotation animation for the loading gear/compass
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2500,
        easing: Easing.linear,
        useNativeDriver: Platform.OS !== 'web',
      })
    ).start();

    // 2. Progress Bar animation
    Animated.timing(progressAnim, {
      toValue: 1,
      duration: 6500,
      easing: Easing.out(Easing.ease),
      useNativeDriver: false,
    }).start();

    // 3. Cycle text messages
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex += 1;
      if (textIndex < loadingTexts.length) {
        setLoadingText(loadingTexts[textIndex]);
      }
    }, 1100);

    // 4. Timeout to navigate to TripBoard
    const navTimeout = setTimeout(() => {
      clearInterval(textInterval);
      
      // Navigate to TripBoard detail page
      // Determine which mock itinerary ID to open based on destination
      const tbId = tripDetails.destinationId === 'bali' ? 'tb-bali' : 'tb-japan';
      
      navigation.replace('TripBoard', { tripboardId: tbId });
    }, 6500);

    return () => {
      clearInterval(textInterval);
      clearTimeout(navTimeout);
    };
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <LinearGradient
      colors={['#ffffff', '#f0fdfa', '#ecfdf5']}
      style={styles.container}
    >
      <View style={styles.content}>
        {/* Animated Spin Compass */}
        <Animated.View style={[styles.iconContainer, { transform: [{ rotate: spin }] }]}>
          <Ionicons name="sparkles" size={64} color={colors.primary} />
        </Animated.View>

        <Text style={styles.title}>Creating Your Trip</Text>
        <Text style={styles.subtitle}>Our AI is custom building your itinerary for {tripDetails.destinationName}...</Text>

        {/* Custom Progress Bar */}
        <View style={styles.progressBarBg}>
          <Animated.View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>

        {/* Loading text messages */}
        <Text style={styles.loadingStatusText}>{loadingText}</Text>
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
  content: {
    width: '80%',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: spacing.xl,
    padding: spacing.md,
    borderRadius: 36,
    backgroundColor: '#ffffff',
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 10px rgba(13, 148, 136, 0.15)',
      },
      default: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.15,
        shadowRadius: 10,
        elevation: 3,
      },
    }),
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  subtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: spacing.xxl,
    fontWeight: '500',
  },
  progressBarBg: {
    width: '100%',
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 4,
  },
  loadingStatusText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
    marginTop: spacing.sm,
  },
});
