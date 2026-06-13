import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/context/AuthContext';
import RootNavigator from './src/navigation/RootNavigator';
import { Platform } from 'react-native';
import { enableScreens } from 'react-native-screens';

if (Platform.OS === 'web') {
  enableScreens(false);
  
  // Suppress noisy third-party React Native Web deprecation warnings in the browser console
  const originalWarn = console.warn;
  console.warn = (...args) => {
    const msg = args.map(arg => (typeof arg === 'object' ? JSON.stringify(arg) : String(arg))).join(' ');
    if (
      msg.includes('props.pointerEvents is deprecated') ||
      msg.includes('shadow* style props are deprecated')
    ) {
      return;
    }
    originalWarn(...args);
  };
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <NavigationContainer
          onStateChange={() => {
            if (Platform.OS === 'web' && typeof document !== 'undefined') {
              // Blur active element to prevent Chrome's accessibility focus warning
              if (document.activeElement && document.activeElement !== document.body) {
                try {
                  document.activeElement.blur();
                } catch (e) {
                  // Safe catch if blur is not supported or fails
                }
              }
            }
          }}
        >
          <RootNavigator />
          <StatusBar style="dark" />
        </NavigationContainer>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
