import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';

import ViewAllChallenges from '../../screens/App_ViewAllChallenges';
import {Colors} from '../../utils/colors';

import MyProfileScreen from '../../screens/App_MyProfileScreen';
import EditMyProfileScreen from '../../screens/App_EditMyProfileScreen';
import AddActivityScreen from '../../screens/App_AddActivityScreen';
import DataLoaderScreen from '../../screens/App_DataLoaderScreen';
import DataInListViewScreen from '../../screens/App_DataInListViewScreen';

const AllChallengeStack = createStackNavigator<RootStackParamList>();

const AllChallenges = ({navigation}) => {
  return (
    <AllChallengeStack.Navigator
      initialRouteName="DataLoaderScreen"
      screenOptions={{animationEnabled: false}}>
      {/* <AllChallengeStack.Screen
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
      /> */}
       <AllChallengeStack.Screen
        component={DataLoaderScreen}
        name={'DataLoaderScreen'}
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
      <AllChallengeStack.Screen
        component={AddActivityScreen}
        name={'AddActivityScreen'}
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
    </AllChallengeStack.Navigator>
  );
};

export default AllChallenges;
