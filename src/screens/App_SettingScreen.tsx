import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
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
import Text14 from '../components/Text/Text14';
import Text16Normal from '../components/Text/Text16Normal';
import Text18 from '../components/Text/Text18';
import {RootNavProp} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import VersionNumber from 'react-native-version-number';
import ToggleCard from '../components/Cards/NotificationCards/ToggleCard';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import { getCurrentEnvironmemnt } from '../utils/constants/constants';

interface Props {
  navigation: RootNavProp<'SettingScreen'>;
}

const SettingScreen: React.FC<Props> = ({navigation}) => {
  //State variables
  const isFocused = useIsFocused();
  const [settings, setSettings] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const toggleSwitch = async (group: string, idx: number) => {
    let groupIndex = settings.findIndex(obj=>obj.group==group);
    let newData = [...settings[groupIndex]['data']];
    newData[idx].active = !settings[groupIndex]['data'][idx].active;
    settings[groupIndex]['data'] = newData;

    callToToggleSwitch(settings[groupIndex]['data'][idx].id);
    setSettings([...settings]);
    
  } 

  const callToToggleSwitch = async (id) => {
    await axios
      .post('/api/user/settings', {
        settings_id : id
      })
      .then(res=>{
        return res.data.success;
      })
      .catch(err=>{
        return false;
      })
  }

  //Async functions
  const callToGetSettingData = async () => {
    setLoading(true);
    await axios
      .get('/api/user/settings')
      .then(res=>{
        let data = res.data.data;
        setSettings(data);
        setLoading(false);
      })
      .catch(err=>{
        console.log(err);
        setLoading(false);
      })
  }

  useEffect(()=>{
    callToGetSettingData();
  },[]);

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
          onPress={() => navigation.navigate('HomeScreen')}
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
              <View style={{flex: 1}}>
                {settings.map((val, idx) => {
                  return (
                    <View style={{}} key={idx}>
                      <TouchableOpacity activeOpacity={1} onPress={ true? ()=>{} : ()=>{ navigation.navigate('ToggleSettingScreen', { data : val })}}>
                      <View style={{ marginVertical: 10, backgroundColor: true? Colors.TRANSPARENT : "rgba(231,58,64,0.05)", paddingLeft: 15, paddingVertical: 2 }}>
                        <Text18
                          text={val.group}
                          textColor={ true? Colors.TEXTDARK : Colors.POPUP_RED}
                          textStyle={{ fontFamily: "Quicksand-SemiBold" }}
                        />                        
                      </View>
                      </TouchableOpacity>
                      

                      {/* This is to be removed later */}
                      <View style={{ paddingHorizontal: 15 }}>
                      <ToggleCard data={val.data} toggleSwitch={toggleSwitch} />
                      </View>
                      
                      {/* {val.data.map((value, id) => {
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
                      })} */}
                    </View>
                  );
                })}
              </View>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <View style={{padding:20}}/>
                <Text14 
                  text={ ( getCurrentEnvironmemnt().includes('pre-prod') ? "Test " : "" ) + "Version " + VersionNumber.appVersion } 
                  textColor={Colors.TEXTDARK} 
                  textStyle={{ fontFamily: 'Quicksand-SemiBold'}}
                />                
                <View style={{padding:5}}/>
              </View>
              <View style={{padding: 5}} />
            </ScrollView>
          )}
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default SettingScreen;
