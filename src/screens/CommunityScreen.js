import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import tripboards from '../data/tripboards';
import TripBoardCard from '../components/TripBoardCard';

const subCategories = ['All', 'Popular', 'Influencer Picks', 'Recent'];

export default function CommunityScreen({ navigation }) {
  const [activeSubCat, setActiveSubCat] = useState('All');

  const handleTripBoardPress = (tbId) => {
    navigation.navigate('TripBoard', { tripboardId: tbId });
  };

  const handleNavigateToBlog = () => {
    navigation.navigate('Blog');
  };

  // Filter based on sub-category selected
  const filteredTrips = tripboards.filter((tb) => {
    if (activeSubCat === 'All') return true;
    if (activeSubCat === 'Popular') return tb.likes > 1000;
    if (activeSubCat === 'Influencer Picks') return tb.creator.title.includes('Expert') || tb.creator.title.includes('Local');
    if (activeSubCat === 'Recent') return tb.likes < 1000; // Mock distinction
    return true;
  });

  return (
    <View style={styles.container}>
      {/* Top Header Bar */}
      <View style={styles.header}>
        <View style={styles.titleCol}>
          <Text style={styles.headerTitle}>Community Hub</Text>
          <Text style={styles.headerSubtitle}>Get inspired by travel plans from other adventurers</Text>
        </View>
        <TouchableOpacity 
          style={styles.blogBtn} 
          onPress={handleNavigateToBlog}
          activeOpacity={0.7}
        >
          <Ionicons name="book-outline" size={20} color={colors.primary} />
          <Text style={styles.blogBtnText}>Guides</Text>
        </TouchableOpacity>
      </View>

      {/* Subcategory selectors */}
      <View style={styles.subCatContainer}>
        {subCategories.map((cat) => {
          const isActive = activeSubCat === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.subCatChip, isActive && styles.activeSubCatChip]}
              onPress={() => setActiveSubCat(cat)}
              activeOpacity={0.8}
            >
              <Text style={[styles.subCatText, isActive && styles.activeSubCatText]}>{cat}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Tripboards Feed */}
      <FlatList
        data={filteredTrips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TripBoardCard
            tripboard={item}
            onPress={() => handleTripBoardPress(item.id)}
            style={styles.feedCard}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No community itineraries found for this filter.</Text>
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
  titleCol: {
    flex: 1,
    paddingRight: spacing.sm,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  blogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdfa',
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: spacing.borderRadius.sm,
  },
  blogBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 4,
  },
  subCatContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.background,
  },
  subCatChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: spacing.borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
  },
  activeSubCatChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  subCatText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeSubCatText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  listContent: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
  },
  feedCard: {
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
