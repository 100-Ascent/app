import moment from 'moment';
import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import { authorize } from 'react-native-app-auth';
import Icon from 'react-native-elements/dist/icons/Icon';
import {TextInput} from 'react-native-gesture-handler';
import Background from '../components/Background/StyledBackground';
import StyledButton from '../components/Button/StyledButton';
import ConnectionCard from '../components/Cards/FitnessCards/ConnectionCard';
import Text18 from '../components/Text/Text18';
import {RootNavProp} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'FitnessIntegrationScreen'>;
}

const FitnessIntegrationScreen: React.FC<Props> = ({navigation}) => {
  //State variables
  const data = [
    {
      icon: "logo-google",
      brand: 'Google Fit',
      connected: false,
      date: moment(new Date()).format('llll'),
    },    
  ];

  //Async functions

  //Component functions
  navigation.setOptions({
    headerTitle: '3rd Party Sync',
    headerTitleContainerStyle: {alignItems: 'center'},
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerRight: () => <View style={{marginLeft: 10}} />,
    headerLeft: () => (
      <View style={{marginLeft: 10}}>
        <Icon
          name="arrow-back"
          type="ionicons"
          size={30}
          onPress={() => navigation.navigate('MyProfileScreen')}
        />
      </View>
    ),
  });

  return (
    <View style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 55}
          enabled={Platform.OS === 'ios' ? true : false}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={{flex: 1, paddingHorizontal: 20}}>
              {data.map((val, idx) => {
                return <ConnectionCard data={val} onPress={() => navigation.navigate('FitnessConnectionScreen', { data: val })} />;
              })}
              <View style={{padding: 15}} />

              <View
                style={{
                  borderWidth: 1,
                  marginHorizontal: 10,
                  paddingBottom: 15,
                  borderRadius: 10,
                }}>
                <View style={{flex: 1, paddingLeft: 15, paddingVertical: 10}}>
                  <Text18
                    text={'Request a new connection'}
                    textColor={Colors.TEXTDARK}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    paddingHorizontal: 15,
                    marginTop: 10,
                  }}>
                  <View style={{flex: 4}}>
                    <TextInput
                      placeholder={'e.g. Garmin '}
                      placeholderTextColor={'#A3A3A3'}
                      style={{
                        backgroundColor: Colors.BLACK5,
                        paddingLeft: 10,
                        color: Colors.TEXTDARK,
                        flex: 1,
                        borderRadius: 10,
                        marginRight: 10,
                        paddingVertical: 5,
                        borderWidth: 1,
                      }}
                    />
                  </View>
                  <View style={{flex: 2}}>
                    <StyledButton text="Submit" onPress={()=>{}} />
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default FitnessIntegrationScreen;
