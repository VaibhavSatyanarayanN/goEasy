import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import destinations from '../data/destinations';

const { width } = Dimensions.get('window');

export default function DestinationDetailScreen({ route, navigation }) {
  const { destinationId } = route.params;
  
  // Find destination matching the ID
  const destination = destinations.find(d => d.id === destinationId) || destinations[0];

  const handlePlanTrip = () => {
    // Navigate to Plan tab, passing pre-selected destination
    navigation.navigate('Plan', {
      screen: 'PlanTripMain',
      params: { preselectedDestinationId: destination.id }
    });
  };

  // Mock gallery photos by modifying search params or using a collection
  const gallery = [
    destination.bannerImage,
    'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=500&q=80'
  ];

  return (
    <View style={styles.container}>
      {/* Parallax scroll content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Banner Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: destination.bannerImage }} style={styles.bannerImage} />
          
          {/* Header Actions Overlay */}
          <LinearGradient
            colors={['rgba(0,0,0,0.5)', 'transparent']}
            style={styles.headerOverlay}
          >
            <TouchableOpacity 
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
              activeOpacity={0.7}
            >
              <Ionicons name="arrow-back" size={24} color="#ffffff" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.heartBtn} activeOpacity={0.7}>
              <Ionicons name="heart-outline" size={24} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>
          
          {/* Title Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.75)']}
            style={styles.titleOverlay}
          >
            <Text style={styles.name}>{destination.name}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location" size={14} color={colors.accent} />
              <Text style={styles.locationText}>{destination.country}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Content Section */}
        <View style={styles.contentSection}>
          
          {/* Quick Stats Grid */}
          <View style={styles.statsContainer}>
            <View style={styles.statBox}>
              <Ionicons name="star" size={18} color="#f59e0b" />
              <Text style={styles.statVal}>{destination.rating}</Text>
              <Text style={styles.statLabel}>Rating</Text>
            </View>
            <View style={[styles.statBox, styles.statDivider]}>
              <Ionicons name="trending-up" size={18} color={colors.primary} />
              <Text style={styles.statVal}>{destination.tripCount}+</Text>
              <Text style={styles.statLabel}>Trips Planned</Text>
            </View>
            <View style={styles.statBox}>
              <Ionicons name="wallet-outline" size={18} color={colors.accent} />
              <Text style={styles.statVal}>{destination.priceFrom}</Text>
              <Text style={styles.statLabel}>Starting From</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.detailsBlock}>
            <Text style={styles.blockTitle}>About the Destination</Text>
            <Text style={styles.description}>{destination.description}</Text>
          </View>

          {/* Travel Information */}
          <View style={styles.detailsBlock}>
            <Text style={styles.blockTitle}>Travel Information</Text>
            
            <View style={styles.infoRow}>
              <View style={styles.infoIconBg}>
                <Ionicons name="calendar-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Best Time to Visit</Text>
                <Text style={styles.infoVal}>{destination.bestTime}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIconBg}>
                <Ionicons name="cash-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Local Currency</Text>
                <Text style={styles.infoVal}>{destination.currency}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIconBg}>
                <Ionicons name="language-outline" size={18} color={colors.primary} />
              </View>
              <View style={styles.infoTextCol}>
                <Text style={styles.infoLabel}>Official Language</Text>
                <Text style={styles.infoVal}>{destination.language}</Text>
              </View>
            </View>
          </View>

          {/* Gallery */}
          <View style={styles.detailsBlock}>
            <Text style={styles.blockTitle}>Photo Gallery</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.galleryContainer}
            >
              {gallery.map((imgUrl, index) => (
                <Image 
                  key={index}
                  source={{ uri: imgUrl }}
                  style={styles.galleryImage}
                />
              ))}
            </ScrollView>
          </View>

        </View>
      </ScrollView>

      {/* Sticky Bottom Planning Button */}
      <View style={styles.stickyBottom}>
        <TouchableOpacity
          style={styles.planBtn}
          onPress={handlePlanTrip}
          activeOpacity={0.8}
        >
          <LinearGradient
            colors={colors.gradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.planBtnGradient}
          >
            <Ionicons name="sparkles" size={18} color="#ffffff" style={{ marginRight: 8 }} />
            <Text style={styles.planBtnText}>Plan My Trip with AI</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100, // Make room for sticky bottom CTA
  },
  imageContainer: {
    height: 320,
    position: 'relative',
    backgroundColor: '#cbd5e1',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 90,
    paddingTop: spacing.headerPaddingTopDetail,
    paddingHorizontal: spacing.xl,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    padding: spacing.xl,
    justifyContent: 'flex-end',
  },
  name: {
    fontSize: 28,
    fontWeight: '800',
    color: '#ffffff',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
  },
  locationText: {
    color: '#e2e8f0',
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  contentSection: {
    backgroundColor: colors.background,
    borderTopLeftRadius: spacing.borderRadius.xl,
    borderTopRightRadius: spacing.borderRadius.xl,
    marginTop: -spacing.lg,
    paddingTop: spacing.xl,
    paddingHorizontal: spacing.xl,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    paddingVertical: spacing.md,
    marginBottom: spacing.xxl,
    ...spacing.shadows.sm,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statDivider: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: colors.cardBorder,
  },
  statVal: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginTop: 4,
  },
  statLabel: {
    fontSize: 10,
    color: colors.textMuted,
    fontWeight: '600',
    marginTop: 2,
  },
  detailsBlock: {
    marginBottom: spacing.xxl,
  },
  blockTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  description: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  infoIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#f0fdfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  infoTextCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: colors.textMuted,
    fontWeight: '700',
  },
  infoVal: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    marginTop: 1,
  },
  galleryContainer: {
    paddingRight: spacing.xl,
  },
  galleryImage: {
    width: 140,
    height: 100,
    borderRadius: spacing.borderRadius.sm,
    marginRight: spacing.md,
    backgroundColor: '#cbd5e1',
  },
  stickyBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: Platform.OS === 'ios' ? 34 : 16,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
  },
  planBtn: {
    width: '100%',
    height: 50,
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
    ...spacing.shadows.md,
  },
  planBtnGradient: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planBtnText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});
