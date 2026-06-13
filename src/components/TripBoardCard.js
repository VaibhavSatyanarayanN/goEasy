import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import destinations from '../data/destinations';

export default function TripBoardCard({ tripboard, onPress, style }) {
  // Find destination details for cover image
  const destination = destinations.find(d => d.id === tripboard.destinationId) || {
    name: 'Unknown',
    image: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=600&q=80'
  };

  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {/* Cover Image */}
      <Image source={{ uri: destination.image }} style={styles.coverImage} />

      {/* Stats row on top of cover image */}
      <View style={styles.durationBadge}>
        <Text style={styles.durationText}>{tripboard.duration}</Text>
      </View>

      <View style={styles.content}>
        {/* Creator Info */}
        <View style={styles.creatorRow}>
          <Image source={{ uri: tripboard.creator.avatar }} style={styles.avatar} />
          <View>
            <Text style={styles.creatorName}>{tripboard.creator.name}</Text>
            <Text style={styles.creatorTitle}>{tripboard.creator.title}</Text>
          </View>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={1}>{tripboard.title}</Text>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Footer info */}
        <View style={styles.footer}>
          <View style={styles.budgetCol}>
            <Text style={styles.label}>EST. BUDGET</Text>
            <Text style={styles.budgetValue}>{tripboard.budget.split(' /')[0]}</Text>
          </View>
          <View style={styles.likes}>
            <Ionicons name="heart" size={16} color={colors.primary} />
            <Text style={styles.likesText}>{tripboard.likes}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.md,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    overflow: 'hidden',
    position: 'relative',
    ...spacing.shadows.sm,
  },
  coverImage: {
    width: '100%',
    height: 120,
    backgroundColor: '#cbd5e1',
  },
  durationBadge: {
    position: 'absolute',
    top: spacing.sm,
    left: spacing.sm,
    backgroundColor: 'rgba(13, 148, 136, 0.9)', // primary color translucent
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: spacing.borderRadius.xs,
  },
  durationText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
  },
  content: {
    padding: spacing.md,
  },
  creatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: '#e2e8f0',
  },
  creatorName: {
    fontSize: 11,
    fontWeight: '700',
    color: colors.text,
  },
  creatorTitle: {
    fontSize: 9,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: spacing.sm,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  budgetCol: {
    justifyContent: 'center',
  },
  label: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  budgetValue: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  likes: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  likesText: {
    fontSize: 11,
    fontWeight: '600',
    color: colors.textSecondary,
    marginLeft: 3,
  },
});
