import React, {useEffect, useRef, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Animated, Keyboard, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {RootStackParamList} from './RootStackParamList';


import {WIDTH} from '../utils/constants/constants';
import {Colors} from '../utils/colors';
import Leaderboard from './ScreenStacks/Leaderboard';
import Fitness from './ScreenStacks/Fitness';
import Profile from './ScreenStacks/Profile';
import AddActivityScreen from '../screens/App_AddActivityScreen';
import CustomTabBarButton from '../components/Button/CustomTabBarButton';
import Home from './ScreenStacks/Home';
import Activity from './ScreenStacks/Activity';
import PostActivity from './ScreenStacks/PostActivity';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabStack = ({navigation}) => {
  
  const getWidth = () => {
    let width = WIDTH - 20;
    width = width - 10;
    return width / 5; // Total five Tabs
  }
    
  const tabOffsetValue = useRef(new Animated.Value(getWidth() * 0)).current;

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  console.log(isKeyboardVisible);
  
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        tabBarOptions={{
          keyboardHidesTabBar: isKeyboardVisible,
          showLabel: false,
          style: {
            backgroundColor: Colors.WHITE,
            position: 'absolute',
            bottom: isKeyboardVisible ? 0 : 15,
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
          name="HomeScreen"
          component={Home}
          options={{
            tabBarLabel: '4',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="home"
                  type="ionicon"
                  size={28}
                  color={focused ? Colors.POPUP_RED : Colors.POPUP_GREY}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: 0,
                useNativeDriver: true,
              }).start();
            },
          })}
        />        
        <Tab.Screen
          name="DataInListViewScreen"
          component={Activity}
          options={{
            tabBarLabel: '4',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="directions-run"
                  type="material-icons"
                  size={30}
                  color={focused ? Colors.POPUP_RED : Colors.POPUP_GREY}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth(),
                useNativeDriver: true,
              }).start();
            },
          })}
        />
        <Tab.Screen
          name="AddActivityScreen"
          component={PostActivity}
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
                onPress={() => navigation.navigate('AddActivityScreen')}
                isKeyboardVisible = {isKeyboardVisible}
                {...props}
              />
            ),
          }}
          listeners={({navigation, route}) => ({
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
            // Onpress Update....
            tabPress: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 2,
                useNativeDriver: true,
              }).start();
            },
          })}
        />

        <Tab.Screen
          name="LeaderboardScreen"
          component={Leaderboard}
          options={{
            tabBarLabel: '4',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="trophy"
                  type="font-awesome"
                  size={28}
                  color={focused ? Colors.POPUP_RED : Colors.POPUP_GREY}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 3,
                useNativeDriver: true,
              }).start();
            },
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
          name="MyProfileScreen"
          component={Profile}
          options={{
            tabBarLabel: '4',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="face"
                  type="material"
                  size={30}
                  color={focused ? Colors.POPUP_RED : Colors.POPUP_GREY}
                />
              </View>
            ),
          }}
          listeners={({navigation, route}) => ({
            // Onpress Update....
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: getWidth() * 4,
                useNativeDriver: true,
              }).start();
            },
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
          backgroundColor: isKeyboardVisible ? Colors.TRANSPARENT : Colors.POPUP_RED,
          position: 'absolute',
          bottom: isKeyboardVisible ? 0 : 75,
          left: 25,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </>
  );
};

export default BottomTabStack;
