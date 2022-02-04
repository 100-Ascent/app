import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {Colors} from '../../utils/colors';
import {RootStackParamList} from '../RootStackParamList';
import AddActivityScreen from '../../screens/App_AddActivityScreen';

const PostActivityStack = createStackNavigator<RootStackParamList>();

const PostActivity = ({navigation}) => {
  return (
    <PostActivityStack.Navigator
      initialRouteName="AddActivityScreen"
      screenOptions={{animationEnabled: false}}>
      <PostActivityStack.Screen
        name={'AddActivityScreen'}
        component={AddActivityScreen}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: Colors.WHITE,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      
    </PostActivityStack.Navigator>
  );
};

export default PostActivity;
