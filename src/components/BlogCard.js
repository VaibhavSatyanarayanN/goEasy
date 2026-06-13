import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function BlogCard({ blog, onPress, style }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.container, style]}
    >
      {/* Blog Image */}
      <Image source={{ uri: blog.image }} style={styles.image} />

      <View style={styles.content}>
        {/* Category Badge */}
        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{blog.category.toUpperCase()}</Text>
        </View>

        {/* Title */}
        <Text style={styles.title} numberOfLines={2}>{blog.title}</Text>

        {/* Excerpt */}
        <Text style={styles.excerpt} numberOfLines={2}>{blog.excerpt}</Text>

        {/* Footer info */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>{blog.date}</Text>
          <Text style={styles.bullet}>•</Text>
          <Text style={styles.footerText}>{blog.readTime}</Text>
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
    flexDirection: 'row',
    height: 130,
    ...spacing.shadows.sm,
  },
  image: {
    width: 120,
    height: '100%',
    backgroundColor: '#cbd5e1',
  },
  content: {
    flex: 1,
    padding: spacing.md,
    justifyContent: 'space-between',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#f0fdfa', // primary light tint
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: spacing.borderRadius.xs,
    borderWidth: 0.5,
    borderColor: 'rgba(13,148,136,0.15)',
  },
  categoryText: {
    fontSize: 8,
    fontWeight: '700',
    color: colors.primary,
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    lineHeight: 18,
    marginVertical: 2,
  },
  excerpt: {
    fontSize: 11,
    color: colors.textSecondary,
    lineHeight: 15,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  footerText: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '500',
  },
  bullet: {
    fontSize: 10,
    color: colors.textMuted,
    marginHorizontal: 4,
  },
});
