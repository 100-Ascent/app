import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../../utils/colors';
import {RootStackParamList} from '../RootStackParamList';
import SettingScreen from '../../screens/App_SettingScreen';
import ToggleSettingScreen from '../../screens/App_ToggleSettingScreen';

const SettingStack = createStackNavigator<RootStackParamList>();

const Settings = ({navigation}) => {
  
  return (
    <SettingStack.Navigator
      initialRouteName="SettingsStack"
      screenOptions={{animationEnabled: false}}>
      <SettingStack.Screen
        name={'SettingScreen'}
        component={SettingScreen}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <SettingStack.Screen
        name={'ToggleSettingScreen'}
        component={ToggleSettingScreen}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
    </SettingStack.Navigator>
  );
};

export default Settings;
