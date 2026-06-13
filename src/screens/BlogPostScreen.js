import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import blogs from '../data/blogs';
import destinations from '../data/destinations';

const { width } = Dimensions.get('window');

export default function BlogPostScreen({ route, navigation }) {
  const { blogId } = route.params;

  // Find blog post
  const blog = blogs.find(b => b.id === blogId) || blogs[0];
  const destination = destinations.find(d => d.id === blog.destinationId);

  const handlePlanTrip = () => {
    if (destination) {
      navigation.navigate('Plan', {
        screen: 'PlanTripMain',
        params: { preselectedDestinationId: destination.id }
      });
    } else {
      navigation.navigate('Plan');
    }
  };

  // Helper to render formatted paragraph text (handles basic bold markdown like **text**)
  const renderParagraph = (text, index) => {
    if (text.startsWith('**') && text.includes('**\n')) {
      // It has a bold title followed by body text on a new line
      const parts = text.split('**\n');
      const headerText = parts[0].replace(/\*\*/g, '');
      const bodyText = parts[1];

      return (
        <View key={index} style={styles.block}>
          <Text style={styles.blockHeader}>{headerText}</Text>
          <Text style={styles.paragraph}>{bodyText}</Text>
        </View>
      );
    }

    if (text.startsWith('**')) {
      // It is a fully bold line
      const boldText = text.replace(/\*\*/g, '');
      return (
        <Text key={index} style={[styles.paragraph, styles.boldText]}>
          {boldText}
        </Text>
      );
    }

    return (
      <Text key={index} style={styles.paragraph}>
        {text}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      {/* Scrollable body */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Cover Hero Image */}
        <View style={styles.heroContainer}>
          <Image source={{ uri: blog.image }} style={styles.coverImage} />
          
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
          </LinearGradient>

          {/* Title Overlay */}
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.8)']}
            style={styles.titleOverlay}
          >
            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{blog.category.toUpperCase()}</Text>
            </View>
            <Text style={styles.title}>{blog.title}</Text>
            
            <View style={styles.metaRow}>
              <Text style={styles.metaText}>{blog.date}</Text>
              <Text style={styles.bullet}>•</Text>
              <Text style={styles.metaText}>{blog.readTime}</Text>
            </View>
          </LinearGradient>
        </View>

        {/* Content Area */}
        <View style={styles.contentSection}>
          {/* Loop and render paragraphs */}
          {blog.content.map((p, index) => renderParagraph(p, index))}
        </View>

      </ScrollView>

      {/* Sticky Bottom Planning CTA */}
      {destination && (
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
              <Text style={styles.planBtnText}>Plan a Trip to {destination.name}</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100, // Cushion for bottom CTA
  },
  heroContainer: {
    height: 280,
    backgroundColor: '#cbd5e1',
    position: 'relative',
  },
  coverImage: {
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
  titleOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '70%',
    padding: spacing.xl,
    justifyContent: 'flex-end',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: colors.primary,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: spacing.borderRadius.xs,
    marginBottom: spacing.sm,
  },
  categoryText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
    lineHeight: 28,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.sm,
  },
  metaText: {
    color: '#cbd5e1',
    fontSize: 12,
    fontWeight: '500',
  },
  bullet: {
    color: '#cbd5e1',
    marginHorizontal: 6,
  },
  contentSection: {
    padding: spacing.xl,
    backgroundColor: colors.background,
  },
  paragraph: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
    marginBottom: spacing.lg,
  },
  boldText: {
    fontWeight: '700',
    color: colors.text,
  },
  block: {
    marginBottom: spacing.lg,
  },
  blockHeader: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
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
