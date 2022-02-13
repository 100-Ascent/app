import React, { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { View, SafeAreaView, ScrollView, TouchableOpacity, RefreshControl, ToastAndroid, StyleSheet, Platform } from 'react-native';
import Text20 from '../components/Text/Text20';
import Text16Bold from '../components/Text/Text16Bold';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import Background from '../components/Background/StyledBackground';
import PreferredTimePickerCard from '../components/Cards/NotificationCards/PreferredTimePickerCard';
import axios from 'axios';
import { Colors } from '../utils/colors';
import { GOOGLE_FITNESS_SYNC, USER_DETAILS, USER_SETTINGS, USER_STREAK_DATA } from '../utils/apis/endpoints';
import { RootNavProp } from '../routes/RootStackParamList';
import Icon from 'react-native-elements/dist/icons/Icon';
import SyncNowButton from '../components/Button/SyncNowButton';
import StatsCard from '../components/Cards/StatsCard';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../redux';
import auth from '@react-native-firebase/auth';
import Text18 from '../components/Text/Text18';
import { FONTS } from '../utils/constants/fonts';
import RNLoader from '../components/Loader/RNLoader';
import NotificationIcon from '../../assets/modal-icons/notification-icon.svg';
import ErrorIcon from '../../assets/modal-icons/error-icon.svg';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import { setData, setEmailVerifiedData } from '../redux/action';
import Text24 from '../components/Text/Text24';
import Text24Bold from '../components/Text/Text24Bold';
import Text16Normal from '../components/Text/Text16Normal';
import SessionCard from '../components/Cards/Sessions/SessionCard';
import { isIOS } from 'react-native-elements/dist/helpers';
import { styles } from '../styles/Global/styles';
import JoinInstitutionCard from '../components/Cards/Institution/JoinInstitutionCard';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  navigation: RootNavProp<'HomeScreen'>;
}

const HomeScreen: React.FC<Props> = ({navigation}) => {

  const user = useSelector((state: AppState) => state.rootStore.user);  
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isToday,setIsToday] = useState(false);
  const [token, setToken] = useState('');
  const [session, setSession] = useState({});

  const [isSyncDataDone,setPopUpAfterSyncData] = useState(false);
  const [ isSyncSuccess ,setPopUpIconSuccess] = useState(true);
  const [popUpMessage, setPopUpMessage]= useState("");

  const isFocused = useIsFocused();
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const [toShowInstituteCard, setToShowInstituteCard] = useState(false);

  const PREFERRED_WORKOUT_TIME_HEADING = "My preferred workout time";
  const ASCENT_TALKS = "Ascent Talks!";
  const SELECT_INSTITUTE = "Select Institute";
  const SYNC_NOW = "Sync Now";
  const MY_STREAK = "My Streak";
  const dispatch = useDispatch();

  const getToken = async () => {
    const token = await auth().currentUser.getIdToken();
    setToken(token);
  };

  const callToGetUserDetails = async () => {
    const headers = { 'X-CONTEXT-ID': contextId };
    await axios
      .get(USER_DETAILS, { headers })
      .then(async res => {
        const { data } = res.data;
        setPreferredConnection(data['preferred_connection'])
        dispatch(setEmailVerifiedData(data['is_verified_email']));
        dispatch(setData(data));
      })
      .catch(err => {
        console.log('failed in user data');
        console.log(err);
      });
  };

  const callToGetSessionData = async () => {
    const headers = { 'X-CONTEXT-ID': contextId };
    await axios
      .get("/api/ascent/talks", { headers })
      .then(async res => {
        const { data } = res.data;
        setSession(data.length === 0 ? {} : data[0]);
      })
      .catch(err => {
        console.log('failed in session data');
        console.log(err);
      });
  }

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

  const callToSetInstitutionCard = async () => {
    let toShowInstituteCard = await AsyncStorage.getItem('showIntitutionCard');
    if(toShowInstituteCard === null){
      setToShowInstituteCard(true);
    }else{
      setToShowInstituteCard(false);
    }
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Quick Actions',
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerTitleContainerStyle: {alignItems: 'center'},
      headerRight: () => <View style={{marginLeft: 10}} />,
    });
    setLoading(true);
    callToSetInstitutionCard();
    callToGetUserDetails();
    callToGetSessionData();
    getToken();
    callToGetSettingData();
  }, [isFocused]);

  const [preferredConnection, setPreferredConnection] = useState(user? user['preferred_connection'] : {});
  const handleRedirectToConnect = () => navigation.navigate('FitnessIntegrationScreen');

  const handleSyncData = async () => {

    let date_now = new Date();
    let date_now_adjusted = date_now.setHours(0,0,0,0)/1000;
    if(preferredConnection['sync_count'] === 0 ){
      setPopUpAfterSyncData(true);
      setPopUpMessage("No syncs available")
      setPopUpIconSuccess(false);      
    }else{
      ToastAndroid.show("Syncing data", ToastAndroid.LONG);
      await axios
      .get(GOOGLE_FITNESS_SYNC, {
        params : preferredConnection['last_sync_date'] === null ? {
          start_date: date_now_adjusted
        } : {}, headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {          
          if(res.data.success){                 
            setLoading(true);
            getToken();
            callToGetUserDetails();
            callToGetSettingData();
            setPopUpMessage(res.data.message);
            setPopUpIconSuccess(true);
            setPopUpAfterSyncData(true);
          }else{
            setPopUpIconSuccess(false);
            setPopUpMessage(res.data.message === undefined ? "Oops! Something Went Wrong" : res.data.message );  
            setPopUpAfterSyncData(true);
          }
      })
      .catch(err => {
        ToastAndroid.show("Error syncing the data", ToastAndroid.SHORT);
        console.log('Error in syncing');
        console.log(err);
      });
    }
    
  }

  const handleInstitutionPress = async () => {
    navigation.navigate('InstitutionScreen', { selectedId: -1 });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        { loading ? <RNLoaderSimple /> : (
            <ScrollView
              scrollEnabled
              style={{flexGrow: 1}}
              contentContainerStyle={{flexGrow: 1}}>
              <View style={{flex: 1, paddingHorizontal: 15}}>
                
                <View style={{ paddingHorizontal: 10, marginTop: 20, marginBottom: 10 }}>
                  <Text24Bold text={"hello, " + user['first_name'] + " 👋🏻"} textColor={Colors.TEXTDARK} textStyle={FONTS.BOLD} />
                  <Text16Normal text={"Here are some quick actions for you"} textColor={Colors.TEXTDARK} textStyle={FONTS.SEMIBOLD} />
                </View>

                {/* Institution Card */}
                { toShowInstituteCard ? user['college'] === undefined ? <Text16Bold
                    text={SELECT_INSTITUTE}
                    textColor={Colors.TEXTDARK}
                    containerStyle={{paddingHorizontal: 15, marginTop: 25}}
                  /> : <View/> : <View/> }
                { toShowInstituteCard ? user['college'] === undefined ? <View style={{ marginTop: 15 }}>
                  <JoinInstitutionCard onPress={handleInstitutionPress} callToSetInstitutionCard={callToSetInstitutionCard}/>
                  </View> : <View/> : <View/> }

                {/* Sync Now */}
                <View style={{ marginTop: 25, paddingHorizontal: 15, flexDirection: 'row', alignItems: 'center' }}>
                  <Text16Bold text={SYNC_NOW} textColor={Colors.TEXTDARK} containerStyle={{flex: 1}}/>
                  <TouchableOpacity onPress={() => { navigation.navigate('FitnessIntegrationScreen') }}>
                    <Icon name='info' type='feather' color={Colors.BUTTON_DARK} tvParallaxProperties={undefined}/>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 5 }}/>              
                <SyncNowButton 
                    data={preferredConnection} 
                    token={token} 
                    handleRedirectToConnect={handleRedirectToConnect} 
                    handleSyncData={handleSyncData}
                    isConnected = {Object.keys(preferredConnection).length !== 0 }
                  />     
               


                {/* Stats card */}
                <Text16Bold
                  text={MY_STREAK}
                  textColor={Colors.TEXTDARK}
                  containerStyle={{paddingHorizontal: 15, marginTop: 25}}
                />
                <View style={{ marginTop: 15 }}/>
                <StatsCard streak={streak} isToday={isToday} />



               {/* Preferred Workout Time */}
               <Text16Bold
                  text={PREFERRED_WORKOUT_TIME_HEADING}
                  textColor={Colors.TEXTDARK}
                  containerStyle={{paddingHorizontal: 15, marginTop: 25}}
                />
                <View style={[{ marginTop: 15 }, Platform.OS==="ios" ? styles.shadowElevation3: {}]}>
                  <PreferredTimePickerCard
                    isWorkoutNotification={ settings.length > 0 ? settings[0]["data"].find(obj => obj.name.toLowerCase().includes("workout")).active : false }
                    prefer_time={user['prefer_time']}
                    handleGoToSettings={() =>
                      navigation.navigate('SettingScreen')
                    }
                  />
                </View>
                
                <View>
                  <Text16Bold
                    text={ASCENT_TALKS}
                    textColor={Colors.TEXTDARK}
                    containerStyle={{paddingHorizontal: 15, marginTop: 25}}
                  />
                  <View style={{ paddingHorizontal: 15, marginTop: isIOS ? 30 : 15 }}>
                    { Object.keys(session).length === 0 ? null :  <SessionCard session={session}/> }
                  </View>
                </View>

                
              </View>
              <View style={{ padding: 80 }} />
              <CustomPopUp
                icon={ isSyncSuccess ? <NotificationIcon /> : <ErrorIcon/>}
                visible={isSyncDataDone}
                onOk={() => setPopUpAfterSyncData(false)}
                isCancelable={false}
                oKText={'OKAY'}
                header={popUpMessage}
                description={""}
                isCloseButton={false}   
                isDescriptionLong={false} 
                />
            </ScrollView>
          )}
          
      </Background>
    </SafeAreaView>
  );
};

export default HomeScreen;
