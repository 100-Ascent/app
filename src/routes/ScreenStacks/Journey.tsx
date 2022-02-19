import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import FitnessConnectionScreen from '../../screens/App_FitnessConnectionScreen';
import FitnessIntegrationScreen from '../../screens/App_FitnessIntegrationScreen';
import {Colors} from '../../utils/colors';
import {RootStackParamList} from '../RootStackParamList';
import JourneyScreen from '../../screens/App_AllChallengesScreen';
import ChallengeDescriptionScreen from '../../screens/App_ChallengeDescriptionScreen';

const JourneyStack = createStackNavigator<RootStackParamList>();

const Journey = ({navigation}) => {

  return (
    <JourneyStack.Navigator
      initialRouteName="JourneyScreen"
      screenOptions={{animationEnabled: false}}>
      <JourneyStack.Screen
        name={'JourneyScreen'}
        component={JourneyScreen}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <JourneyStack.Screen
        name={'ChallengeDescriptionScreen'}
        component={ChallengeDescriptionScreen}
        options={({route}) => ({
          headerLeft: null,
          headerTitle: null,
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
    </JourneyStack.Navigator>
  );
};

export default Journey;
