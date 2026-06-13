import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const loadSession = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('@goeasy_user');
        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        }
      } catch (e) {
        console.error('Failed to load session', e);
      } finally {
        setIsLoading(false);
      }
    };
    loadSession();
  }, []);

  const login = async (phone) => {
    setIsLoading(true);
    try {
      // Simulate API call for login (using a default mock name)
      const mockUser = {
        name: 'Sahil Sharma',
        phone: phone,
        preferences: { vibe: ['Adventure', 'Foodie'], budget: 'Mid-Range' }
      };
      await AsyncStorage.setItem('@goeasy_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (e) {
      console.error('Login failed', e);
      return { success: false, error: e.message };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (name, phone) => {
    setIsLoading(true);
    try {
      // Simulate API call for signup
      const mockUser = {
        name: name,
        phone: phone,
        preferences: { vibe: [], budget: 'Mid-Range' }
      };
      await AsyncStorage.setItem('@goeasy_user', JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
      return { success: true };
    } catch (e) {
      console.error('Signup failed', e);
      return { success: false, error: e.message };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('@goeasy_user');
      setUser(null);
      setIsAuthenticated(false);
    } catch (e) {
      console.error('Logout failed', e);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreferences = async (newPrefs) => {
    try {
      const updatedUser = { ...user, preferences: { ...user?.preferences, ...newPrefs } };
      await AsyncStorage.setItem('@goeasy_user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      return { success: true };
    } catch (e) {
      console.error('Updating preferences failed', e);
      return { success: false, error: e.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        signup,
        logout,
        updatePreferences
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
