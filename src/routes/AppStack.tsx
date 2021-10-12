import React, {useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';
import BottomTabStack from './BottomTabStack';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../utils/colors';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Animated from 'react-native-reanimated';
import {RootStackParamList} from './RootStackParamList';
import {Text} from 'react-native';
import auth from '@react-native-firebase/auth';
import MenuIcon from '../../assets/icons/menu.svg';
import AppIcon from '../../assets/icons/app-icon.svg';
import Text20 from '../components/Text/Text20';
import Text24 from '../components/Text/Text24';
import OnboardingScreen from '../screens/App_OnBoarding';

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
          name="BottomTabStack"
          component={BottomTabStack}
          options={({route}) => ({
            header: () => null,
          })}
        />
        <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
      </Stack.Navigator>
    </Animated.View>
  );
};

const CustomDrawerContent = ({...rest}) => {
  return (
    <View style={{flex: 1, marginVertical: 50}}>
      <View
        style={{justifyContent: 'center', alignItems: 'center', padding: 20}}>
        <Text24 text={'100Ascent'} textColor={Colors.WHITE} />
      </View>
      <DrawerContentScrollView {...rest}>
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="settings" color={Colors.WHITE} size={size} />
          )}
          label="Settings"
          labelStyle={{color: Colors.WHITE, fontSize: 16}}
          onPress={() => {
            rest.navigation.closeDrawer();
          }}
        />
        <DrawerItem
          icon={({color, size}) => (
            <Icon name="call" color={Colors.WHITE} size={size} />
          )}
          label="Contact Us"
          labelStyle={{color: Colors.WHITE, fontSize: 16}}
          onPress={() => {
            rest.navigation.closeDrawer();
          }}
        />

        <DrawerItem
          icon={({color, size}) => (
            <Icon name="support" color={Colors.WHITE} size={size} />
          )}
          label="Help"
          labelStyle={{color: Colors.WHITE, fontSize: 16}}
          onPress={() => {
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
          label="Connections"
          labelStyle={{color: Colors.WHITE, fontSize: 16}}
          onPress={() => {
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
