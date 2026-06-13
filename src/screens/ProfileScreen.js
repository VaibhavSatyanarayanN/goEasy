import React, { useContext, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, Modal, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { AuthContext } from '../context/AuthContext';
import tripboards from '../data/tripboards';
import TripBoardCard from '../components/TripBoardCard';

export default function ProfileScreen({ navigation }) {
  const { user, logout } = useContext(AuthContext);
  const [logoutModalVisible, setLogoutModalVisible] = useState(false);

  // Pre-load user's trips. Let's show the Japan TripBoard as a "saved trip" for the user.
  const userTrips = [tripboards[0]]; 

  const handleLogout = async () => {
    setLogoutModalVisible(false);
    await logout();
  };

  const handleTripPress = (tbId) => {
    // Navigate to TripBoard. Since ProfileStack doesn't have TripBoardScreen defined in ProfileStack.js, 
    // we should make sure we navigate using correct stack pathways or add TripBoard to ProfileStack!
    // Let's check: ProfileStack only contains ProfileScreen. We can navigate to Plan tab and open TripBoard,
    // or add TripBoardScreen to ProfileStack! Yes, adding TripBoardScreen to ProfileStack is the safest way.
    // Let's do that right after.
    navigation.navigate('TripBoard', { tripboardId: tbId });
  };

  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'S';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* User Card */}
        <View style={styles.userCard}>
          <View style={styles.avatarBig}>
            <Text style={styles.avatarTextBig}>{userInitial}</Text>
          </View>
          <Text style={styles.userName}>{user?.name || 'Sahil Sharma'}</Text>
          <Text style={styles.userPhone}>{user?.phone || '+91 9876543210'}</Text>
          
          <TouchableOpacity style={styles.editProfileBtn} activeOpacity={0.7}>
            <Ionicons name="create-outline" size={16} color={colors.primary} />
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* Section: My Saved Trips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Planned Trips</Text>
          {userTrips.length > 0 ? (
            <View style={styles.tripsContainer}>
              {userTrips.map(trip => (
                <TripBoardCard
                  key={trip.id}
                  tripboard={trip}
                  onPress={() => handleTripPress(trip.id)}
                  style={styles.tripCard}
                />
              ))}
            </View>
          ) : (
            <View style={styles.emptyTripsCard}>
              <Ionicons name="airplane-outline" size={40} color={colors.textMuted} />
              <Text style={styles.emptyTripsText}>You haven't planned any trips yet.</Text>
              <TouchableOpacity
                style={styles.planFirstTripBtn}
                onPress={() => navigation.navigate('Plan')}
              >
                <Text style={styles.planFirstTripText}>Plan Your First Trip</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* Section: Settings Menu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBg}>
                <Ionicons name="sparkles-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuText}>Travel Preferences</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBg}>
                <Ionicons name="notifications-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuText}>Notifications</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBg}>
                <Ionicons name="shield-checkmark-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuText}>Privacy Policy</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem} activeOpacity={0.7}>
              <View style={styles.menuIconBg}>
                <Ionicons name="document-text-outline" size={18} color={colors.primary} />
              </View>
              <Text style={styles.menuText}>Terms of Service</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.menuItem, styles.lastMenuItem]} 
              onPress={() => setLogoutModalVisible(true)}
              activeOpacity={0.7}
            >
              <View style={[styles.menuIconBg, styles.logoutIconBg]}>
                <Ionicons name="log-out-outline" size={18} color={colors.danger} />
              </View>
              <Text style={[styles.menuText, styles.logoutText]}>Logout</Text>
              <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
            </TouchableOpacity>
          </View>
        </View>

      </ScrollView>

      {/* Logout Confirmation Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={logoutModalVisible}
        onRequestClose={() => setLogoutModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Ionicons name="alert-circle" size={48} color={colors.danger} style={styles.modalIcon} />
            <Text style={styles.modalTitle}>Confirm Logout</Text>
            <Text style={styles.modalMessage}>Are you sure you want to log out of your goEasy account?</Text>
            
            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]} 
                onPress={() => setLogoutModalVisible(false)}
              >
                <Text style={styles.cancelBtnText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.confirmBtn]} 
                onPress={handleLogout}
              >
                <Text style={styles.confirmBtnText}>Logout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    fontSize: 20,
    fontWeight: '800',
    color: colors.text,
  },
  scrollContent: {
    paddingBottom: spacing.xxl,
  },
  userCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    paddingVertical: spacing.xxl,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  avatarBig: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
    ...Platform.select({
      web: {
        boxShadow: '0px 4px 8px rgba(13, 148, 136, 0.2)',
      },
      default: {
        shadowColor: colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
      },
    }),
  },
  avatarTextBig: {
    color: '#ffffff',
    fontSize: 32,
    fontWeight: '700',
  },
  userName: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
  },
  userPhone: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 2,
    fontWeight: '500',
  },
  editProfileBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: spacing.md,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: spacing.borderRadius.sm,
    borderWidth: 1,
    borderColor: colors.primary,
  },
  editProfileText: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.primary,
    marginLeft: 4,
  },
  section: {
    marginTop: spacing.xxl,
    paddingHorizontal: spacing.xl,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.md,
  },
  tripsContainer: {
    width: '100%',
  },
  tripCard: {
    marginBottom: spacing.md,
  },
  emptyTripsCard: {
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    padding: spacing.xxl,
  },
  emptyTripsText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: spacing.sm,
    marginBottom: spacing.lg,
    textAlign: 'center',
  },
  planFirstTripBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: spacing.borderRadius.sm,
  },
  planFirstTripText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  menuContainer: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    overflow: 'hidden',
    ...spacing.shadows.sm,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  lastMenuItem: {
    borderBottomWidth: 0,
  },
  menuIconBg: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f0fdfa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  logoutIconBg: {
    backgroundColor: '#fef2f2',
  },
  menuText: {
    flex: 1,
    fontSize: 14,
    color: colors.text,
    fontWeight: '500',
  },
  logoutText: {
    color: colors.danger,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: colors.surface,
    borderRadius: spacing.borderRadius.lg,
    width: '80%',
    padding: spacing.xl,
    alignItems: 'center',
    ...spacing.shadows.lg,
  },
  modalIcon: {
    marginBottom: spacing.md,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  modalMessage: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: spacing.xl,
  },
  modalActions: {
    flexDirection: 'row',
    width: '100%',
  },
  modalBtn: {
    flex: 1,
    height: 44,
    borderRadius: spacing.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelBtn: {
    backgroundColor: colors.surfaceLight,
    marginRight: spacing.sm,
  },
  cancelBtnText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: '600',
  },
  confirmBtn: {
    backgroundColor: colors.danger,
  },
  confirmBtnText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
});
