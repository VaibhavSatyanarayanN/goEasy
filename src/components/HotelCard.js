import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function HotelCard({ hotel, onCompare, onBook }) {
  // Translate amenities string list to nice tags
  const renderAmenityIcon = (name) => {
    switch (name) {
      case 'wifi': return <Ionicons name="wifi" size={14} color={colors.primary} />;
      case 'pool': return <Ionicons name="water" size={14} color={colors.primary} />;
      case 'spa': return <Ionicons name="leaf" size={14} color={colors.primary} />;
      case 'gym':
      case 'fitness-center': return <Ionicons name="barbell" size={14} color={colors.primary} />;
      case 'restaurant': return <Ionicons name="restaurant" size={14} color={colors.primary} />;
      case 'beachfront': return <Ionicons name="umbrella" size={14} color={colors.primary} />;
      default: return <Ionicons name="star" size={14} color={colors.primary} />;
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: hotel.image }} style={styles.image} />
      
      <View style={styles.content}>
        {/* Rating and Reviews */}
        <View style={styles.ratingRow}>
          <View style={styles.stars}>
            <Ionicons name="star" size={12} color="#f59e0b" />
            <Text style={styles.ratingText}>{hotel.rating}</Text>
          </View>
          <Text style={styles.reviewsText}>({hotel.reviews} reviews)</Text>
        </View>

        {/* Hotel Name */}
        <Text style={styles.name} numberOfLines={1}>{hotel.name}</Text>
        
        {/* Distance */}
        <Text style={styles.distanceText}>{hotel.distance}</Text>

        {/* Amenities Row */}
        <View style={styles.amenities}>
          {hotel.amenities.slice(0, 3).map((am, i) => (
            <View key={i} style={styles.amenityTag}>
              {renderAmenityIcon(am)}
              <Text style={styles.amenityText}>{am}</Text>
            </View>
          ))}
        </View>

        {/* Divider */}
        <View style={styles.divider} />

        {/* Price and Actions */}
        <View style={styles.footer}>
          <View>
            <Text style={styles.price}>{hotel.price}</Text>
            <Text style={styles.priceLabel}>/ night</Text>
          </View>
          
          <View style={styles.actions}>
            <TouchableOpacity 
              onPress={onCompare} 
              style={[styles.btn, styles.compareBtn]}
              activeOpacity={0.7}
            >
              <Text style={styles.compareBtnText}>Compare</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              onPress={onBook} 
              style={[styles.btn, styles.bookBtn]}
              activeOpacity={0.8}
            >
              <Text style={styles.bookBtnText}>Book</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
    marginBottom: spacing.md,
    flexDirection: 'row',
    height: 165,
    ...spacing.shadows.sm,
  },
  image: {
    width: 110,
    height: '100%',
    backgroundColor: '#cbd5e1',
  },
  content: {
    flex: 1,
    padding: spacing.sm + 2,
    justifyContent: 'space-between',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stars: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fffdf5',
    paddingHorizontal: 4,
    paddingVertical: 1,
    borderRadius: spacing.borderRadius.xs,
    borderWidth: 0.5,
    borderColor: '#fef3c7',
  },
  ratingText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#b45309',
    marginLeft: 2,
  },
  reviewsText: {
    fontSize: 10,
    color: colors.textMuted,
    marginLeft: 6,
    fontWeight: '500',
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  distanceText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  amenities: {
    flexDirection: 'row',
    marginTop: 2,
  },
  amenityTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdfa',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: spacing.borderRadius.xs,
    marginRight: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(13,148,136,0.1)',
  },
  amenityText: {
    fontSize: 9,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 3,
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.primary,
  },
  priceLabel: {
    fontSize: 8,
    color: colors.textMuted,
    fontWeight: '700',
    marginTop: -2,
  },
  actions: {
    flexDirection: 'row',
  },
  btn: {
    height: 32,
    paddingHorizontal: 12,
    borderRadius: spacing.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  compareBtn: {
    borderWidth: 1,
    borderColor: colors.primary,
    marginRight: 6,
  },
  compareBtnText: {
    fontSize: 11,
    color: colors.primary,
    fontWeight: '700',
  },
  bookBtn: {
    backgroundColor: colors.primary,
  },
  bookBtnText: {
    fontSize: 11,
    color: '#ffffff',
    fontWeight: '700',
  },
});
