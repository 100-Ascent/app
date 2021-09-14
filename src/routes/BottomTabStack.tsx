import React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../utils/colors';
import {View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {RootStackParamList} from './RootStackParamList';
import CustomTabBarButton from '../components/Button/CustomTabBarButton';
import AllChallenges from './BottomTabStackScreens/AllChallenges';
import {PostUpdateScreen} from '../screens/App_PostUpdateScreen';
import MyChallenge from './BottomTabStackScreens/Challenge';
import CommunityScreen from '../screens/App_CommunityScreen';
import User from './BottomTabStackScreens/User';
import Community from './BottomTabStackScreens/Community';

const Tab = createBottomTabNavigator<RootStackParamList>();

interface Props {
  onPress: any;
}

const BottomTabStack = ({navigation}) => {
  return (
    <Tab.Navigator
      initialRouteName="AllChallengesScreen"
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: Colors.WHITE,
          position: 'absolute',
          bottom: 15,
          marginHorizontal: 10,

          height: 60,
          borderRadius: 15,
          elevation: 10,

          shadowColor: Colors.BLACK1,
          shadowOpacity: 0.06,
          shadowOffset: {
            width: 10,
            height: 10,
          },
        },
      }}>
      <Tab.Screen
        name="AllChallengesScreen"
        component={AllChallenges}
        options={{
          tabBarLabel: '1',
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="home"
                size={30}
                color={focused ? Colors.PINK : Colors.TEXTDARK}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="CommunityScreen"
        component={Community}
        options={{
          tabBarLabel: '2',
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="people"
                type="material-icons"
                size={30}
                color={focused ? Colors.PINK : Colors.TEXTDARK}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PostDataScreen"
        component={PostUpdateScreen}
        options={{
          tabBarLabel: '3',
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="plus"
                type="ant-design"
                size={30}
                color={Colors.WHITE}
              />
            </View>
          ),
          tabBarButton: props => (
            <CustomTabBarButton
              onPress={() => navigation.navigate('PostDataScreen')}
              {...props}
            />
          ),
        }}
      />
      <Tab.Screen
        name="MyChallengeScreen"
        component={MyChallenge}
        options={{
          tabBarLabel: '4',
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="idcard"
                type="ant-design"
                size={30}
                color={focused ? Colors.PINK : Colors.TEXTDARK}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="UserProfileScreen"
        component={User}
        options={{
          tabBarLabel: '5',
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View>
              <Icon
                name="trophy"
                type="ionicon"
                size={30}
                color={focused ? Colors.PINK : Colors.TEXTDARK}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
