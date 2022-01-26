import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../../utils/colors';
import {RootStackParamList} from '../RootStackParamList';
import LeaderboardScreen from '../../screens/App_LeaderboardScreen';
import MyProfileScreen from '../../screens/App_MyProfileScreen';
import { NavigationDrawerStructure } from '../AppStack';

const ProfileStack = createStackNavigator<RootStackParamList>();

const Profile = ({navigation}) => {

  return (
    <ProfileStack.Navigator
      initialRouteName="MyProfileScreen"
      screenOptions={{animationEnabled: false}}>
      <ProfileStack.Screen
        name={'MyProfileScreen'}
        component={MyProfileScreen}
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
    </ProfileStack.Navigator>
  );
};

export default Profile;
