import ChallengeDescriptionScreen from '../../screens/App_ChallengeDescriptionScreen';
import CheckpointMilestoneScreen from '../../screens/App_CheckpointMilestoneScreen';
import {Colors} from '../../utils/colors';
import DataInListViewScreen from '../../screens/App_DataInListViewScreen';
import EditActivityScreen from '../../screens/App_EditActivityScreen';
import JourneyScreen from '../../screens/App_AllChallengesScreen';
import MediaScreen from '../../screens/App_MediaScreen';
import MyChallengeScreen from '../../screens/App_MyChallengeScreen';
import PaymentScreen from '../../screens/App_PaymentScreen';
import React from 'react';
import RewardsScreen from '../../screens/App_RewardsScreen';
import {RootStackParamList} from '../RootStackParamList';
import {createStackNavigator} from '@react-navigation/stack';

const JourneyStack = createStackNavigator<RootStackParamList>();

const Journey = ({navigation }) => {
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
      <JourneyStack.Screen
        name={'MyChallengeScreen'}
        component={MyChallengeScreen}
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
      <JourneyStack.Screen
        name={'CheckpointMilestoneScreen'}
        component={CheckpointMilestoneScreen}
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
       <JourneyStack.Screen
        name={'RewardsScreen'}
        component={RewardsScreen}
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
      <JourneyStack.Screen
        name={'MediaScreen'}
        component={MediaScreen}
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
      <JourneyStack.Screen
        name={'EditActivityScreen'}
        component={EditActivityScreen}
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
      <JourneyStack.Screen
        name={'DataInListViewScreen'}
        component={DataInListViewScreen}
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
      <JourneyStack.Screen
        name={'PaymentScreen'}
        component={PaymentScreen}
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
