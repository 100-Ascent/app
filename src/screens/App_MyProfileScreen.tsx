import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ToastAndroid,
  RefreshControl,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../redux';

import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import Background from '../components/Background/StyledBackground';
import ProfileInput from '../components/Input/ProfileInput';
import Text28 from '../components/Text/Text28';
import Text16Normal from '../components/Text/Text16Normal';
import NotificationIcon from '../../assets/modal-icons/notification-icon.svg';
import ErrorIcon from '../../assets/modal-icons/error-icon.svg';

import {
  GOOGLE_FITNESS_SYNC,
  UPDATE_EMAIL,
  USER_ACTIVITY_DATA,
  USER_DETAILS,
  VERIFY_EMAIL,
} from '../utils/apis/endpoints';
import {Colors} from '../utils/colors';
import myProfileStyles from '../styles/MyProfileScreen/myprofile';
import {setData, setEmailVerifiedData} from '../redux/action';
import RNLoader from '../components/Loader/RNLoader';
import {ProfileInputFieldTypes} from '../utils/constants/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import VerifyEmailIcon from '../../assets/modal-icons/verify-email-icon.svg';
import {useIsFocused} from '@react-navigation/native';
import parsePhoneNumber from 'libphonenumber-js';
import Text12Bold from '../components/Text/Text12Bold';
import FloatingActionButton from '../components/Button/FloatingActionButton';
import Text16Bold from '../components/Text/Text16Bold';
import DistanceComponent from '../components/DistanceComponent/DistanceComponent';

import EmptyState from '../../assets/icons/empty_state.svg';
import StatsCard from '../components/Cards/StatsCard';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';
import SyncNowButton from '../components/Button/SyncNowButton';
import PreferredTimePickerCard from '../components/Cards/NotificationCards/PreferredTimePickerCard';
import ActivitiesToolTip from '../components/Tooltip/ActivitiesToolTip';
import moment from 'moment';


interface Props {
  navigation: RootNavProp<'MyProfileScreen'>;
  route: RootNavRouteProps<'MyProfileScreen'>;
}

const MyProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [preferredConnection, setPreferredConnection] = useState({});
  const [token, setToken] = useState('');
  const [verifyEmailPopUpVisible, setVerifyEmailPopUp] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [streak, setStreak] = useState(0);
  const [isToday,setIsToday] = useState(false);
  const [isSyncDataDone,setPopUpAfterSyncData] = useState(false);
  const [ isSyncSuccess ,setPopUpIconSuccess] = useState(true);
  const [popUpMessage, setPopUpMessage]= useState("");
  const [settings, setSettings] = useState([]);

  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  const [refreshing, setRefreshing] = React.useState(false);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    callToGetUserDetails(true);
  }, []);


  const getToken = async () => {
    const token = await auth().currentUser.getIdToken();
    setToken(token);
  };

  const callToGetUserDetails = async (pullLoader = false) => {
    pullLoader === false ? setLoading(true) : setRefreshing(true);
    await axios
      .get(USER_DETAILS, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data.data;
        setPreferredConnection(data.preferred_connection);
        dispatch(setEmailVerifiedData(data['is_verified_email']));
        dispatch(setData(data));
        setUserData(data);
        getToken();
        await callToGetUserActivityData();
        pullLoader === false ? setLoading(false) : setRefreshing(false);
      })
      .catch(err => {
        console.log('failed in user data');
        console.log(err);
        pullLoader === false ? setLoading(false) : setRefreshing(false);
      });
  };

  const callToGetUserActivityData = async () => {
    setLoading(true);
    await axios
      .get(USER_ACTIVITY_DATA, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data.data;
        if (res.data.success) {          
          setActivityData(data);
          await callToGetStreakData();
        } else {
          setActivityData([]);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('failed in activity data yohoooooooo');
        console.log(err);
      });
  };

  const callToGetStreakData = async () => {
    setLoading(true);
    await axios
      .get("/api/user/activity/streak", {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data.data.streak;
        const isToday = res.data.data.is_today;
        if(res.data.success){
          setIsToday(isToday);
          setStreak(data);
          await callToGetSettingData();
        }else{
          setStreak(0);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('failed in Streakkk data yohoooooooo');
        console.log(err);
      });
  }

  const callToGetSettingData = async () => {
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


  useEffect(() => {
    callToGetUserDetails(false);
  }, [isFocused]);

  const handleInfoPressed = () => {
    setVerifyEmailPopUp(true);
  };

  const handleResendEmail = () => {
    axios
      .get(VERIFY_EMAIL)
      .then(async res => {
        if (res.data.data.success) {
          setVerifyEmailPopUp(false);
          ToastAndroid.show(
            'Verification link sent successfully!',
            ToastAndroid.SHORT,
          );
        }
      })
      .catch(err => {
        ToastAndroid.show(
          'Something went wrong. Please try again!',
          ToastAndroid.SHORT,
        );
        console.log('failed');
        console.log(err);
      });
  };

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
            callToGetUserDetails();
            setPopUpMessage(res.data.message);    
            setPopUpIconSuccess(true);
            setPopUpAfterSyncData(true);
          }else{
            setPopUpIconSuccess(false);
            setPopUpMessage(res.data.message);  
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

  const handleRedirectToConnect = () => navigation.navigate('FitnessIntegrationScreen');

  navigation.setOptions({
    headerTitle: 'My Profile',
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerTitleContainerStyle: {alignItems: 'center'},
    headerRight: () => (
      <View style={{marginRight: 15, flexDirection: 'row'}}>
        <TouchableOpacity onPress={()=>navigation.navigate('LeaderboardScreen')}> 
          <Image
            source={require('../../assets/icons/leaderboard/podium.png')}
            style={{
              width: 25,
              height: 25,
            }}
          />
        </TouchableOpacity>
        
        <View style={{padding: 5}}/>
        <TouchableOpacity>
          <Icon
            name="edit"
            size={25}
            onPress={() =>
              navigation.navigate('EditMyProfileScreen', {data: userData})
            }
          />
        </TouchableOpacity>
      </View>
      
    ),
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <>
          {loading ? (
            <RNLoader />
          ) : (
            <ScrollView
              scrollEnabled
              style={{flexGrow: 1}}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              contentContainerStyle={{flexGrow: 1}}>
              <View style={{flex: 1, paddingHorizontal: 15}}>
                <View style={myProfileStyles.profileWrapper}>
                  {userData['is_verified_email'] ? (
                    <View />
                  ) : (
                    <View
                      style={{
                        backgroundColor: '#F9EEA0',
                        borderRadius: 5,
                        width: '100%',
                        marginBottom: 20,
                        marginTop: -10,
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: 7,
                      }}>
                      <Icon
                        name="warning"
                        size={14}
                        color="#E4252D"
                        style={{marginRight: 5}}
                      />
                      <TouchableOpacity
                        onPress={() => {
                          handleInfoPressed();
                        }}>
                        <Text12Bold
                          text="Your email id is not yet verified. Verify Now!"
                          textColor={Colors.TEXTDARK}
                          textStyle={{textDecorationLine: 'underline'}}
                        />
                      </TouchableOpacity>
                    </View>
                  )}
                  <View style={myProfileStyles.circularImage}>
                    <FastImage
                        style={{ width: 110, height: 110, borderRadius: 110 }}
                          source={{
                            uri: userData['image_id'],
                            priority: FastImage.priority.high,
                            headers: {
                              Authorization: token,
                            },
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                  </View>
                  <View style={{marginTop: 10}}>
                    <Text28
                      text={
                        userData['first_name'] + ' ' + userData['last_name']
                      }
                      textColor={Colors.TEXTDARK}
                    />
                  </View>
                  <Text16Normal
                    text={
                      'Member since ' + moment(new Date(userData['created_at'])).format('ll')
                    }
                    textColor={Colors.TEXTDARK}
                  />
                </View>                
                <View style={myProfileStyles.menuWrapper}>
                  <ProfileInput
                      type={ProfileInputFieldTypes.USERNAME}
                      iconName="red"
                      isUsername={userData['username']?.length !== 0}
                      textField={userData['username']}
                    />
                  <ProfileInput
                    type={ProfileInputFieldTypes.EMAIL}
                    iconName="email"
                    textField={userData['email']}
                    isEmailVerified={userData['is_verified_email']}
                    onInfoPressed={handleInfoPressed}
                  />
                  <ProfileInput
                    type={ProfileInputFieldTypes.PHONE}
                    iconName="phone"
                    isPhone={true}
                    textField={parsePhoneNumber(
                      userData['phoneNumber'],
                    ).formatInternational()}
                  />
                  <ProfileInput
                    type={ProfileInputFieldTypes.COUNTRY}
                    iconName="public"
                    textField={
                      userData['country'].length === 0
                        ? 'India'
                        : userData['country']
                    }
                  />
                  {userData['address'].length === 0 ? (
                    <View />
                  ) : (
                    <ProfileInput
                      type={ProfileInputFieldTypes.ADDRESS}
                      iconName="home"
                      textField={
                        userData['address'].length === 0
                          ? 'Hogwarts Castle, Highlands'
                          : userData['address'] +
                            ', ' +
                            userData['city'] +
                            ', ' +
                            userData['state'] +
                            ' - ' +
                            userData['pincode']
                      }
                      isAddressFilled={userData['address'].length !== 0}
                    />
                  )}
                  {userData['gender'] == 'Rather not say' ||
                  userData['gender'] == 'Rather Not Say' ? (
                    <View />
                  ) : (
                    <ProfileInput
                      type={ProfileInputFieldTypes.GENDER}
                      iconName="user"
                      iconType="feather"
                      textField={userData['gender']}
                    />
                  )}
                  {userData['dob'].length === 0 ? (
                    <View />
                  ) : (
                    <ProfileInput
                      type={ProfileInputFieldTypes.DOB}
                      iconName="cake"
                      isDOBFilled={userData['dob'].length !== 0}
                      textField={
                        userData['dob'].length === 0
                          ? '29/02/2030'
                          : userData['dob']
                      }
                    />
                  )}                  
                </View>

                <View style={{flex: 1, marginHorizontal: 15, marginTop: 25 }}>
                    <Text16Bold
                        text="My preferred workout time"
                        textColor={Colors.TEXTDARK} textStyle={undefined} />
                  </View>
                <View style={{ marginTop: 20 }}>
                  <PreferredTimePickerCard
                    isWorkoutNotification={ settings.length > 0 ? settings[0]["data"].find(obj => obj.name.toLowerCase().includes("workout")).active : false } 
                    prefer_time={userData['prefer_time']}
                    handleGoToSettings={() => navigation.navigate('SettingScreen') }
                    />
                </View>


                <View style={{marginTop: 35, marginHorizontal: 20, flexDirection: 'row', alignItems: 'center'}}>
                  <View style={{flex: 1}}>
                    <Text16Bold
                        text="Sync Now"
                        textColor={Colors.TEXTDARK} textStyle={undefined} />
                  </View>
                  <TouchableOpacity onPress={() => {navigation.navigate('FitnessIntegrationScreen')}}>
                    <Icon name='info' type='feather' color={Colors.BUTTON_DARK}/>
                  </TouchableOpacity>
                </View>
                <View style={{marginTop: 20 }}/>              
                <SyncNowButton 
                    data={preferredConnection} 
                    token={token} 
                    handleRedirectToConnect={handleRedirectToConnect} 
                    handleSyncData={handleSyncData}
                    isConnected = {Object.keys(preferredConnection).length !== 0 }
                  />                


                <View style={{marginTop: 35, marginHorizontal: 20, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text16Bold
                        text="My Streak"
                        textColor={Colors.TEXTDARK} textStyle={undefined} />
                  </View>
                </View>
                <View style={{marginTop: 20 }}>
                 <StatsCard streak={streak} isToday={isToday} />
                </View>

                <View style={{marginTop: 35, marginHorizontal: 20, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text16Bold
                        text="All Activities"
                        textColor={Colors.TEXTDARK} textStyle={undefined} />
                  </View>
                  <ActivitiesToolTip color={Colors.INFO_GREY} iconSize={28} />
                </View>
                {
                  activityData.length < 1 ? (
                    <View style={{marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <EmptyState />
                      <Text16Bold text={'No Activity Found!'} textColor={Colors.TEXTDARK} textStyle={{marginTop: -30}} />
                      <Text12Bold text={'Click on + icon to add your first activity'} textColor={'grey'} />
                    </View>
                  ) : (
                    <View />
                  )
                }
                <View style={{marginHorizontal: 10}}>
                  <DistanceComponent setLoading={setLoading} setActivityData={setActivityData} setStreak={setStreak} setIsToday={setIsToday} setRefreshing={setRefreshing} distanceData={ activityData.length === 0 ? activityData : activityData.slice(0,3)} />
                </View>
                { activityData.length > 3 ? <View style={{flex: 1, alignItems: 'flex-end', marginRight: 15, marginTop: 20 }}>
                    <TouchableOpacity onPress={()=> 
                        navigation.navigate('DataInListViewScreen',{ data: activityData }) }>
                    <Text16Bold
                        text="See All Activities"
                        textColor={Colors.TEXTDARK} textStyle={{textDecorationLine: 'underline'}} />
                    </TouchableOpacity>
                  </View> : null}
              </View>
              <CustomPopUp
                icon={<VerifyEmailIcon />}
                visible={verifyEmailPopUpVisible}
                onOk={handleResendEmail}
                isCancelable={true}
                onCancel={() => {
                  navigation.navigate('EditMyProfileScreen', {data: userData});
                  setVerifyEmailPopUp(false);
                }}
                oKText={'Resend link'}
                cancelText={'Edit Email'}
                header={'Verify E-Mail'}
                description={
                  'Please verify your email by clicking on the link sent to'}
                descriptionOptional={userData['email']}
                isCloseButton={true}
                closeButtonPress={() => setVerifyEmailPopUp(false)}
              />
              <View style={{padding: 50}} />
            </ScrollView>
          )}
          <View style={{position: 'absolute', bottom: 20, right: 20}}>
            <FloatingActionButton
              onPress={() => {
                navigation.navigate('AddActivityScreen');
              }}
            />
          </View>
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
        </>
      </Background>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
