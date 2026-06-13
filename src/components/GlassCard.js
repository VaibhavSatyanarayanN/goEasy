import React from 'react';
import { StyleSheet, View } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function GlassCard({ children, style }) {
  return (
    <View style={[styles.cardContainer, style]}>
      <BlurView intensity={60} tint="light" style={styles.blurView}>
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    backgroundColor: 'rgba(255, 255, 255, 0.65)',
    ...spacing.shadows.md,
  },
  blurView: {
    width: '100%',
  },
  content: {
    padding: spacing.xl,
  },
});
