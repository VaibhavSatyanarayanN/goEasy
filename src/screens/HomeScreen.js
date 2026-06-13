import React, { useContext } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Dimensions, FlatList, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { AuthContext } from '../context/AuthContext';
import DestinationCard from '../components/DestinationCard';
import TripBoardCard from '../components/TripBoardCard';
import BlogCard from '../components/BlogCard';
import destinations from '../data/destinations';
import tripboards from '../data/tripboards';
import blogs from '../data/blogs';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const { user } = useContext(AuthContext);

  const handlePlanTripPress = () => {
    // Navigate to the Plan tab
    navigation.navigate('Plan');
  };

  const handleDestinationPress = (destId) => {
    navigation.navigate('DestinationDetail', { destinationId: destId });
  };

  const handleTripBoardPress = (tbId) => {
    navigation.navigate('TripBoard', { tripboardId: tbId });
  };

  const handleBlogPostPress = (blogId) => {
    navigation.navigate('BlogPost', { blogId: blogId });
  };

  // Get first letter of user's name for avatar
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <View style={styles.container}>
      {/* Branding Header with App Logo and Text */}
      <View style={styles.header}>
        <View style={styles.logoContainer}>
          <Ionicons name="compass" size={26} color={colors.primary} style={{ marginRight: 6 }} />
          <Text style={styles.logoText}>
            go<Text style={styles.logoHighlight}>Easy</Text>
          </Text>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.notificationBtn} activeOpacity={0.7}>
            <Ionicons name="notifications-outline" size={24} color={colors.text} />
            <View style={styles.badge} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.avatarMini} 
            activeOpacity={0.7}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.avatarMiniText}>{userInitial}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Scroll Content */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Welcome Greeting Section */}
        <View style={styles.greetingSection}>
          <Text style={styles.welcomeTitle}>Hello, {user?.name.split(' ')[0]} 👋</Text>
          <Text style={styles.welcomeSubtitle}>Where are we heading next?</Text>
        </View>
        
        {/* Hero Banner Card */}
        <TouchableOpacity 
          style={styles.heroCard} 
          activeOpacity={0.95}
          onPress={handlePlanTripPress}
        >
          <Image 
            source={{ uri: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80' }} 
            style={styles.heroImage} 
          />
          <LinearGradient
            colors={['rgba(13,148,136,0.3)', 'rgba(0,0,0,0.8)']}
            style={styles.heroGradient}
          >
            <Text style={styles.heroBadge}>AI TRAVEL PLANNER</Text>
            <Text style={styles.heroTitle}>Create your perfect itinerary in minutes</Text>
            <Text style={styles.heroSubtitle}>Tailored by AI to fit your budget and vibe</Text>
            <View style={styles.heroBtn}>
              <Text style={styles.heroBtnText}>Start Planning</Text>
              <Ionicons name="arrow-forward" size={16} color="#ffffff" style={{ marginLeft: 6 }} />
            </View>
          </LinearGradient>
        </TouchableOpacity>

        {/* Section: Popular Destinations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular Destinations</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Explore')} activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={destinations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DestinationCard
                destination={item}
                onPress={() => handleDestinationPress(item.id)}
                style={styles.destCardSpacing}
              />
            )}
            contentContainerStyle={styles.horizontalScrollPadding}
          />
        </View>

        {/* Section: AI Tripboards */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Trending TripBoards</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Community')} activeOpacity={0.7}>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tripboardGrid}>
            {tripboards.map((item) => (
              <View key={item.id} style={styles.tripboardGridItem}>
                <TripBoardCard
                  tripboard={item}
                  onPress={() => handleTripBoardPress(item.id)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Section: How It Works */}
        <View style={[styles.section, styles.howItWorksBg]}>
          <Text style={styles.sectionTitle}>How goEasy Works</Text>
          <Text style={styles.howItWorksSubtitle}>Get a personalized itinerary in three simple steps.</Text>
          
          <View style={styles.stepsContainer}>
            <View style={styles.stepItem}>
              <View style={styles.stepIconCircle}>
                <Ionicons name="navigate-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.stepTitle}>1. Choose Vibe</Text>
              <Text style={styles.stepDesc}>Enter destination, budget, dates & travel style.</Text>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.stepItem}>
              <View style={styles.stepIconCircle}>
                <Ionicons name="sparkles-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.stepTitle}>2. AI Generates</Text>
              <Text style={styles.stepDesc}>Get a day-by-day customized plan instantly.</Text>
            </View>

            <View style={styles.stepDivider} />

            <View style={styles.stepItem}>
              <View style={styles.stepIconCircle}>
                <Ionicons name="options-outline" size={24} color={colors.primary} />
              </View>
              <Text style={styles.stepTitle}>3. Customize</Text>
              <Text style={styles.stepDesc}>Swap hotels, flights & ask AI chat for refinements.</Text>
            </View>
          </View>
        </View>

        {/* Section: Travel Inspiration */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Travel Inspiration</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Community', { screen: 'Blog' })} activeOpacity={0.7}>
              <Text style={styles.seeAllText}>Read more</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.blogList}>
            {blogs.map((item) => (
              <BlogCard
                key={item.id}
                blog={item}
                onPress={() => handleBlogPostPress(item.id)}
                style={styles.blogCardSpacing}
              />
            ))}
          </View>
        </View>

      </ScrollView>
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
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  logoHighlight: {
    color: colors.primary,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarMini: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.md,
  },
  avatarMiniText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  greetingSection: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.xs,
  },
  welcomeTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -0.5,
  },
  welcomeSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 4,
  },
  notificationBtn: {
    padding: spacing.xs,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 6,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.danger,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  heroCard: {
    margin: spacing.xl,
    height: 200,
    borderRadius: spacing.borderRadius.lg,
    overflow: 'hidden',
    backgroundColor: '#cbd5e1',
    ...spacing.shadows.md,
  },
  heroImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  heroGradient: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: 'flex-end',
  },
  heroBadge: {
    fontSize: 10,
    fontWeight: '800',
    color: colors.accent,
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 28,
  },
  heroSubtitle: {
    fontSize: 12,
    color: '#e2e8f0',
    marginTop: 4,
    marginBottom: spacing.md,
    fontWeight: '500',
  },
  heroBtn: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: spacing.borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },
  heroBtnText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
  },
  section: {
    marginTop: spacing.xxl,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  seeAllText: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
  destCardSpacing: {
    marginRight: spacing.md,
  },
  horizontalScrollPadding: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.sm,
  },
  tripboardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: spacing.xl,
    justifyContent: 'space-between',
  },
  tripboardGridItem: {
    width: (width - spacing.xl * 2 - spacing.md) / 2,
    marginBottom: spacing.md,
  },
  howItWorksBg: {
    backgroundColor: colors.surface,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.xl,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.cardBorder,
  },
  howItWorksSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    marginBottom: spacing.xl,
  },
  stepsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  stepItem: {
    flex: 1,
    alignItems: 'center',
    textAlign: 'center',
  },
  stepIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f0fdfa', // primary light tint
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
    borderWidth: 1,
    borderColor: 'rgba(13,148,136,0.1)',
  },
  stepTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 9,
    color: colors.textSecondary,
    textAlign: 'center',
    paddingHorizontal: 4,
    lineHeight: 12,
  },
  stepDivider: {
    width: 15,
    height: 1,
    backgroundColor: colors.cardBorder,
    marginBottom: 30,
  },
  blogList: {
    paddingHorizontal: spacing.xl,
  },
  blogCardSpacing: {
    marginBottom: spacing.md,
  },
});
