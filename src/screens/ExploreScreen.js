import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import SearchBar from '../components/SearchBar';
import DestinationCard from '../components/DestinationCard';
import destinations from '../data/destinations';

const { width } = Dimensions.get('window');
const categories = ['All', 'Beach', 'Mountain', 'City', 'Cultural', 'Adventure', 'Honeymoon'];

export default function ExploreScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const handleDestinationPress = (destId) => {
    navigation.navigate('DestinationDetail', { destinationId: destId });
  };

  // Filter logic
  const filteredDestinations = destinations.filter((dest) => {
    const matchesSearch = dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dest.country.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'All' || dest.categories.includes(activeCategory);

    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      {/* Search Header Container */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Explore World</Text>
        <Text style={styles.headerSubtitle}>Discover incredible places for your next trip</Text>
        <View style={styles.searchSpacing}>
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>
      </View>

      {/* Categories Horizontal Scroll */}
      <View style={styles.categoriesContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesScrollContent}
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <TouchableOpacity
                key={cat}
                style={[
                  styles.categoryChip,
                  isActive && styles.activeCategoryChip,
                ]}
                onPress={() => setActiveCategory(cat)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.categoryText,
                    isActive && styles.activeCategoryText,
                  ]}
                >
                  {cat}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Grid List of Destinations */}
      <FlatList
        data={filteredDestinations}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.gridRow}
        renderItem={({ item }) => (
          <DestinationCard
            destination={item}
            onPress={() => handleDestinationPress(item.id)}
            style={styles.gridCard}
          />
        )}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No destinations found matching your criteria.</Text>
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
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.headerPaddingTop,
    paddingBottom: spacing.md,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
  },
  headerSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
  },
  searchSpacing: {
    marginTop: spacing.md,
  },
  categoriesContainer: {
    backgroundColor: colors.background,
    paddingVertical: spacing.md,
  },
  categoriesScrollContent: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: spacing.borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginRight: spacing.sm,
  },
  activeCategoryChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeCategoryText: {
    color: '#ffffff',
  },
  gridRow: {
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  gridCard: {
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    height: 180,
  },
  listContent: {
    paddingBottom: spacing.xxl,
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
    textAlign: 'center',
    fontWeight: '500',
  },
});
