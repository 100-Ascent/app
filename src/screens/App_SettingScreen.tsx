import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import Background from '../components/Background/StyledBackground';
import RNLoader from '../components/Loader/RNLoader';
import Text16Normal from '../components/Text/Text16Normal';
import Text18 from '../components/Text/Text18';
import {RootNavProp} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'SettingScreen'>;
}

const SettingScreen: React.FC<Props> = ({navigation}) => {
  //State variables
  const data = [   
    {
      title: 'Notifications',
      subvalues: [{name: 'Notification Settings'}],
    },
    {
      title: 'Default',
      subvalues: [{name: 'Language'}, {name: 'Voice Scan'}],
    },
    {
      title: 'Who Can',
      subvalues: [{name: 'Contact Me'}, {name: 'Use my camera'}],
    },
    {
      title: 'More Information',
      subvalues: [
        {name: 'Privacy Policy'},
        {name: 'Safety Center'},
        {name: 'Terms of Service'},
        {name: 'Other Legal'},
      ],
    },
    {
      title: 'Account Actions',
      subvalues: [{name: 'Clear Cache'}, {name: 'Clear Data'}],
    },
    {
      title: 'Profile',
      subvalues: [{name: 'See Profile'}, {name: 'Log Out'}],
    },
  ];

  //Async functions

  //Component functions
  navigation.setOptions({
    headerTitle: 'Settings',
    headerTitleContainerStyle: {alignItems: 'center'},
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerRight: () => <View style={{marginLeft: 0}} />,
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
          {false ? (
            <RNLoader />
          ) : (
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled">
              <View style={{flex: 1}}>
                {data.map((val, idx) => {
                  return (
                    <View style={{paddingLeft: 15}} key={idx}>
                      <View
                        style={{
                          marginVertical: 10,
                          backgroundColor: 'rgba(200, 244, 189, 0.1)',
                        }}>
                        <Text18
                          text={val.title.toUpperCase()}
                          textColor={Colors.INFO_GREEN}
                        />
                      </View>
                      {val.subvalues.map((value, id) => {
                        return (
                          <View style={{paddingVertical: 10}} key={id}>
                            <TouchableOpacity onPress={()=>{ navigation.navigate('ToggleSettingScreen', { data : val.title })}}>
                              <View>
                                <Text16Normal
                                  text={value.name}
                                  textColor={Colors.TEXTDARK}
                                  
                                />
                              </View>
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
              <View style={{padding: 40}} />
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default SettingScreen;
