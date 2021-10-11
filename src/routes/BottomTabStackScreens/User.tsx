import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from '../RootStackParamList';
import {Colors} from '../../utils/colors';
import {NavigationDrawerStructure} from '../AppStack';
import CommunityScreen from '../../screens/App_CommunityScreen';
import ShowcaseScreen from '../../screens/App_ShowcaseScreen';
import Text16Normal from '../../components/Text/Text16Normal';
import { View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';

const UserStack = createStackNavigator<RootStackParamList>();

const User = ({navigation}) => {
  return (
    <UserStack.Navigator
      initialRouteName="ShowcaseScreen"
      screenOptions={{animationEnabled: false}}>
      <UserStack.Screen
        component={ShowcaseScreen}
        name={'ShowcaseScreen'}
        options={({route}) => ({
          headerTitle: () => (
            <View style={{alignItems: 'center'}}>
              <Text16Normal
                text="Showcase"
                textColor={Colors.TEXTDARK}
              />
            </View>
          ),
          headerLeft: () => (
            <View style={{marginLeft: 10}}>
              <Icon
                name="arrow-back"
                type="ionicons"
                size={30}
                // onPress={() => navigation.pop()}
              />
            </View>
          ),
          headerRight: () => (
            <View style={{marginRight: 10}}>
              <Icon name="share" type="materialicons" size={30} />
            </View>
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
