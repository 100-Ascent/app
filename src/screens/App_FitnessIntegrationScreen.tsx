import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, ToastAndroid, View} from 'react-native';
import { isIOS } from 'react-native-elements/dist/helpers';
import Icon from 'react-native-elements/dist/icons/Icon';
import {TextInput} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import Background from '../components/Background/StyledBackground';
import StyledButton from '../components/Button/StyledButton';
import ConnectionCard from '../components/Cards/FitnessCards/ConnectionCard';
import RNLoader from '../components/Loader/RNLoader';
import Text16Bold from '../components/Text/Text16Bold';
import {AppState} from '../redux';
import {RootNavProp} from '../routes/RootStackParamList';
import { shadowStyles } from '../styles/Global/styles';
import {EXTERNAL_CONNECTIONS, REQUEST_NEW_CONNECTION} from '../utils/apis/endpoints';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'FitnessIntegrationScreen'>;
}

const FitnessIntegrationScreen: React.FC<Props> = ({navigation}) => {
  //State variables
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const [data, setData] = useState([]);
  const [newConnection, setNewConnection] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const isFocused = useIsFocused();

  //Async functions
  const getConnectionData = async () => {
    setLoading(true);
    await axios
      .get(EXTERNAL_CONNECTIONS, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log('failed in connections api');
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getConnectionData();
    setError(false);
    setNewConnection('');
  }, [isFocused]);


  const handleNewConnection = async () => {
    setError(false);
    if(newConnection.length === 0){
      ToastAndroid.show('Please enter a valid connection value',ToastAndroid.SHORT);
      setError(true);
    }else{
      setError(false);
      await axios.post(REQUEST_NEW_CONNECTION, { 
        connection: newConnection 
      })
      .then(res=>{
        ToastAndroid.show("We heard you! Our super fast team will be working on onboarding " + newConnection + " soon. Stay tuned ...", ToastAndroid.LONG);
        setNewConnection('');
        console.log(res.data);
      })
      .catch(err=>{
        console.log("Error");
        setNewConnection('');
      })
    }
  }


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
          onPress={() => navigation.navigate('HomeScreen')}
          tvParallaxProperties={undefined}
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
                {data.map((val, idx) => {
                  return (
                    <ConnectionCard
                      data={val}
                      onPress={() =>
                        navigation.navigate('FitnessConnectionScreen', {
                          data: val,
                        })
                      }
                    />
                  );
                })}
                <View style={{padding: 15}} />

                <View
                  style={[{
                    marginHorizontal: 10,
                    paddingBottom: 15,
                    paddingHorizontal: 15,
                    borderRadius: 10,
                    backgroundColor: '#f8f8f8',
                    elevation: 10,                       
                  }, shadowStyles.shadowElevation3 ]}>
                  <View style={{flex: 1, paddingTop: 10 }}>
                    <Text16Bold
                      text={"Didn't find your preferred fitness app/band for connecting? Suggest One!"}
                      textColor={Colors.TEXTDARK}
                      textStyle={{ textAlign: 'justify' }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginTop: isIOS? 10 : 0,
                    }}>
                    <View style={{flex: 2}}>
                      <TextInput
                        value={newConnection}
                        placeholder={'App Name (e.g. Garmin) '}
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
                          borderColor: error ? Colors.RED : Colors.TEXTDARK ,
                        }}
                        onChangeText={(text)=>{
                          setError(false);
                          setNewConnection(text)}}
                      />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'}}>
                      <StyledButton text="Submit" onPress={handleNewConnection}/>
                    </View>
                  </View>
                </View>
              </View>
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default FitnessIntegrationScreen;
