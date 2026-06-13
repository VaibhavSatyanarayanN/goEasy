import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';
import BlogPostScreen from '../screens/BlogPostScreen';
import TripBoardScreen from '../screens/TripBoardScreen';

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
      <Stack.Screen name="BlogPost" component={BlogPostScreen} />
      <Stack.Screen name="TripBoard" component={TripBoardScreen} />
    </Stack.Navigator>
  );
}
