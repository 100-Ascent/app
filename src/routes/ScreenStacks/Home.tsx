import {Colors} from '../../utils/colors';
import DataInListViewScreen from '../../screens/App_DataInListViewScreen';
import DataLoaderScreen from '../../screens/App_DataLoaderScreen';
import FitnessConnectionScreen from '../../screens/App_FitnessConnectionScreen';
import FitnessIntegrationScreen from '../../screens/App_FitnessIntegrationScreen';
import HomeScreen from '../../screens/App_HomeScreen';
import InstitutionScreen from '../../screens/App_InstitutionScreen';
import LeaderboardScreen from '../../screens/App_LeaderboardScreen';
import MyProfileScreen from '../../screens/App_MyProfileScreen';
import { NavigationDrawerStructure } from '../AppStack';
import React from 'react';
import {RootStackParamList} from '../RootStackParamList';
import {createStackNavigator} from '@react-navigation/stack';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const HomeStack = createStackNavigator<RootStackParamList>();

const Home = ({navigation, route}) => {

  // const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
  // if( routeName === "InstitutionScreen" ){
  //   navigation.setOptions({ tabBarVisible: false });
  // }else{
  // navigation.setOptions({ tabBarVisible: true });
  // }
  
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
      {/* <HomeStack.Screen
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
      <HomeStack.Screen
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
