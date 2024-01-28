import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnBoardingSlides from '../../components/OnBoardingSlides/OnBoardingSlides';
import MainContainer from './MainContainer';

const Stack = createStackNavigator();

export default function OnBoardingStackNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="OnBoardingScreen"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="onBoardingScreen" component={OnBoardingSlides} />
      <Stack.Screen name="mainAppScreen" component={MainContainer} />
    </Stack.Navigator>
  );
}
