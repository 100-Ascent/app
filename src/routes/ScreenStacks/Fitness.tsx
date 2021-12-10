import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import FitnessConnectionScreen from '../../screens/App_FitnessConnectionScreen';
import FitnessIntegrationScreen from '../../screens/App_FitnessIntegrationScreen';
import {Colors} from '../../utils/colors';
import {RootStackParamList} from '../RootStackParamList';

const FitnessStack = createStackNavigator<RootStackParamList>();

const Fitness = ({navigation}) => {

  return (
    <FitnessStack.Navigator
      initialRouteName="FitnessIntegrationScreen"
      screenOptions={{animationEnabled: false}}>
      <FitnessStack.Screen
        name={'FitnessIntegrationScreen'}
        component={FitnessIntegrationScreen}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
      <FitnessStack.Screen
        name={'FitnessConnectionScreen'}
        component={FitnessConnectionScreen}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: Colors.TRANSPARENT,
            elevation: 0,
            borderWidth: 0,
            borderColor: Colors.BLACK2,
          },
        })}
      />
    </FitnessStack.Navigator>
  );
};

export default Fitness;
