import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function ActivityCard({ activity }) {
  return (
    <View style={styles.container}>
      {/* Left Column: Timeline Dot & Connector line */}
      <View style={styles.timelineCol}>
        <View style={styles.timeDot} />
        <View style={styles.timelineLine} />
      </View>

      {/* Right Column: Activity Card Content */}
      <View style={styles.card}>
        <View style={styles.header}>
          <Text style={styles.timeText}>{activity.time}</Text>
          <View style={styles.durationBadge}>
            <Text style={styles.durationText}>{activity.duration}</Text>
          </View>
        </View>

        <View style={styles.body}>
          <Text style={styles.emoji}>{activity.emoji}</Text>
          <View style={styles.textCol}>
            <Text style={styles.title}>{activity.title}</Text>
            <Text style={styles.description}>{activity.description}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingLeft: spacing.sm,
  },
  timelineCol: {
    alignItems: 'center',
    width: 24,
    position: 'relative',
  },
  timeDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.primary,
    borderWidth: 2,
    borderColor: '#ffffff',
    zIndex: 2,
    marginTop: spacing.md,
  },
  timelineLine: {
    position: 'absolute',
    top: spacing.md + 6,
    bottom: -spacing.md,
    width: 2,
    backgroundColor: colors.cardBorder,
    zIndex: 1,
  },
  card: {
    flex: 1,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginLeft: spacing.sm,
    marginBottom: spacing.md,
    ...spacing.shadows.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
  },
  durationBadge: {
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: spacing.borderRadius.xs,
  },
  durationText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '600',
  },
  body: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  emoji: {
    fontSize: 22,
    marginRight: spacing.sm,
    marginTop: 1,
  },
  textCol: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
    marginTop: 3,
  },
});
