import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import Text20 from '../components/Text/Text20';
import Text16Bold from '../components/Text/Text16Bold';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import Background from '../components/Background/StyledBackground';
import PreferredTimePickerCard from '../components/Cards/NotificationCards/PreferredTimePickerCard';
import axios from 'axios';
import { Colors } from '../utils/colors';
import { USER_SETTINGS, USER_STREAK_DATA } from '../utils/apis/endpoints';
import { RootNavProp } from '../routes/RootStackParamList';
import Icon from 'react-native-elements/dist/icons/Icon';
import SyncNowButton from '../components/Button/SyncNowButton';
import StatsCard from '../components/Cards/StatsCard';
import { useSelector } from 'react-redux';
import { AppState } from '../redux';
import auth from '@react-native-firebase/auth';

interface Props {
  navigation: RootNavProp<'HomeScreen'>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {

  const user = useSelector((state: AppState) => state.rootStore.user);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isToday,setIsToday] = useState(false);
  const [preferredConnection, setPreferredConnection] = useState(user['preferred_connection']);
  const [token, setToken] = useState('');

  const isFocused = useIsFocused();
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const PREFERRED_WORKOUT_TIME_HEADING = "My preferred workout time";
  const SYNC_NOW = "Sync Now";
  const MY_STREAK = "My Streak";
  
  const getToken = async () => {
    const token = await auth().currentUser.getIdToken();
    setToken(token);
  };

  const callToGetSettingData = async () => {
    await axios
      .get(USER_SETTINGS)
      .then( async res=>{
        let { data } = res.data;
        setSettings(data);
        await callToGetStreakData();
      })
      .catch(err=>{
        console.log(err);
        setLoading(false);
      })
  }

  const callToGetStreakData = async () => {

    const headers = { 'X-CONTEXT-ID': contextId }; 
    await axios
      .get(USER_STREAK_DATA, { headers })
      .then(async res => {
        const { streak } = res.data.data;
        const { is_today } = res.data.data;
        if(res.data.success){
          setIsToday(is_today);
          setStreak(streak);
          setLoading(false);
        }else{
          setStreak(0);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('Failed in Streak data');
        console.log(err);
      });
  }

  useEffect(() => {
    getToken();
    callToGetSettingData();
  }, [isFocused]);

  const handleRedirectToConnect = () => navigation.navigate('FitnessIntegrationScreen');

  

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        { loading ? <RNLoaderSimple /> : (
            <ScrollView
              scrollEnabled
              style={{flexGrow: 1}}
              contentContainerStyle={{flexGrow: 1}}>
              <View style={{flex: 1, paddingHorizontal: 15}}>
                
                <View style={{ paddingHorizontal: 0 }}>
                  <Text20 text={"Hi " + user['first_name'] + ","} textColor={Colors.TEXTDARK} />
                </View>

                {/* Stats card */}
                <Text16Bold
                  text={MY_STREAK}
                  textColor={Colors.TEXTDARK}
                  containerStyle={{paddingHorizontal: 15, marginTop: 25}}
                />
                <View style={{ marginTop: 20 }}/>
                <StatsCard streak={streak} isToday={isToday} />



                {/* Preferred Workout Time */}
                <Text16Bold
                  text={PREFERRED_WORKOUT_TIME_HEADING}
                  textColor={Colors.TEXTDARK}
                  containerStyle={{paddingHorizontal: 15, marginTop: 25}}
                />
                <View style={{ marginTop: 15 }}>
                  <PreferredTimePickerCard
                    isWorkoutNotification={ settings.length > 0 ? settings[0]["data"].find(obj => obj.name.toLowerCase().includes("workout")).active : false }
                    prefer_time={user['prefer_time']}
                    handleGoToSettings={() =>
                      navigation.navigate('SettingScreen')
                    }
                  />
                </View>


                {/* Sync Now */}
                <View style={{ marginTop: 35, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                  <Text16Bold text={SYNC_NOW} textColor={Colors.TEXTDARK} containerStyle={{flex: 1}}/>
                  <TouchableOpacity onPress={() => { navigation.navigate('FitnessIntegrationScreen') }}>
                    <Icon name='info' type='feather' color={Colors.BUTTON_DARK}/>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 20 }}/>              
                <SyncNowButton 
                    data={preferredConnection} 
                    token={token} 
                    handleRedirectToConnect={handleRedirectToConnect} 
                    handleSyncData={()=>{}}
                    isConnected = {Object.keys(preferredConnection).length !== 0 }
                  />     
               
                
              </View>
              <View style={{ padding: 80 }} />
            </ScrollView>
          )}
      </Background>
    </SafeAreaView>
  );
};

export default HomeScreen;
