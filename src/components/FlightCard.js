import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function FlightCard({ flight, onBook }) {
  return (
    <View style={styles.container}>
      {/* Top row: Airline & Badge */}
      <View style={styles.header}>
        <View style={styles.airlineCol}>
          <View style={styles.iconCircle}>
            <Ionicons name="airplane" size={16} color={colors.primary} />
          </View>
          <Text style={styles.airlineName}>{flight.airline}</Text>
        </View>
        <View style={[styles.stopsBadge, flight.stops === 'Direct' ? styles.directBg : styles.stopsBg]}>
          <Text style={[styles.stopsText, flight.stops === 'Direct' ? styles.directText : styles.stopsTextCol]}>
            {flight.stops}
          </Text>
        </View>
      </View>

      {/* Middle row: Schedule Times & Duration */}
      <View style={styles.scheduleRow}>
        <View style={styles.timeCol}>
          <Text style={styles.time}>{flight.departureTime}</Text>
          <Text style={styles.airportLabel}>DEL</Text>
        </View>

        <View style={styles.durationCol}>
          <Text style={styles.duration}>{flight.duration}</Text>
          <View style={styles.flightLineContainer}>
            <View style={styles.flightLineDot} />
            <View style={styles.flightLine} />
            <View style={styles.flightLineDot} />
          </View>
        </View>

        <View style={styles.timeCol}>
          <Text style={styles.time}>{flight.arrivalTime}</Text>
          <Text style={styles.airportLabel}>
            {flight.destinationId === 'japan' ? 'NRT' : 
             flight.destinationId === 'bali' ? 'DPS' : 
             flight.destinationId === 'paris' ? 'CDG' : 
             flight.destinationId === 'dubai' ? 'DXB' : 
             flight.destinationId === 'thailand' ? 'BKK' : 'SIN'}
          </Text>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom row: Price & Book button */}
      <View style={styles.footer}>
        <View>
          <Text style={styles.price}>{flight.price}</Text>
          <Text style={styles.priceLabel}>round trip / per person</Text>
        </View>

        <TouchableOpacity onPress={onBook} style={styles.bookBtn} activeOpacity={0.8}>
          <Text style={styles.bookText}>Book Flight</Text>
        </TouchableOpacity>
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
    padding: spacing.md,
    marginBottom: spacing.md,
    ...spacing.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  airlineCol: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f0fdfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  airlineName: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  stopsBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: spacing.borderRadius.xs,
  },
  stopsBg: {
    backgroundColor: '#fffbeb', // amber-50 light
  },
  stopsTextCol: {
    color: '#d97706', // amber-600
  },
  directBg: {
    backgroundColor: '#ecfdf5', // emerald-50 light
  },
  directText: {
    color: '#059669', // emerald-600
  },
  stopsText: {
    fontSize: 10,
    fontWeight: '700',
  },
  scheduleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.sm,
  },
  timeCol: {
    alignItems: 'center',
  },
  time: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  airportLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '700',
    marginTop: 2,
  },
  durationCol: {
    alignItems: 'center',
    flex: 1,
    paddingHorizontal: spacing.md,
  },
  duration: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '600',
    marginBottom: 4,
  },
  flightLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  flightLineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.primary,
  },
  flightLine: {
    flex: 1,
    height: 1,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: colors.primary,
    marginHorizontal: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.cardBorder,
    marginVertical: spacing.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.primary,
  },
  priceLabel: {
    fontSize: 9,
    color: colors.textMuted,
    fontWeight: '600',
  },
  bookBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: spacing.borderRadius.sm,
  },
  bookText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
  },
});
