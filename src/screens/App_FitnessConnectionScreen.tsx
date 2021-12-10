import axios from 'axios';
import moment from 'moment';
import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import {authorize, revoke} from 'react-native-app-auth';
import Icon from 'react-native-elements/dist/icons/Icon';
import {useSelector} from 'react-redux';
import Background from '../components/Background/StyledBackground';
import StyledButton from '../components/Button/StyledButton';
import ConnectionCard from '../components/Cards/FitnessCards/ConnectionCard';
import NotesCard from '../components/Cards/FitnessCards/NotesCard';
import RNLoader from '../components/Loader/RNLoader';
import Text16Bold from '../components/Text/Text16Bold';
import Text16Normal from '../components/Text/Text16Normal';
import {AppState} from '../redux';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {EXTERNAL_CONNECTIONS} from '../utils/apis/endpoints';
import {Colors} from '../utils/colors';
import {GOOGLE_FIT_CONFIG} from '../utils/constants/constants';

interface Props {
  navigation: RootNavProp<'FitnessConnectionScreen'>;
  route: RootNavRouteProps<'FitnessConnectionScreen'>;
}

const FitnessConnectionScreen: React.FC<Props> = ({navigation, route}) => {
  //State variables
  const data = route.params.data;
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const [loading, setLoading] = useState(false);

  //Async functions
  const callToPostAccessToken = async accessToken => {
    const postData = {
      type: data.type,
      refresh_token: accessToken,
    };

    await axios
      .post(EXTERNAL_CONNECTIONS, postData, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        setLoading(false);
        navigation.pop();
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleFitnessConnection = async () => {
    try {
      const result = await authorize(GOOGLE_FIT_CONFIG);
      setLoading(true);
      callToPostAccessToken(result.refreshToken);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFitnessDisconnection = async () => {
    setLoading(true);
    await axios
      .delete(EXTERNAL_CONNECTIONS + "/" + data.type , {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        setLoading(false);
        navigation.pop();
      })
      .catch(err => {
        console.log(err);
      });
  };

  //Component functions
  navigation.setOptions({
    headerTitle: data.display_name,
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
          {loading ? (
            <RNLoader />
          ) : (
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled">
              <View style={{flex: 1, paddingHorizontal: 20}}>
                <ConnectionCard data={data} />
                <View style={{paddingTop: 15, marginTop: 25}} />

                {data.connected ? (
                  <View style={{}}>
                    <View style={{flexDirection: 'row'}}>
                      <View
                        style={{
                          alignItems: 'flex-start',
                          justifyContent: 'center',
                          paddingLeft: 10,
                        }}>
                        <TouchableOpacity activeOpacity={1} onPress={() => {}}>
                          <Icon name="refresh-ccw" type="feather" size={20} />
                        </TouchableOpacity>
                      </View>
                      <View style={{alignItems: 'flex-start', paddingLeft: 10}}>
                        <Text16Bold
                          text={'Last Sync: '}
                          textColor={Colors.TEXTDARK}
                        />
                      </View>
                      <View style={{}}>
                        <Text16Normal
                          text={
                            data.last_sync_date.length === 0
                              ? 'No data synced yet'
                              : moment(data.last_sync_date).format('LLL')
                          }
                          textColor={Colors.TEXTDARK}
                        />
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={{marginHorizontal: 10}}>
                    <StyledButton
                      text={'Connect with ' + data.display_name}
                      buttonStyle={{backgroundColor: Colors.TEXTDARK}}
                      onPress={handleFitnessConnection}
                    />
                  </View>
                )}

                <View style={{padding: 20}} />

                {data.connected ? (
                  <StyledButton
                    text={'Disconnect'}
                    buttonStyle={{
                      backgroundColor: Colors.TEXTDARK,
                      marginHorizontal: 10,
                    }}
                    onPress={handleFitnessDisconnection}
                  />
                ) : null}

                <View style={{padding: 15}} />
                <NotesCard notes={data.notes} />
                <View style={{padding: 30}} />
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default FitnessConnectionScreen;
