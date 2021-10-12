import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParamList';
import OnboardingScreen from '../screens/App_OnBoarding';

const Stack = createStackNavigator<RootStackParamList>();

const OnboardingStack = () => {
  return (
    <Stack.Navigator initialRouteName="OnboardingScreen">
      <Stack.Screen
        name="OnboardingScreen"
        component={OnboardingScreen}
        options={{header: () => null}}
      />
    </Stack.Navigator>
  );
};

export default OnboardingStack;
