import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../../utils/colors';
import {RootStackParamList} from '../RootStackParamList';
import DataInListViewScreen from '../../screens/App_DataInListViewScreen';
import {NavigationDrawerStructure} from '../AppStack';
import EditActivityScreen from '../../screens/App_EditActivityScreen';
import AddActivityScreen from '../../screens/App_AddActivityScreen';

const ActivityStack = createStackNavigator<RootStackParamList>();

const Activity = ({navigation}) => {
  return (
    <ActivityStack.Navigator
      initialRouteName="DataInListViewScreen"
      screenOptions={{animationEnabled: false}}>
      <ActivityStack.Screen
        name={'DataInListViewScreen'}
        component={DataInListViewScreen}
        options={({route}) => ({
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: Colors.WHITE,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <ActivityStack.Screen
        name={'EditActivityScreen'}
        component={EditActivityScreen}
        options={({route}) => ({
          headerLeft: () => (
            navigation.pop()
          ),
          headerStyle: {
            backgroundColor: Colors.WHITE,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      
    </ActivityStack.Navigator>
  );
};

export default Activity;
