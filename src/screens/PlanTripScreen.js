import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, TextInput, Dimensions, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import destinations from '../data/destinations';
import GradientButton from '../components/GradientButton';

const { width } = Dimensions.get('window');

const occasions = [
  { id: 'vacation', name: 'Vacation', emoji: '🏖️' },
  { id: 'honeymoon', name: 'Honeymoon', emoji: '💍' },
  { id: 'birthday', name: 'Birthday', emoji: '🎂' },
  { id: 'anniversary', name: 'Anniversary', emoji: '💑' },
  { id: 'bachelorette', name: 'Bachelorette', emoji: '🎉' },
  { id: 'solo', name: 'Solo Trip', emoji: '🧳' },
  { id: 'family', name: 'Family Trip', emoji: '👨‍👩‍👧' },
  { id: 'friends', name: 'Friends Trip', emoji: '👫' },
];

const vibes = [
  { id: 'adventure', name: 'Adventure', emoji: '🧗' },
  { id: 'relaxation', name: 'Relaxation', emoji: '🧘' },
  { id: 'cultural', name: 'Cultural', emoji: '🏛' },
  { id: 'foodie', name: 'Foodie', emoji: '🍜' },
  { id: 'nightlife', name: 'Nightlife', emoji: '🌙' },
  { id: 'nature', name: 'Nature', emoji: '🌿' },
  { id: 'shopping', name: 'Shopping', emoji: '🛍️' },
  { id: 'photography', name: 'Photography', emoji: '📸' },
];

export default function PlanTripScreen({ route, navigation }) {
  // Wizard state
  const [step, setStep] = useState(1);
  const [selectedDest, setSelectedDest] = useState(null);
  const [destSearch, setDestSearch] = useState('');
  
  // Date states (simplified text picker)
  const [startMonth, setStartMonth] = useState('October');
  const [startDay, setStartDay] = useState(12);
  const [duration, setDuration] = useState(5); // in days
  
  // Traveler states
  const [travelers, setTravelers] = useState({
    adults: 2,
    children: 0,
    infants: 0,
    seniors: 0,
  });

  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedVibes, setSelectedVibes] = useState([]);
  const [budgetTier, setBudgetTier] = useState('Mid-Range'); // 'Budget', 'Mid-Range', 'Luxury'
  const [customBudget, setCustomBudget] = useState(65000); // per person in INR

  // Handle pre-selected destination from details screen
  useEffect(() => {
    if (route.params?.preselectedDestinationId) {
      const destId = route.params.preselectedDestinationId;
      const foundDest = destinations.find(d => d.id === destId);
      if (foundDest) {
        setSelectedDest(foundDest);
        setStep(2); // Skip Step 1 and go straight to dates!
      }
    }
  }, [route.params]);

  const handleNextStep = () => {
    if (step === 1 && !selectedDest) {
      Alert.alert('Error', 'Please select a destination to proceed.');
      return;
    }
    if (step < 6) {
      setStep(step + 1);
    } else {
      // Completed last step -> Nav to AI Loading
      navigation.navigate('AILoading', {
        tripDetails: {
          destinationId: selectedDest.id,
          destinationName: selectedDest.name,
          duration: duration,
          travelers: travelers,
          occasion: selectedOccasion,
          vibes: selectedVibes,
          budget: customBudget,
        }
      });
    }
  };

  const handlePrevStep = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleIncrement = (type) => {
    setTravelers(prev => ({ ...prev, [type]: prev[type] + 1 }));
  };

  const handleDecrement = (type) => {
    if (type === 'adults' && travelers[type] <= 1) return; // Need at least 1 adult
    if (travelers[type] <= 0) return;
    setTravelers(prev => ({ ...prev, [type]: prev[type] - 1 }));
  };

  const handleToggleVibe = (vibeName) => {
    if (selectedVibes.includes(vibeName)) {
      setSelectedVibes(prev => prev.filter(v => v !== vibeName));
    } else {
      setSelectedVibes(prev => [...prev, vibeName]);
    }
  };

  // Filter destinations based on search query
  const filteredDestinations = destinations.filter(d => 
    d.name.toLowerCase().includes(destSearch.toLowerCase()) ||
    d.country.toLowerCase().includes(destSearch.toLowerCase())
  );

  // Helper to render progress bar
  const renderProgress = () => {
    const progressWidth = `${(step / 6) * 100}%`;
    return (
      <View style={styles.progressContainer}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: progressWidth }]} />
        </View>
        <Text style={styles.progressText}>Step {step} of 6</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        {step > 1 ? (
          <TouchableOpacity onPress={handlePrevStep} style={styles.backBtn} activeOpacity={0.7}>
            <Ionicons name="arrow-back" size={24} color={colors.primary} />
          </TouchableOpacity>
        ) : (
          <View style={styles.backBtnPlaceholder} />
        )}
        <Text style={styles.headerTitle}>AI Plan Wizard</Text>
        <View style={styles.backBtnPlaceholder} />
      </View>

      {/* Progress Bar */}
      {renderProgress()}

      {/* Wizard Step Content */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Step 1: Destination Selection */}
        {step === 1 && (
          <View style={styles.stepView}>
            <Text style={styles.stepHeading}>Where do you want to go?</Text>
            <Text style={styles.stepSubtitle}>Choose from our AI-supported destination hubs</Text>
            
            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={colors.textSecondary} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Search country or city..."
                placeholderTextColor={colors.textMuted}
                value={destSearch}
                onChangeText={setDestSearch}
              />
            </View>

            <View style={styles.destList}>
              {filteredDestinations.map((dest) => {
                const isSelected = selectedDest?.id === dest.id;
                return (
                  <TouchableOpacity
                    key={dest.id}
                    style={[
                      styles.destItem,
                      isSelected && styles.selectedDestItem,
                    ]}
                    onPress={() => setSelectedDest(dest)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.destEmoji}>
                      {dest.id === 'japan' ? '🇯🇵' : 
                       dest.id === 'bali' ? '🇮🇩' : 
                       dest.id === 'paris' ? '🇫🇷' : 
                       dest.id === 'dubai' ? '🇦🇪' : 
                       dest.id === 'thailand' ? '🇹🇭' : '🇸🇬'}
                    </Text>
                    <View style={styles.destTextCol}>
                      <Text style={[styles.destName, isSelected && styles.selectedText]}>{dest.name}</Text>
                      <Text style={styles.destCountry}>{dest.country}</Text>
                    </View>
                    {isSelected && <Ionicons name="checkmark-circle" size={20} color={colors.primary} />}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 2: Date Selector */}
        {step === 2 && (
          <View style={styles.stepView}>
            <Text style={styles.stepHeading}>When are you traveling?</Text>
            <Text style={styles.stepSubtitle}>Select your start month and trip length</Text>

            {/* Month Picker */}
            <Text style={styles.inputLabel}>Start Month</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthScroll}>
              {['July', 'August', 'September', 'October', 'November', 'December', 'January', 'February', 'March'].map((m) => {
                const isSelected = startMonth === m;
                return (
                  <TouchableOpacity
                    key={m}
                    style={[styles.monthChip, isSelected && styles.activeMonthChip]}
                    onPress={() => setStartMonth(m)}
                  >
                    <Text style={[styles.monthChipText, isSelected && styles.activeMonthChipText]}>{m}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Day Selector */}
            <Text style={styles.inputLabel}>Starting Day: {startDay}</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.dayScroll}>
              {Array.from({ length: 30 }, (_, i) => i + 1).map((d) => {
                const isSelected = startDay === d;
                return (
                  <TouchableOpacity
                    key={d}
                    style={[styles.dayChip, isSelected && styles.activeDayChip]}
                    onPress={() => setStartDay(d)}
                  >
                    <Text style={[styles.dayChipText, isSelected && styles.activeDayChipText]}>{d}</Text>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Duration Selector */}
            <Text style={[styles.inputLabel, { marginTop: spacing.lg }]}>Trip Duration (Days)</Text>
            <View style={styles.durationSelector}>
              <TouchableOpacity onPress={() => setDuration(d => Math.max(1, d - 1))} style={styles.stepperBtn}>
                <Ionicons name="remove" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.durationValue}>{duration} Days</Text>
              <TouchableOpacity onPress={() => setDuration(d => Math.min(15, d + 1))} style={styles.stepperBtn}>
                <Ionicons name="add" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Step 3: Traveler details */}
        {step === 3 && (
          <View style={styles.stepView}>
            <Text style={styles.stepHeading}>Who is traveling with you?</Text>
            <Text style={styles.stepSubtitle}>AI adjusts hotel occupancy and ticket recommendations</Text>

            <View style={styles.stepperContainer}>
              {/* Adults */}
              <View style={styles.stepperRow}>
                <View>
                  <Text style={styles.stepperLabel}>Adults</Text>
                  <Text style={styles.stepperSublabel}>Age 13 or older</Text>
                </View>
                <View style={styles.stepperControls}>
                  <TouchableOpacity onPress={() => handleDecrement('adults')} style={styles.stepperBtn}>
                    <Ionicons name="remove" size={18} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.stepperVal}>{travelers.adults}</Text>
                  <TouchableOpacity onPress={() => handleIncrement('adults')} style={styles.stepperBtn}>
                    <Ionicons name="add" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Children */}
              <View style={styles.stepperRow}>
                <View>
                  <Text style={styles.stepperLabel}>Children</Text>
                  <Text style={styles.stepperSublabel}>Ages 2 to 12</Text>
                </View>
                <View style={styles.stepperControls}>
                  <TouchableOpacity onPress={() => handleDecrement('children')} style={styles.stepperBtn}>
                    <Ionicons name="remove" size={18} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.stepperVal}>{travelers.children}</Text>
                  <TouchableOpacity onPress={() => handleIncrement('children')} style={styles.stepperBtn}>
                    <Ionicons name="add" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Seniors */}
              <View style={styles.stepperRow}>
                <View>
                  <Text style={styles.stepperLabel}>Seniors</Text>
                  <Text style={styles.stepperSublabel}>Age 60 or older</Text>
                </View>
                <View style={styles.stepperControls}>
                  <TouchableOpacity onPress={() => handleDecrement('seniors')} style={styles.stepperBtn}>
                    <Ionicons name="remove" size={18} color={colors.primary} />
                  </TouchableOpacity>
                  <Text style={styles.stepperVal}>{travelers.seniors}</Text>
                  <TouchableOpacity onPress={() => handleIncrement('seniors')} style={styles.stepperBtn}>
                    <Ionicons name="add" size={18} color={colors.primary} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        )}

        {/* Step 4: Occasion selection */}
        {step === 4 && (
          <View style={styles.stepView}>
            <Text style={styles.stepHeading}>What is the occasion?</Text>
            <Text style={styles.stepSubtitle}>Helps AI personalize romantic spots, group activities, or parties</Text>

            <View style={styles.chipsGrid}>
              {occasions.map((o) => {
                const isSelected = selectedOccasion === o.name;
                return (
                  <TouchableOpacity
                    key={o.id}
                    style={[styles.chipItem, isSelected && styles.activeChipItem]}
                    onPress={() => setSelectedOccasion(o.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.chipEmoji}>{o.emoji}</Text>
                    <Text style={[styles.chipText, isSelected && styles.activeChipText]}>{o.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 5: Travel vibes (multi-select) */}
        {step === 5 && (
          <View style={styles.stepView}>
            <Text style={styles.stepHeading}>Pick your travel vibes</Text>
            <Text style={styles.stepSubtitle}>Select all that apply. AI curates activities based on these</Text>

            <View style={styles.chipsGrid}>
              {vibes.map((v) => {
                const isSelected = selectedVibes.includes(v.name);
                return (
                  <TouchableOpacity
                    key={v.id}
                    style={[styles.chipItem, isSelected && styles.activeChipItem]}
                    onPress={() => handleToggleVibe(v.name)}
                    activeOpacity={0.8}
                  >
                    <Text style={styles.chipEmoji}>{v.emoji}</Text>
                    <Text style={[styles.chipText, isSelected && styles.activeChipText]}>{v.name}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Step 6: Budget selection */}
        {step === 6 && (
          <View style={styles.stepView}>
            <Text style={styles.stepHeading}>Set your travel budget</Text>
            <Text style={styles.stepSubtitle}>AI recommends hotels and transport within your budget</Text>

            {/* Budget Presets */}
            <View style={styles.budgetTierContainer}>
              {['Budget', 'Mid-Range', 'Luxury'].map((t) => {
                const isSelected = budgetTier === t;
                return (
                  <TouchableOpacity
                    key={t}
                    style={[styles.tierBtn, isSelected && styles.activeTierBtn]}
                    onPress={() => {
                      setBudgetTier(t);
                      setCustomBudget(t === 'Budget' ? 35000 : t === 'Mid-Range' ? 65000 : 145000);
                    }}
                  >
                    <Text style={[styles.tierText, isSelected && styles.activeTierText]}>{t}</Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            {/* Custom Budget Slider Indicator */}
            <View style={styles.budgetDisplayBox}>
              <Text style={styles.budgetLabel}>ESTIMATED BUDGET PER PERSON</Text>
              <Text style={styles.budgetAmount}>₹{customBudget.toLocaleString('en-IN')}</Text>
              <Text style={styles.budgetHelp}>
                {budgetTier === 'Budget' ? '🎒 Backpacker hotels, local transport, street food.' :
                 budgetTier === 'Mid-Range' ? '🏨 Comfortable 3/4 star hotels, cabs, nice dining.' :
                 '🌟 Premium 5-star stays, private guides, fine dining.'}
              </Text>
            </View>

            {/* Simple +/- controls to adjust budget */}
            <View style={styles.budgetAdjustContainer}>
              <TouchableOpacity 
                onPress={() => setCustomBudget(prev => Math.max(10000, prev - 5000))} 
                style={styles.stepperBtn}
              >
                <Ionicons name="remove" size={24} color={colors.primary} />
              </TouchableOpacity>
              <Text style={styles.adjustText}>Adjust Budget</Text>
              <TouchableOpacity 
                onPress={() => setCustomBudget(prev => Math.min(500000, prev + 5000))} 
                style={styles.stepperBtn}
              >
                <Ionicons name="add" size={24} color={colors.primary} />
              </TouchableOpacity>
            </View>
          </View>
        )}

      </ScrollView>

      {/* Navigation CTA Buttons */}
      <View style={styles.footer}>
        <GradientButton
          title={step === 6 ? 'GENERATE ITINERARY' : 'CONTINUE'}
          onPress={handleNextStep}
        />
      </View>
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
    paddingBottom: spacing.sm,
    backgroundColor: colors.surface,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: colors.text,
  },
  backBtn: {
    padding: spacing.xs,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backBtnPlaceholder: {
    width: 32,
  },
  progressContainer: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.sm,
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
    alignItems: 'center',
  },
  progressBarBg: {
    width: '100%',
    height: 6,
    backgroundColor: '#cbd5e1',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 4,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.primary,
  },
  progressText: {
    fontSize: 10,
    color: colors.textSecondary,
    fontWeight: '700',
  },
  scrollContent: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xl,
    paddingBottom: 100,
  },
  stepView: {
    width: '100%',
  },
  stepHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: colors.text,
    marginBottom: 4,
  },
  stepSubtitle: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: spacing.xl,
    fontWeight: '500',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 48,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: colors.text,
  },
  destList: {
    width: '100%',
  },
  destItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    marginBottom: spacing.sm,
  },
  selectedDestItem: {
    borderColor: colors.primary,
    backgroundColor: '#f0fdfa',
  },
  destEmoji: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  destTextCol: {
    flex: 1,
  },
  destName: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  selectedText: {
    color: colors.primary,
  },
  destCountry: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  monthScroll: {
    marginBottom: spacing.md,
  },
  monthChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    marginRight: spacing.sm,
  },
  activeMonthChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  monthChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeMonthChipText: {
    color: '#ffffff',
  },
  dayScroll: {
    marginBottom: spacing.md,
  },
  dayChip: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.sm,
  },
  activeDayChip: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  dayChipText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  activeDayChipText: {
    color: '#ffffff',
  },
  durationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginTop: spacing.sm,
  },
  durationValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: spacing.xxl,
  },
  stepperContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    paddingHorizontal: spacing.lg,
    ...spacing.shadows.sm,
  },
  stepperRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  stepperLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: colors.text,
  },
  stepperSublabel: {
    fontSize: 11,
    color: colors.textSecondary,
    fontWeight: '500',
  },
  stepperControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stepperVal: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: spacing.lg,
    minWidth: 16,
    textAlign: 'center',
  },
  stepperBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdfa',
  },
  chipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  chipItem: {
    width: '48%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  activeChipItem: {
    borderColor: colors.primary,
    backgroundColor: '#f0fdfa',
  },
  chipEmoji: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeChipText: {
    color: colors.primary,
    fontWeight: '700',
  },
  budgetTierContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
  },
  tierBtn: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.surface,
    marginHorizontal: spacing.xs,
  },
  activeTierBtn: {
    borderColor: colors.primary,
    backgroundColor: '#f0fdfa',
  },
  tierText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textSecondary,
  },
  activeTierText: {
    color: colors.primary,
    fontWeight: '700',
  },
  budgetDisplayBox: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: spacing.xl,
    ...spacing.shadows.sm,
  },
  budgetLabel: {
    fontSize: 9,
    fontWeight: '800',
    color: colors.textMuted,
    letterSpacing: 1,
  },
  budgetAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: colors.primary,
    marginVertical: spacing.sm,
  },
  budgetHelp: {
    fontSize: 11,
    color: colors.textSecondary,
    textAlign: 'center',
    fontWeight: '500',
  },
  budgetAdjustContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  adjustText: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
    marginHorizontal: spacing.xl,
  },
  footer: {
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
});
