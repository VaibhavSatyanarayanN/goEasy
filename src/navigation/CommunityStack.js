import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CommunityScreen from '../screens/CommunityScreen';
import TripBoardScreen from '../screens/TripBoardScreen';
import BlogScreen from '../screens/BlogScreen';
import BlogPostScreen from '../screens/BlogPostScreen';

const Stack = createNativeStackNavigator();

export default function CommunityStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CommunityMain" component={CommunityScreen} />
      <Stack.Screen name="TripBoard" component={TripBoardScreen} />
      <Stack.Screen name="Blog" component={BlogScreen} />
      <Stack.Screen name="BlogPost" component={BlogPostScreen} />
    </Stack.Navigator>
  );
}
