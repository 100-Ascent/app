import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View} from 'react-native';
import { authorize } from 'react-native-app-auth';
import Icon from 'react-native-elements/dist/icons/Icon';
import Background from '../components/Background/StyledBackground';
import StyledButton from '../components/Button/StyledButton';
import ConnectionCard from '../components/Cards/FitnessCards/ConnectionCard';
import NotesCard from '../components/Cards/FitnessCards/NotesCard';
import Text16Bold from '../components/Text/Text16Bold';
import Text16Normal from '../components/Text/Text16Normal';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'FitnessConnectionScreen'>;
  route: RootNavRouteProps<'FitnessConnectionScreen'>;
}

const FitnessConnectionScreen: React.FC<Props> = ({navigation, route}) => {

  //State variables
  const data = route.params.data;

  //Async functions
  const handleFitnessConnection = async () => {
    const config = {
      issuer: 'https://accounts.google.com',
      clientId: '730727502414-bk7k9runddlpv1s0b10n4q1tnfav2o1e.apps.googleusercontent.com',
      redirectUrl: 'com.googleusercontent.apps.730727502414-bk7k9runddlpv1s0b10n4q1tnfav2o1e:/oauth2redirect/google',
      scopes: [ 
        'https://www.googleapis.com/auth/fitness.activity.read',
        // 'https://www.googleapis.com/auth/fitness.activity.write',
    ]
    };
    
    try {
      const result = await authorize(config);
      console.log(result.refreshToken);
      // result includes accessToken, accessTokenExpirationDate and refreshToken
    } catch (error) {
      console.log(error);
    }
  }

  //Component functions
  navigation.setOptions({
    headerTitle: data.brand,
    headerTitleContainerStyle: {alignItems: 'center'},
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerRight: () => <View style={{marginLeft: 10}} />,
    headerLeft: () => (
      <View style={{marginLeft: 10}}>
        <Icon
          name="arrow-back"
          type="ionicons"
          size={30}
          onPress={() => navigation.pop()}
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
            <View style={{flex: 1, paddingHorizontal: 20 }}>

                <ConnectionCard data={data} />
                <View style={{paddingTop: 15, marginTop: 30}} />

                { data.connected ?                 
                    <View style={{ }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ alignItems: 'flex-start', justifyContent: 'center', paddingLeft: 10 }}>
                                <TouchableOpacity activeOpacity={1} onPress={()=>{}}>
                                    <Icon name="refresh-ccw" type="feather" size={20} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ alignItems: 'flex-start',  paddingLeft: 10 }}>
                                <Text16Bold text={"Last Sync: "} textColor={Colors.TEXTDARK} />
                            </View>
                            <View style={{ }}>
                                <Text16Normal text={data.date} textColor={Colors.TEXTDARK} />
                            </View>
                        </View>
                    </View> 
                : <View style={{ marginHorizontal: 10 }}>
                    <StyledButton text={"Connect with " + data.brand} buttonStyle={{ backgroundColor: Colors.TEXTDARK }} onPress={handleFitnessConnection}/>
                </View> }
                <View style={{padding: 20}} />
                <NotesCard/>

            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default FitnessConnectionScreen;
