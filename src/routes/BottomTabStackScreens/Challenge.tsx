import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';
import ChallengeDescriptionScreen from '../../screens/App_ChallengeDescriptionScreen';
import {Colors} from '../../utils/colors';
import {NavigationDrawerStructure} from '../AppStack';
import CheckpointMilestoneScreen from '../../screens/App_CheckpointMilestoneScreen';
import ViewAllChallenges from '../../screens/App_ViewAllChallenges';
import CommunityScreen from '../../screens/App_CommunityScreen';

const MyChallengeStack = createStackNavigator<RootStackParamList>();

const MyChallenge = ({navigation}) => {
  return (
    <MyChallengeStack.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={{animationEnabled: false}}>
      <MyChallengeStack.Screen
        component={CommunityScreen}
        name={'CommunityScreen'}
        options={({route}) => ({
          headerTitle: null,
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors.WHITE, //Set Header color
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <MyChallengeStack.Screen
        component={ChallengeDescriptionScreen}
        name={'ChallengeDescriptionScreen'}
        options={{
          header: () => null,
          animationEnabled: false,
        }}
      />
      <MyChallengeStack.Screen
        component={CheckpointMilestoneScreen}
        name={'CheckpointMilestoneScreen'}
        options={{
          header: () => null,
          animationEnabled: false,
        }}
      />
    </MyChallengeStack.Navigator>
  );
};

export default MyChallenge;
