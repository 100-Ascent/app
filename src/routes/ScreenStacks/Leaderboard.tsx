import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../../utils/colors';
import {RootStackParamList} from '../RootStackParamList';
import LeaderboardScreen from '../../screens/App_LeaderboardScreen';
import { NavigationDrawerStructure } from '../AppStack';

const LeaderboardStack = createStackNavigator<RootStackParamList>();

const Leaderboard = ({navigation}) => {

  return (
    <LeaderboardStack.Navigator
      initialRouteName="LeaderboardScreen"
      screenOptions={{animationEnabled: false}}>
      <LeaderboardStack.Screen
        name={'LeaderboardScreen'}
        component={LeaderboardScreen}
        options={({route}) => ({
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors.WHITE,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },         
        })}
      />     
    </LeaderboardStack.Navigator>
  );
};

export default Leaderboard;
