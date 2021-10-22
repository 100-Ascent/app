import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';

import ViewAllChallenges from '../../screens/App_ViewAllChallenges';
import {Colors} from '../../utils/colors';

import Text16Normal from '../../components/Text/Text16Normal';

const AllChallengeStack = createStackNavigator<RootStackParamList>();

const AllChallenges = ({navigation}) => {
  return (
    <AllChallengeStack.Navigator
      initialRouteName="AllChallengesScreen"
      screenOptions={{animationEnabled: false}}>
      <AllChallengeStack.Screen
        component={ViewAllChallenges}
        name={'AllChallengesScreen'}
        options={({route}) => ({
          headerTitle: null,
          headerLeft: () => null,
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
    </AllChallengeStack.Navigator>
  );
};

export default AllChallenges;
