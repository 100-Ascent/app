import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './RootStackParamList';
import AuthenticateScreen from '../screens/Auth_AuthenticateScreen';

const Stack = createStackNavigator<RootStackParamList>();

const AuthStack = () => {
    return <Stack.Navigator initialRouteName="AuthenticateScreen">
        <Stack.Screen name="AuthenticateScreen" component={AuthenticateScreen} options={{ header: () => null }} />
    </Stack.Navigator>
}

export default AuthStack;