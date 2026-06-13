import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Dimensions, Alert, Modal, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import tripboards from '../data/tripboards';
import hotelsData from '../data/hotels';
import flightsData from '../data/flights';
import destinations from '../data/destinations';
import ActivityCard from '../components/ActivityCard';
import HotelCard from '../components/HotelCard';
import FlightCard from '../components/FlightCard';

const { width } = Dimensions.get('window');

export default function TripBoardScreen({ route, navigation }) {
  const { tripboardId } = route.params;

  // Find tripboard details
  const tripboard = tripboards.find(tb => tb.id === tripboardId) || tripboards[0];
  const destination = destinations.find(d => d.id === tripboard.destinationId) || destinations[0];

  // Tab State: 'itinerary' | 'hotels' | 'flights' | 'budget'
  const [activeTab, setActiveTab] = useState('itinerary');
  const [selectedDay, setSelectedDay] = useState(1);
  const [splitCount, setSplitCount] = useState(1); // Budget splitting count
  const [compareModalVisible, setCompareModalVisible] = useState(false);

  // Filter hotels & flights matching this destination
  const matchedHotels = hotelsData.filter(h => h.destinationId === tripboard.destinationId);
  const matchedFlights = flightsData.filter(f => f.destinationId === tripboard.destinationId);

  const handleShare = () => {
    Alert.alert(
      'Invite Collaborators',
      'TripBoard link copied to clipboard! Share it with your friends to edit this itinerary together.',
      [{ text: 'OK' }]
    );
  };

  const handleEdit = () => {
    Alert.alert('Customize Itinerary', 'Drag-and-drop activity editing and slot modifications will be saved to your local profile.', [{ text: 'OK' }]);
  };

  const handleAskAI = () => {
    navigation.navigate('AIChat', { destinationName: destination.name });
  };

  const handleBook = (itemName) => {
    Alert.alert('Booking Redirect', `Redirecting to partner portal to book: ${itemName}. Booking code: GOEASY-${Math.floor(1000 + Math.random() * 9000)}`, [{ text: 'OK' }]);
  };

  // Budget calculations
  const totalBudget = tripboard.budgetVal + (matchedHotels[0]?.priceVal || 0) * tripboard.durationDays + (matchedFlights[0]?.priceVal || 0);

  return (
    <View style={styles.container}>
      {/* Scrollable Body */}
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Destination Header Banner */}
        <View style={styles.heroBanner}>
          <Image source={{ uri: destination.bannerImage }} style={styles.heroImage} />
          
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
            
            <Text style={styles.headerTitleText}>TripBoard</Text>
            
            <TouchableOpacity style={styles.shareBtn} onPress={handleShare} activeOpacity={0.7}>
              <Ionicons name="share-social-outline" size={22} color="#ffffff" />
            </TouchableOpacity>
          </LinearGradient>

          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.85)']}
            style={styles.heroDetailsOverlay}
          >
            <Text style={styles.heroTitle}>{tripboard.title}</Text>
            <View style={styles.tagRow}>
              <View style={styles.tag}>
                <Ionicons name="calendar-outline" size={12} color={colors.primaryLight} />
                <Text style={styles.tagText}>{tripboard.duration}</Text>
              </View>
              <View style={[styles.tag, { marginLeft: 8 }]}>
                <Ionicons name="wallet-outline" size={12} color={colors.primaryLight} />
                <Text style={styles.tagText}>{tripboard.budget.split(' /')[0]}</Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* Action Row */}
        <View style={styles.actionsBar}>
          <TouchableOpacity onPress={handleEdit} style={styles.actionItem} activeOpacity={0.7}>
            <Ionicons name="create-outline" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Edit Itinerary</Text>
          </TouchableOpacity>
          <View style={styles.actionDivider} />
          <TouchableOpacity onPress={handleAskAI} style={styles.actionItem} activeOpacity={0.7}>
            <Ionicons name="sparkles" size={20} color={colors.primary} />
            <Text style={styles.actionText}>Ask AI Assistant</Text>
          </TouchableOpacity>
        </View>

        {/* Segmented Tab Bar */}
        <View style={styles.tabBar}>
          {['itinerary', 'hotels', 'flights', 'budget'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tabItem, activeTab === tab && styles.activeTabItem]}
              onPress={() => setActiveTab(tab)}
              activeOpacity={0.8}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Render Tab Contents */}
        <View style={styles.tabContentContainer}>
          
          {/* ITINERARY TAB */}
          {activeTab === 'itinerary' && (
            <View>
              {/* Day Selection Horizontal Bar */}
              <ScrollView 
                horizontal 
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.daysContainer}
              >
                {tripboard.itinerary.map((dayPlan) => {
                  const isSelected = selectedDay === dayPlan.day;
                  return (
                    <TouchableOpacity
                      key={dayPlan.day}
                      style={[styles.dayChip, isSelected && styles.activeDayChip]}
                      onPress={() => setSelectedDay(dayPlan.day)}
                      activeOpacity={0.8}
                    >
                      <Text style={[styles.dayChipText, isSelected && styles.activeDayChipText]}>
                        Day {dayPlan.day}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </ScrollView>

              {/* Day Itinerary Activities */}
              <View style={styles.dayDetailsHeader}>
                <Text style={styles.dayDetailsTitle}>
                  {tripboard.itinerary[selectedDay - 1]?.title}
                </Text>
              </View>

              <View style={styles.activitiesList}>
                {tripboard.itinerary[selectedDay - 1]?.activities.map((act, index) => (
                  <ActivityCard key={index} activity={act} />
                ))}
              </View>
            </View>
          )}

          {/* HOTELS TAB */}
          {activeTab === 'hotels' && (
            <View style={styles.listPadding}>
              <Text style={styles.tabSectionHeader}>Smart Hotel Recommendations</Text>
              <Text style={styles.tabSectionSubtitle}>Curated near your planned activities to reduce travel times.</Text>
              
              {matchedHotels.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  onCompare={() => setCompareModalVisible(true)}
                  onBook={() => handleBook(hotel.name)}
                />
              ))}
            </View>
          )}

          {/* FLIGHTS TAB */}
          {activeTab === 'flights' && (
            <View style={styles.listPadding}>
              <Text style={styles.tabSectionHeader}>Recommended Flight Route</Text>
              <Text style={styles.tabSectionSubtitle}>Optimized outbound and return routes from New Delhi.</Text>
              
              {matchedFlights.map((flight) => (
                <FlightCard
                  key={flight.id}
                  flight={flight}
                  onBook={() => handleBook(`${flight.airline} Flight`)}
                />
              ))}
            </View>
          )}

          {/* BUDGET TAB */}
          {activeTab === 'budget' && (
            <View style={styles.listPadding}>
              <Text style={styles.tabSectionHeader}>Estimated Cost Split</Text>
              <Text style={styles.tabSectionSubtitle}>Calculated per person based on flights, hotels and activities.</Text>

              {/* Budget Split Progress Bars */}
              <View style={styles.budgetSplitCard}>
                <Text style={styles.totalBudgetText}>Total Estimate: ₹{totalBudget.toLocaleString('en-IN')}</Text>
                
                {/* Flights Bar */}
                <View style={styles.budgetRow}>
                  <View style={styles.budgetLabelRow}>
                    <Text style={styles.budgetRowLabel}>🛫 Flights (Roundtrip)</Text>
                    <Text style={styles.budgetRowVal}>₹{(matchedFlights[0]?.priceVal || 24500).toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.budgetBarBg}>
                    <View style={[styles.budgetBarFill, { width: '40%', backgroundColor: colors.primary }]} />
                  </View>
                </View>

                {/* Stays Bar */}
                <View style={styles.budgetRow}>
                  <View style={styles.budgetLabelRow}>
                    <Text style={styles.budgetRowLabel}>🏨 Hotel stays ({tripboard.durationDays} nights)</Text>
                    <Text style={styles.budgetRowVal}>₹{((matchedHotels[0]?.priceVal || 12000) * tripboard.durationDays).toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.budgetBarBg}>
                    <View style={[styles.budgetBarFill, { width: '45%', backgroundColor: colors.accent }]} />
                  </View>
                </View>

                {/* Activities & Food Bar */}
                <View style={styles.budgetRow}>
                  <View style={styles.budgetLabelRow}>
                    <Text style={styles.budgetRowLabel}>🎟️ Activities & Food (Est.)</Text>
                    <Text style={styles.budgetRowVal}>₹{tripboard.budgetVal.toLocaleString('en-IN')}</Text>
                  </View>
                  <View style={styles.budgetBarBg}>
                    <View style={[styles.budgetBarFill, { width: '15%', backgroundColor: '#f59e0b' }]} />
                  </View>
                </View>
              </View>

              {/* Trip Splitter Tool */}
              <View style={styles.tripSplitterCard}>
                <Text style={styles.splitterTitle}>Group Bill Splitter</Text>
                <Text style={styles.splitterDesc}>Split the total trip cost among your friends.</Text>

                <View style={styles.splitterControls}>
                  <TouchableOpacity onPress={() => setSplitCount(c => Math.max(1, c - 1))} style={styles.stepperBtn}>
                    <Ionicons name="remove" size={20} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.splitterVal}>{splitCount} {splitCount === 1 ? 'Person' : 'People'}</Text>
                  <TouchableOpacity onPress={() => setSplitCount(c => c + 1)} style={styles.stepperBtn}>
                    <Ionicons name="add" size={20} color={colors.primary} />
                  </TouchableOpacity>
                </View>

                <View style={styles.splitCostContainer}>
                  <Text style={styles.splitLabel}>SHARE PER PERSON</Text>
                  <Text style={styles.splitValue}>₹{Math.round(totalBudget / splitCount).toLocaleString('en-IN')}</Text>
                </View>
              </View>
            </View>
          )}

        </View>

      </ScrollView>

      {/* Side-by-side Hotel Comparison Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={compareModalVisible}
        onRequestClose={() => setCompareModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Hotel Comparison</Text>
              <TouchableOpacity onPress={() => setCompareModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            {matchedHotels.length >= 2 ? (
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.compareScroll}>
                {/* Hotel 1 */}
                <View style={styles.compareCol}>
                  <Image source={{ uri: matchedHotels[0].image }} style={styles.compareImg} />
                  <Text style={styles.compareHotelName}>{matchedHotels[0].name}</Text>
                  
                  <View style={styles.compareRow}>
                    <Text style={styles.compareLabel}>PRICE</Text>
                    <Text style={styles.compareVal}>{matchedHotels[0].price} / night</Text>
                  </View>

                  <View style={styles.compareRow}>
                    <Text style={styles.compareLabel}>RATING</Text>
                    <Text style={styles.compareVal}>⭐ {matchedHotels[0].rating} ({matchedHotels[0].reviews})</Text>
                  </View>

                  <View style={styles.compareRow}>
                    <Text style={styles.compareLabel}>DISTANCE</Text>
                    <Text style={styles.compareVal}>{matchedHotels[0].distance}</Text>
                  </View>

                  <View style={styles.compareRow}>
                    <Text style={styles.compareLabel}>AMENITIES</Text>
                    <Text style={styles.compareVal}>{matchedHotels[0].amenities.join(', ')}</Text>
                  </View>
                </View>

                {/* Divider Line */}
                <View style={styles.compareDivider} />

                {/* Hotel 2 */}
                <View style={styles.compareCol}>
                  <Image source={{ uri: matchedHotels[1].image }} style={styles.compareImg} />
                  <Text style={styles.compareHotelName}>{matchedHotels[1].name}</Text>

                  <View style={styles.compareRow}>
                    <Text style={styles.compareLabel}>PRICE</Text>
                    <Text style={styles.compareVal}>{matchedHotels[1].price} / night</Text>
                  </View>

                  <View style={styles.compareRow}>
                    <Text style={styles.compareLabel}>RATING</Text>
                    <Text style={styles.compareVal}>⭐ {matchedHotels[1].rating} ({matchedHotels[1].reviews})</Text>
                  </View>

                  <View style={styles.compareRow}>
                    <Text style={styles.compareLabel}>DISTANCE</Text>
                    <Text style={styles.compareVal}>{matchedHotels[1].distance}</Text>
                  </View>

                  <View style={styles.compareRow}>
                    <Text style={styles.compareLabel}>AMENITIES</Text>
                    <Text style={styles.compareVal}>{matchedHotels[1].amenities.join(', ')}</Text>
                  </View>
                </View>
              </ScrollView>
            ) : (
              <View style={styles.emptyCompare}>
                <Text style={styles.emptyCompareText}>Not enough hotel recommendations to compare.</Text>
              </View>
            )}
          </View>
        </View>
      </Modal>

      {/* Floating Action Button for AI Chat */}
      <TouchableOpacity 
        style={styles.chatFab}
        onPress={handleAskAI}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={colors.gradient}
          style={styles.fabGradient}
        >
          <Ionicons name="sparkles" size={24} color="#ffffff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 100, // Cushion for Floating FAB
  },
  heroBanner: {
    height: 240,
    backgroundColor: '#cbd5e1',
    position: 'relative',
  },
  heroImage: {
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
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '800',
  },
  shareBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroDetailsOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '60%',
    padding: spacing.xl,
    justifyContent: 'flex-end',
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#ffffff',
  },
  tagRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: spacing.borderRadius.xs,
  },
  tagText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: '700',
    marginLeft: 4,
  },
  actionsBar: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    paddingVertical: spacing.md,
  },
  actionItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionDivider: {
    width: 1,
    backgroundColor: colors.cardBorder,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    marginLeft: 6,
  },
  tabBar: {
    flexDirection: 'row',
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  tabItem: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTabItem: {
    borderBottomColor: colors.primary,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: '700',
  },
  tabContentContainer: {
    paddingVertical: spacing.lg,
  },
  daysContainer: {
    paddingLeft: spacing.xl,
    paddingRight: spacing.sm,
    paddingBottom: spacing.sm,
  },
  dayChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: spacing.borderRadius.full,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginRight: spacing.sm,
  },
  activeDayChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeDayChipText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  dayDetailsHeader: {
    paddingHorizontal: spacing.xl,
    marginVertical: spacing.md,
  },
  dayDetailsTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
  },
  activitiesList: {
    paddingHorizontal: spacing.md,
  },
  listPadding: {
    paddingHorizontal: spacing.xl,
  },
  tabSectionHeader: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  tabSectionSubtitle: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
    marginBottom: spacing.lg,
  },
  budgetSplitCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md + 4,
    marginBottom: spacing.xl,
    ...spacing.shadows.sm,
  },
  totalBudgetText: {
    fontSize: 16,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  budgetRow: {
    marginBottom: spacing.md,
  },
  budgetLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  budgetRowLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  budgetRowVal: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.text,
  },
  budgetBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: colors.surfaceLight,
    borderRadius: 3,
  },
  budgetBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  tripSplitterCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md + 4,
    alignItems: 'center',
    ...spacing.shadows.sm,
  },
  splitterTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  splitterDesc: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 2,
    marginBottom: spacing.md,
  },
  splitterControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  splitterVal: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: spacing.lg,
  },
  stepperBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdfa',
  },
  splitCostContainer: {
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: colors.cardBorder,
    width: '100%',
    paddingTop: spacing.md,
  },
  splitLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  splitValue: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.primary,
    marginTop: 2,
  },
  chatFab: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    ...spacing.shadows.lg,
  },
  fabGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: spacing.borderRadius.xl,
    borderTopRightRadius: spacing.borderRadius.xl,
    maxHeight: '80%',
    paddingBottom: 34,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  compareScroll: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  compareCol: {
    width: width * 0.65,
    paddingHorizontal: spacing.sm,
  },
  compareImg: {
    width: '100%',
    height: 120,
    borderRadius: spacing.borderRadius.sm,
    marginBottom: spacing.md,
  },
  compareHotelName: {
    fontSize: 15,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.md,
  },
  compareRow: {
    marginBottom: spacing.md,
  },
  compareLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  compareVal: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textSecondary,
    marginTop: 2,
  },
  compareDivider: {
    width: 1,
    backgroundColor: colors.cardBorder,
    marginHorizontal: spacing.sm,
  },
  emptyCompare: {
    padding: spacing.xxl,
    alignItems: 'center',
  },
  emptyCompareText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '500',
  },
});
