import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';
import HomeScreen from '../../screens/App_HomeScreen';
import ViewAllChallenges from '../../screens/App_ViewAllChallenges';
import ChallengeDescriptionScreen from '../../screens/App_ChallengeDescriptionScreen';
import {TouchableOpacity, View} from 'react-native';
import {Text} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import {DrawerActions, useNavigation} from '@react-navigation/native';
import {NavigationDrawerStructure} from '../AppStack';
import MyChallengeScreen from '../../screens/App_MyChallenges';
import CheckpointMilestoneScreen from '../../screens/App_CheckpointMilestoneScreen';
import RewardsScreen from '../../screens/App_RewardsScreen';
import MapViewFullScreen from '../../screens/App_MapViewFullScreen';
import MediaScreen from '../../screens/App_MediaScreen';
import Text16Normal from '../../components/Text/Text16Normal';
import {colors} from 'react-native-elements';
import Text20 from '../../components/Text/Text20';

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
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <AllChallengeStack.Screen
        component={ChallengeDescriptionScreen}
        name={'ChallengeDescriptionScreen'}
        options={{
          headerTitle: () => (
            <View style={{alignItems: 'center'}}>
              <Text16Normal
                text="Challenge Description"
                textColor={Colors.TEXTDARK}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon
                name="arrow-back"
                type="ionicons"
                size={30}
                onPress={() => navigation.pop()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon
                name="account-circle"
                type="materialicons"
                size={30}
                onPress={() => navigation.pop()}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
          animationEnabled: false,
        }}
      />
      <AllChallengeStack.Screen
        component={MyChallengeScreen}
        name={'MyChallengeScreen'}
        options={({route}) => ({
          headerTitle: () => (
            <View style={{alignItems: 'center'}}>
              <Text16Normal text="My Challenge" textColor={Colors.TEXTDARK} />
            </View>
          ),
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon
                name="arrow-back"
                type="ionicons"
                size={30}
                onPress={() => navigation.popToTop()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon
                name="account-circle"
                type="materialicons"
                size={30}
                onPress={() => navigation.pop()}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
          },
        })}
      />
      <AllChallengeStack.Screen
        component={CheckpointMilestoneScreen}
        name={'CheckpointMilestoneScreen'}
        options={({route}) => ({
          headerTitle: () => (
            <View style={{alignItems: 'center'}}>
              <Text16Normal text="Checkpoint" textColor={Colors.TEXTDARK} />
            </View>
          ),
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon
                name="arrow-back"
                type="ionicons"
                size={30}
                onPress={() => navigation.pop()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon
                name="account-circle"
                type="materialicons"
                size={30}
                onPress={() => navigation.pop()}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <AllChallengeStack.Screen
        component={RewardsScreen}
        name={'RewardsScreen'}
        options={({route}) => ({
          headerTitle: () => (
            <View style={{alignItems: 'center'}}>
              <Text16Normal text="Rewards" textColor={Colors.TEXTDARK} />
            </View>
          ),
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon
                name="arrow-back"
                type="ionicons"
                size={30}
                onPress={() => navigation.pop()}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <AllChallengeStack.Screen
        component={MediaScreen}
        name={'MediaScreen'}
        options={({route}) => ({
          headerTitle: null,
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon name="arrow-back" type="ionicons" />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon
                name="account-circle"
                type="materialicons"
                size={30}
                onPress={() => navigation.pop()}
              />
            </View>
          ),
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <AllChallengeStack.Screen
        component={MapViewFullScreen}
        name={'MapViewFullScreen'}
        options={({route}) => ({
          headerTitle: null,
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon
                name="arrow-back"
                type="ionicons"
                size={30}
                onPress={() => navigation.pop()}
              />
            </View>
          ),
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
