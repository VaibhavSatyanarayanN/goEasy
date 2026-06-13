import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.42;

export default function DestinationCard({ destination, onPress, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {/* Destination Image */}
      <Image source={{ uri: destination.image }} style={styles.image} />

      {/* Rating badge */}
      <View style={styles.ratingBadge}>
        <Ionicons name="star" size={12} color="#f59e0b" />
        <Text style={styles.ratingText}>{destination.rating}</Text>
      </View>

      {/* Info overlay with dark gradient at bottom */}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.85)']}
        style={styles.gradient}
      >
        <Text style={styles.name}>{destination.name}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.country}>{destination.country}</Text>
          <Text style={styles.price}>{destination.priceFrom}</Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: 200,
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
    backgroundColor: '#cbd5e1',
    position: 'relative',
    ...spacing.shadows.sm,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: spacing.sm,
    right: spacing.sm,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: spacing.borderRadius.xs,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1,
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: colors.text,
    marginLeft: 3,
  },
  gradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    padding: spacing.md,
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 2,
  },
  country: {
    fontSize: 11,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  price: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.accent,
  },
});
