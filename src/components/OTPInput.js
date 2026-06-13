import React, { useRef, useState, useEffect } from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

export default function OTPInput({ codeLength = 6, onCodeComplete }) {
  const [code, setCode] = useState(new Array(codeLength).fill(''));
  const inputsRef = useRef([]);

  useEffect(() => {
    // Auto-focus first input on mount
    setTimeout(() => {
      if (inputsRef.current[0]) {
        inputsRef.current[0].focus();
      }
    }, 100);
  }, []);

  const handleChangeText = (text, index) => {
    const newCode = [...code];
    // Take only the last character entered to prevent issues
    newCode[index] = text.slice(-1);
    setCode(newCode);

    // Call complete callback when all digits are filled
    const completeCode = newCode.join('');
    if (completeCode.length === codeLength) {
      onCodeComplete(completeCode);
    }

    // Auto-advance focus to next box
    if (text && index < codeLength - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyPress = (e, index) => {
    // If backspace is pressed and the input is empty, focus previous input
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {code.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputsRef.current[index] = ref)}
          style={[
            styles.input,
            digit ? styles.activeInput : styles.inactiveInput,
          ]}
          value={digit}
          onChangeText={(text) => handleChangeText(text, index)}
          onKeyPress={(e) => handleKeyPress(e, index)}
          keyboardType="number-pad"
          maxLength={1}
          selectTextOnFocus={true}
          textAlign="center"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginVertical: spacing.lg,
  },
  input: {
    width: 45,
    height: 52,
    borderWidth: 1.5,
    borderRadius: spacing.borderRadius.sm,
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    backgroundColor: colors.surface,
  },
  activeInput: {
    borderColor: colors.primary,
    backgroundColor: '#f0fdfa',
  },
  inactiveInput: {
    borderColor: colors.cardBorder,
    backgroundColor: colors.surfaceLight,
  },
});
