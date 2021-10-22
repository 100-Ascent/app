import React, {useRef} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {Animated, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {RootStackParamList} from './RootStackParamList';

import AllChallenges from './BottomTabStackScreens/AllChallenges';

import {WIDTH} from '../utils/constants/constants';
import {Colors} from '../utils/colors';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabStack = ({navigation}) => {
  const tabOffsetValue = useRef(new Animated.Value(getWidth() * 3)).current;
  function getWidth() {
    let width = WIDTH - 20;
    width = width - 10;
    return width / 5; // Total five Tabs
  }

  return (
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
