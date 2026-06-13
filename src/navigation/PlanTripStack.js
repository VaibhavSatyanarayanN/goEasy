import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PlanTripScreen from '../screens/PlanTripScreen';
import AILoadingScreen from '../screens/AILoadingScreen';
import TripBoardScreen from '../screens/TripBoardScreen';

const Stack = createNativeStackNavigator();

export default function PlanTripStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="PlanTripMain" component={PlanTripScreen} />
      <Stack.Screen name="AILoading" component={AILoadingScreen} />
      <Stack.Screen name="TripBoard" component={TripBoardScreen} />
    </Stack.Navigator>
  );
}
