import React, {useRef} from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Colors} from '../utils/colors';
import {Animated, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {RootStackParamList} from './RootStackParamList';
import CustomTabBarButton from '../components/Button/CustomTabBarButton';
import AllChallenges from './BottomTabStackScreens/AllChallenges';
import {PostUpdateScreen} from '../screens/App_PostUpdateScreen';
import MyChallenge from './BottomTabStackScreens/Challenge';
import User from './BottomTabStackScreens/User';
import Community from './BottomTabStackScreens/Community';
import {DEBUG, WIDTH} from '../utils/constants';

const Tab = createBottomTabNavigator<RootStackParamList>();

interface Props {
  onPress: any;
}

const BottomTabStack = ({navigation}) => {
  const tabOffsetValue = useRef(new Animated.Value(getWidth() * 3)).current;

  function getWidth() {
    let width = WIDTH - 20;
    width = width - 10;

    // Total five Tabs
    return width / 5;
  }

  return DEBUG ? (
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
          tabBarLabel: '4',
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View style={{position: 'absolute', top: 15}}>
              <Icon
                name="trophy"
                type="ionicon"
                size={30}
                color={focused ? Colors.POPUP_RED : Colors.TEXTDARK}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth() * 3,
              useNativeDriver: true,
            }).start();
          },
        })}
      />
      <Tab.Screen
        name="PostDataScreen"
        component={PostUpdateScreen}
        options={{
          tabBarLabel: '2',
          unmountOnBlur: true,
          tabBarIcon: ({focused}) => (
            <View style={{position: 'absolute', top: 15}}>
              <Icon
                name="plus"
                type="ant-design"
                size={30}
                color={focused ? Colors.POPUP_RED : Colors.TEXTDARK}
              />
            </View>
          ),
        }}
        listeners={({navigation, route}) => ({
          // Onpress Update....
          tabPress: e => {
            Animated.spring(tabOffsetValue, {
              toValue: getWidth(),
              useNativeDriver: true,
            }).start();
          },
        })}
      />
    </Tab.Navigator>
  ) : (
    <>
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
          name="MyChallengeScreen"
          component={MyChallenge}
          options={{
            tabBarLabel: '1',
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="home"
                  size={30}
                  color={focused ? Colors.POPUP_RED : Colors.TEXTDARK}
                />
              </View>
            ),
            unmountOnBlur: true,
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="CommunityScreen"
          component={Community}
          options={{
            tabBarLabel: '2',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="people"
                  type="material-icons"
                  size={30}
                  color={focused ? Colors.POPUP_RED : Colors.TEXTDARK}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
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
          name="AllChallengesScreen"
          component={AllChallenges}
          options={{
            tabBarLabel: '4',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="trophy"
                  type="ionicon"
                  size={30}
                  color={focused ? Colors.POPUP_RED : Colors.TEXTDARK}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="UserProfileScreen"
          component={User}
          options={{
            tabBarLabel: '5',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="idcard"
                  type="ant-design"
                  size={30}
                  color={focused ? Colors.POPUP_RED : Colors.TEXTDARK}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
          })}
        />
      </Tab.Navigator>
      <Animated.View
        style={{
          width: getWidth() - 20,
          height: 2,
          backgroundColor: Colors.POPUP_RED,
          position: 'absolute',
          bottom: 75,
          left: 25,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </>
  );
};

export default BottomTabStack;
