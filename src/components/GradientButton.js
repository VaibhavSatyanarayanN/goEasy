import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function GradientButton({ title, onPress, loading, style, disabled }) {
  const buttonContent = (
    <LinearGradient
      colors={disabled ? ['#d1d5db', '#9ca3af'] : colors.gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.gradient}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) : (
        <Text style={styles.text}>{title}</Text>
      )}
    </LinearGradient>
  );

  if (disabled || loading) {
    return (
      <TouchableOpacity activeOpacity={1} style={[styles.container, style]} disabled={true}>
        {buttonContent}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} style={[styles.container, style]}>
      {buttonContent}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 50,
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
    ...spacing.shadows.sm,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
