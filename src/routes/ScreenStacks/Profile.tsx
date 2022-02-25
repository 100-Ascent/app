import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../../utils/colors';
import {RootStackParamList} from '../RootStackParamList';
import LeaderboardScreen from '../../screens/App_LeaderboardScreen';
import MyProfileScreen from '../../screens/App_MyProfileScreen';
import { NavigationDrawerStructure } from '../AppStack';
import EditMyProfileScreen from '../../screens/App_EditMyProfileScreen';
import InstitutionScreen from '../../screens/App_InstitutionScreen';
import DataInListViewScreen from '../../screens/App_DataInListViewScreen';
import EditActivityScreen from '../../screens/App_EditActivityScreen';

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
      <ProfileStack.Screen
        name={'EditMyProfileScreen'}
        component={EditMyProfileScreen}
        options={({route}) => ({ 
          headerStyle: {
            backgroundColor: Colors.WHITE,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />     
      <ProfileStack.Screen
        component={InstitutionScreen}
        name={'InstitutionScreen'}
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
      <ProfileStack.Screen
        component={DataInListViewScreen}
        name={'DataInListViewScreen'}
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
      <ProfileStack.Screen
        component={EditActivityScreen}
        name={'EditActivityScreen'}
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
    </ProfileStack.Navigator>
  );
};

export default Profile;
