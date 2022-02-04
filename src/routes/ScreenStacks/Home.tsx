import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';

import {Colors} from '../../utils/colors';
import HomeScreen from '../../screens/App_HomeScreen';
import DataLoaderScreen from '../../screens/App_DataLoaderScreen';
import { NavigationDrawerStructure } from '../AppStack';
import LeaderboardScreen from '../../screens/App_LeaderboardScreen';
import FitnessConnectionScreen from '../../screens/App_FitnessConnectionScreen';
import FitnessIntegrationScreen from '../../screens/App_FitnessIntegrationScreen';
import DataInListViewScreen from '../../screens/App_DataInListViewScreen';
import MyProfileScreen from '../../screens/App_MyProfileScreen';

const HomeStack = createStackNavigator<RootStackParamList>();

const Home = ({navigation}) => {
  return (
    <HomeStack.Navigator
      initialRouteName="DataLoaderScreen"
      screenOptions={{animationEnabled: false}}>
      <HomeStack.Screen
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
       <HomeStack.Screen
        component={HomeScreen}
        name={'HomeScreen'}
        options={({route}) => ({
          headerTitle: null,
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
      <HomeStack.Screen
        component={MyProfileScreen}
        name={'MyProfileScreen'}
        options={({route}) => ({
          headerTitle: null,
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
      <HomeStack.Screen
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
      <HomeStack.Screen
        component={FitnessIntegrationScreen}
        name={'FitnessIntegrationScreen'}
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
      <HomeStack.Screen
        component={FitnessConnectionScreen}
        name={'FitnessConnectionScreen'}
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
      <HomeStack.Screen
        component={LeaderboardScreen}
        name={'LeaderboardScreen'}
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
      {/*

      <HomeStack.Screen
        component={MyProfileScreen}
        name={'MyProfileScreen'}
        options={({route}) => ({
          headerTitle: null,
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
      
      <HomeStack.Screen
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
      <HomeStack.Screen
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
      <HomeStack.Screen
        component={FitnessIntegrationScreen}
        name={'FitnessIntegrationScreen'}
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
      <HomeStack.Screen
        component={FitnessConnectionScreen}
        name={'FitnessConnectionScreen'}
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
      <HomeStack.Screen
        component={LeaderboardScreen}
        name={'LeaderboardScreen'}
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
    </HomeStack.Navigator>
  );
};

export default Home;
