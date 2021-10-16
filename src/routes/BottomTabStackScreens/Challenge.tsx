import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';
import {View} from 'react-native';

const MyChallengeStack = createStackNavigator<RootStackParamList>();

const MyChallenge = ({navigation}) => {
  return (
    <MyChallengeStack.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={{animationEnabled: false}}>
      <View>{/* Dummy navigator */}</View>
    </MyChallengeStack.Navigator>
  );
};

export default MyChallenge;
