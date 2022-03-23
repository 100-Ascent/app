import {Animated, Keyboard, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import { getFocusedRouteNameFromRoute, useIsFocused } from '@react-navigation/native';

import Activity from './ScreenStacks/Activity';
import AddActivityScreen from '../screens/App_AddActivityScreen';
import {Colors} from '../utils/colors';
import CustomTabBarButton from '../components/Button/CustomTabBarButton';
import Fitness from './ScreenStacks/Fitness';
import Home from './ScreenStacks/Home';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Journey from './ScreenStacks/Journey';
import Leaderboard from './ScreenStacks/Leaderboard';
import PostActivity from './ScreenStacks/PostActivity';
import Profile from './ScreenStacks/Profile';
import {RootStackParamList} from './RootStackParamList';
import {WIDTH} from '../utils/constants/constants';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { isIOS } from 'react-native-elements/dist/helpers';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabStack = ({navigation}) => {
  
  const getWidth = () => {
    let width = WIDTH - 20;
    width = width - 10;
    return width / 5; // Total five Tabs
  }
    
  const tabOffsetValue = useRef(new Animated.Value(getWidth() * 0)).current;

  const [isTabBarVisible, setTabBarVisibility] = useState(true);

 useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setTabBarVisibility(false); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setTabBarVisibility(true); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  
  return (
    <>
      <Tab.Navigator
        initialRouteName="HomeScreen"
        tabBarOptions={{
          keyboardHidesTabBar: !isTabBarVisible,
          showLabel: false,
          style: {
            backgroundColor: Colors.WHITE,
            position: 'absolute',
            bottom: isTabBarVisible ? 15 : 0,
            marginHorizontal: 10,

            height: 60,
            borderRadius: 15,
            elevation: 10,

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 4,
            },
            shadowOpacity: 0.30,
            shadowRadius: 4.65,
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
          name="JourneyScreen"
          component={Journey}
          options={({ route }) => ({
            tabBarLabel: '4',
            unmountOnBlur: true,
            tabBarIcon: ({focused}) => (
              <View style={{position: 'absolute', top: 15}}>
                <Icon
                  name="map"
                  type="ionicon"
                  size={28}
                  color={focused ? Colors.POPUP_RED : Colors.POPUP_GREY}
                />
              </View>
            ),
            tabBarVisible: ((route) => {
                const routeName = getFocusedRouteNameFromRoute(route) ?? "";  
                if(routeName === "PaymentScreen" || routeName === "AfterPaymentScreen"){
                  setTabBarVisibility(false);
                  return false;
                }              
                setTabBarVisibility(true);
                return true;  
            })(route),
          })}
          listeners={({navigation, route}) => ({
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
        {/* <Tab.Screen
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
        /> */}
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
                showTabBarButton = {isTabBarVisible}
                {...props}
              />
            ),
          }}
          listeners={({navigation, route}) => ({
            focus: e => {
              Animated.spring(tabOffsetValue, {
                toValue: isIOS ? getWidth() * 10 : getWidth() * 2,
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
          backgroundColor: isTabBarVisible ? Colors.POPUP_RED : Colors.TRANSPARENT,
          position: 'absolute',
          bottom: isTabBarVisible ? 75 : 0,
          left: 25,
          borderRadius: 20,
          transform: [{translateX: tabOffsetValue}],
        }}></Animated.View>
    </>
  );
};

export default BottomTabStack;
