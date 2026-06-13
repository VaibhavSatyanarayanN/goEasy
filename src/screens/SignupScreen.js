import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { AuthContext } from '../context/AuthContext';
import GlassCard from '../components/GlassCard';
import PhoneInput from '../components/PhoneInput';
import OTPInput from '../components/OTPInput';
import GradientButton from '../components/GradientButton';
import countries from '../data/countries';

export default function SignupScreen({ navigation }) {
  const { signup } = useContext(AuthContext);

  const [step, setStep] = useState('info'); // 'info' or 'otp'
  const [fullName, setFullName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [otpCode, setOtpCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    let timer;
    if (step === 'otp' && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setCanResend(true);
    }
    return () => clearInterval(timer);
  }, [step, countdown]);

  const handleGetOTP = () => {
    if (!fullName.trim()) {
      Alert.alert('Error', 'Please enter your full name.');
      return;
    }
    if (!phoneNumber) {
      Alert.alert('Error', 'Please enter your mobile number.');
      return;
    }
    if (phoneNumber.length < 8) {
      Alert.alert('Error', 'Please enter a valid mobile number.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('otp');
      setCountdown(30);
      setCanResend(false);
      Alert.alert('Simulated SMS', `Your OTP is 123456 (Accepted code: any 6 digits)`);
    }, 1500);
  };

  const handleVerify = () => {
    if (otpCode.length !== 6) {
      Alert.alert('Error', 'Please enter the 6-digit OTP code.');
      return;
    }

    setLoading(true);
    setTimeout(async () => {
      setLoading(false);
      const fullPhone = `${selectedCountry.code} ${phoneNumber}`;
      const result = await signup(fullName, fullPhone);
      if (!result.success) {
        Alert.alert('Error', result.error || 'Failed to sign up');
      }
    }, 1500);
  };

  const handleResend = () => {
    setCountdown(30);
    setCanResend(false);
    Alert.alert('Simulated SMS', 'New OTP sent: 123456');
  };

  const handleGoBack = () => {
    setStep('info');
    setOtpCode('');
  };

  return (
    <LinearGradient
      colors={['#ffffff', '#f0fdfa', '#ecfdf5']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          
          {/* Logo Header */}
          <View style={styles.header}>
            <Text style={styles.logoText}>
              go<Text style={styles.logoHighlight}>Easy</Text>
            </Text>
            <Text style={styles.tagline}>Vacations made easy</Text>
          </View>

          {/* Form Card */}
          <GlassCard style={styles.card}>
            {step === 'info' ? (
              <View>
                <Text style={styles.cardTitle}>Create Account</Text>
                <Text style={styles.cardSubtitle}>
                  Join goEasy to create personalized travel itineraries with AI assistance.
                </Text>

                {/* Name Input */}
                <View style={styles.inputContainer}>
                  <Ionicons name="person-outline" size={20} color={colors.textSecondary} style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor={colors.textMuted}
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                  />
                </View>

                {/* Phone Input */}
                <View style={styles.inputSpacing}>
                  <PhoneInput
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    selectedCountry={selectedCountry}
                    onSelectCountry={setSelectedCountry}
                  />
                </View>

                <GradientButton
                  title="CREATE ACCOUNT"
                  onPress={handleGetOTP}
                  loading={loading}
                />

                <Text style={styles.termsText}>
                  By continuing, you agree to our{' '}
                  <Text style={styles.linkText}>Terms of Service</Text> and{' '}
                  <Text style={styles.linkText}>Privacy Policy</Text>.
                </Text>
              </View>
            ) : (
              <View>
                {/* Back button */}
                <TouchableOpacity onPress={handleGoBack} style={styles.backBtn} activeOpacity={0.7}>
                  <Ionicons name="arrow-back" size={20} color={colors.primary} />
                  <Text style={styles.backText}>Edit Information</Text>
                </TouchableOpacity>

                <Text style={styles.cardTitle}>Verify Mobile</Text>
                <Text style={styles.cardSubtitle}>
                  Enter the 6-digit verification code sent to{' '}
                  <Text style={styles.boldText}>
                    {selectedCountry.code} {phoneNumber}
                  </Text>
                </Text>

                <OTPInput
                  codeLength={6}
                  onCodeComplete={(code) => {
                    setOtpCode(code);
                  }}
                />

                <GradientButton
                  title="VERIFY & CREATE PROFILE"
                  onPress={handleVerify}
                  loading={loading}
                  disabled={otpCode.length !== 6}
                  style={styles.verifyBtn}
                />

                <View style={styles.resendContainer}>
                  {canResend ? (
                    <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                      <Text style={styles.resendLinkText}>Resend OTP</Text>
                    </TouchableOpacity>
                  ) : (
                    <Text style={styles.resendText}>Resend OTP in {countdown}s</Text>
                  )}
                </View>
              </View>
            )}
          </GlassCard>

          {/* Switch to Login / Info Link */}
          <View style={styles.footerLinkContainer}>
            <Text style={styles.footerText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')} activeOpacity={0.7}>
              <Text style={styles.footerLink}>Login</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.xxl,
  },
  header: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoText: {
    fontSize: 36,
    fontWeight: '800',
    color: colors.text,
    letterSpacing: -1,
  },
  logoHighlight: {
    color: colors.primary,
  },
  tagline: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: '500',
    marginTop: 4,
  },
  card: {
    width: '100%',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  cardSubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: spacing.lg,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 52,
    borderWidth: 1,
    borderColor: colors.cardBorder,
    borderRadius: spacing.borderRadius.md,
    backgroundColor: colors.surfaceLight,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
  inputIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  inputSpacing: {
    marginBottom: spacing.lg,
  },
  termsText: {
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
    lineHeight: 16,
  },
  linkText: {
    color: colors.primary,
    fontWeight: '500',
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  backText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  boldText: {
    fontWeight: '600',
    color: colors.text,
  },
  verifyBtn: {
    marginTop: spacing.sm,
  },
  resendContainer: {
    alignItems: 'center',
    marginTop: spacing.lg,
  },
  resendText: {
    fontSize: 14,
    color: colors.textMuted,
  },
  resendLinkText: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '600',
  },
  footerLinkContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  footerText: {
    fontSize: 14,
    color: colors.textSecondary,
  },
  footerLink: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '700',
  },
});
