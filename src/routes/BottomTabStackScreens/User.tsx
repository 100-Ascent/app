import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';
import {Colors} from '../../utils/colors';
import {NavigationDrawerStructure} from '../AppStack';
import CommunityScreen from '../../screens/App_CommunityScreen';

const UserStack = createStackNavigator<RootStackParamList>();

const User = ({navigation}) => {
  return (
    <UserStack.Navigator
      initialRouteName="CommunityScreen"
      screenOptions={{animationEnabled: false}}>
      <UserStack.Screen
        component={CommunityScreen}
        name={'CommunityScreen'}
        options={({route}) => ({
          headerTitle: null,
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors.WHITE, //Set Header color
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
    </UserStack.Navigator>
  );
};

export default User;
