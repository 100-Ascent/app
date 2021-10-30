import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';

import ViewAllChallenges from '../../screens/App_ViewAllChallenges';
import {Colors} from '../../utils/colors';

import MyProfileScreen from '../../screens/App_MyProfileScreen';
import EditMyProfileScreen from '../../screens/App_EditMyProfileScreen';
import { View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';

const AllChallengeStack = createStackNavigator<RootStackParamList>();

const AllChallenges = ({navigation}) => {
  return (
    <AllChallengeStack.Navigator
      initialRouteName="MyProfileScreen"
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
       <AllChallengeStack.Screen
        component={MyProfileScreen}
        name={'MyProfileScreen'}
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
       <AllChallengeStack.Screen
        component={EditMyProfileScreen}
        name={'EditMyProfileScreen'}
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
