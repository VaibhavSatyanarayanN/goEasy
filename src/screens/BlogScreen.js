import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import blogs from '../data/blogs';
import BlogCard from '../components/BlogCard';

const categories = ['All', 'Guides', 'Tips', 'Budget Hacks', 'Itineraries'];

export default function BlogScreen({ navigation }) {
  const [activeCat, setActiveCat] = useState('All');

  const handleBlogPostPress = (blogId) => {
    navigation.navigate('BlogPost', { blogId: blogId });
  };

  // Filter based on active category
  const filteredBlogs = blogs.filter((blog) => {
    if (activeCat === 'All') return true;
    return blog.category === activeCat;
  });

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backBtn}
          onPress={() => navigation.goBack()}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Travel Guides</Text>
        <View style={styles.backBtnPlaceholder} />
      </View>

      {/* Category Chips Scroll */}
      <View style={styles.chipsContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsScroll}>
          {categories.map((cat) => {
            const isActive = activeCat === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[styles.chip, isActive && styles.activeChip]}
                onPress={() => setActiveCat(cat)}
                activeOpacity={0.8}
              >
                <Text style={[styles.chipText, isActive && styles.activeChipText]}>{cat}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Blog list */}
      <FlatList
        data={filteredBlogs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <BlogCard
            blog={item}
            onPress={() => handleBlogPostPress(item.id)}
            style={styles.blogCard}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No articles found in this category.</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.headerPaddingTop,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  backBtn: {
    padding: spacing.xs,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  backBtnPlaceholder: {
    width: 32,
  },
  chipsContainer: {
    paddingVertical: spacing.md,
    backgroundColor: colors.background,
  },
  chipsScroll: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.sm,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: spacing.borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginRight: spacing.sm,
  },
  activeChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeChipText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  blogCard: {
    marginBottom: spacing.md,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    marginTop: spacing.xxl,
  },
  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
  },
});
