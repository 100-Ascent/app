import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../utils/colors';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {RootStackParamList} from './RootStackParamList';
import auth from '@react-native-firebase/auth';
import MenuIcon from '../../assets/icons/menu.svg';
import Text24 from '../components/Text/Text24';

import AllChallenges from './ScreenStacks/AllChallenges';
import Fitness from './ScreenStacks/Fitness';
import { useSelector } from 'react-redux';
import { AppState } from '../redux';
import axios from 'axios';
import { HEARTBEAT } from '../utils/apis/endpoints';
import Settings from './ScreenStacks/Settings';
import Leaderboard from './ScreenStacks/Leaderboard';

const Stack = createStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootStackParamList>();


export const NavigationDrawerStructure = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{flexDirection: 'row', marginLeft: 10}}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <MenuIcon width={25} height={25} />
      </TouchableOpacity>
    </View>
  );
};

const HomeStack = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator initialRouteName="HomeStack">
          <Stack.Screen
            name="AllChallengesScreen"
            component={AllChallenges}
            options={({route}) => ({
              header: () => null,
            })}
          />
          {/* <Stack.Screen
            name="BottomTabStack"
            component={BottomTabStack}
            options={({route}) => ({
              header: () => null,
            })}
          /> */}
      </Stack.Navigator>
    </Animated.View>
  );
};

const FitnessStack = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator initialRouteName="FitnessStack">
          <Stack.Screen
            name="FitnessStack"
            component={Fitness}
            options={({route}) => ({
              header: () => null,
            })}
          />
      </Stack.Navigator>
    </Animated.View>
  );
};

const SettingsStack = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator initialRouteName="SettingsStack">
          <Stack.Screen
            name="SettingsStack"
            component={Settings}
            options={({route}) => ({
              header: () => null,
            })}
          />
      </Stack.Navigator>
    </Animated.View>
  );
};

const LeaderboardStack = ({navigation, style}) => {
  return (
    <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
      <Stack.Navigator initialRouteName="LeaderboardStack">
          <Stack.Screen
            name="LeaderboardStack"
            component={Leaderboard}
            options={({route}) => ({
              header: () => null,
            })}
          />
      </Stack.Navigator>
    </Animated.View>
  );
};

const CustomDrawerContent = ({...rest}) => {
  return (
    <View style={{flex: 1, marginVertical: 50}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
        <Text24 text={'100 Ascent'} textColor={Colors.WHITE} />
      </View>
      <DrawerContentScrollView {...rest}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="settings" color={Colors.WHITE} size={size} />
          )}
          label="Settings"
          labelStyle={{color: Colors.WHITE, fontSize: 16}}
          onPress={() => {
            rest.navigation.navigate('SettingsStack')
            rest.navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              name="aliwangwang-o1"
              type="ant-design"
              color={Colors.WHITE}
              size={size}
            />
          )}
          label="3rd Party Sync"
          labelStyle={{color: Colors.WHITE, fontSize: 16}}
          onPress={() => {
            rest.navigation.navigate('FitnessStack')
            rest.navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon
              name="leaderboard"
              type="material-icons"
              color={Colors.WHITE}
              size={size}
            />
          )}
          label="Leaderboard"
          labelStyle={{color: Colors.WHITE, fontSize: 16}}
          onPress={() => {
            rest.navigation.navigate('LeaderboardStack')
            rest.navigation.closeDrawer();
          }}
        />
      </DrawerContentScrollView>
      <DrawerItem
        icon={({color, size}) => (
          <Icon name="exit-to-app" color={Colors.WHITE} size={size} />
        )}
        label="Sign Out"
        labelStyle={{color: Colors.WHITE}}
        onPress={() => {
          rest.navigation.closeDrawer();
          auth().signOut();
        }}
      />
    </View>
  );
};

const AppStack = () => {
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const heart_beat_timeout = useSelector((state: AppState) => state.rootStore.heartBeatConfig.heart_beat_timeout)
  const heart_beat_toggle = useSelector((state: AppState) => state.rootStore.heartBeatConfig.heart_beat_toggle)

  const [progress, setProgress] = useState(new Animated.Value(0));

  const scale = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.85],
  });

  const borderRadius = Animated.interpolateNode(progress, {
    inputRange: [0, 1],
    outputRange: [0, 16],
  });

  const animatedStyle = {borderRadius, transform: [{scale}]};

  const heartBeat = async () => {
    
    axios
      .get(HEARTBEAT + contextId, {})
      .then(res => { })
      .catch(err => {
        console.log('Heartbeat Failure');
        console.log(err);
      });
  }

  useEffect(()=>{
    if(heart_beat_toggle && contextId !==null){
      heartBeat();
     let timer = setInterval(()=> heartBeat(), heart_beat_timeout * 1000)
    }
    
  },[]);

  return (
    <Drawer.Navigator
      drawerType="slide"
      overlayColor="transparent"
      drawerStyle={styles.drawerStyles}
      drawerContentOptions={{
        activeBackgroundColor: 'transparent',
        activeTintColor: Colors.BLACK1,
      }}
      sceneContainerStyle={{backgroundColor: Colors.PINK}}
      drawerContent={props => {
        setProgress(props.progress);
        return <CustomDrawerContent {...props} />;
      }}>
      <Drawer.Screen name="HomeStack">
        {props => <HomeStack {...props} style={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="FitnessStack">
        {props => <FitnessStack {...props} style={animatedStyle} />}
      </Drawer.Screen>
      <Drawer.Screen name="SettingsStack">
        {props => <SettingsStack {...props} style={animatedStyle} />}
      </Drawer.Screen>

      <Drawer.Screen name="LeaderboardStack">
        {props => <LeaderboardStack {...props} style={animatedStyle} />}
      </Drawer.Screen>
      
    </Drawer.Navigator>
  );
};

export default AppStack;

const styles = StyleSheet.create({
  stack: {
    flex: 1,
  },
  drawerStyles: {
    flex: 1,
    width: '60%',
    backgroundColor: Colors.PINK,
  },
  drawerItem: {
    alignItems: 'flex-start',
    marginVertical: 0,
  },
});
