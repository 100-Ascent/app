import {
  Dimensions,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  GOOGLE_FITNESS_SYNC,
  UPDATE_EMAIL,
  USER_ACTIVITY_DATA,
  USER_DETAILS,
  VERIFY_EMAIL,
} from '../utils/apis/endpoints';
import React, {useEffect, useState} from 'react';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {setData, setEmailVerifiedData} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';

import ActivitiesToolTip from '../components/Tooltip/ActivitiesToolTip';
import {AppState} from '../redux';
import Background from '../components/Background/StyledBackground';
import {Colors} from '../utils/colors';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import DistanceComponent from '../components/DistanceComponent/DistanceComponent';
import EmptyState from '../../assets/icons/empty_state.svg';
import ErrorIcon from '../../assets/modal-icons/error-icon.svg';
import FastImage from 'react-native-fast-image';
import FloatingActionButton from '../components/Button/FloatingActionButton';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import NotificationIcon from '../../assets/modal-icons/notification-icon.svg';
import PreferredTimePickerCard from '../components/Cards/NotificationCards/PreferredTimePickerCard';
import ProfileInput from '../components/Input/ProfileInput';
import {ProfileInputFieldTypes} from '../utils/constants/constants';
import RNLoader from '../components/Loader/RNLoader';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import StatsCard from '../components/Cards/StatsCard';
import SyncNowButton from '../components/Button/SyncNowButton';
import Text12Bold from '../components/Text/Text12Bold';
import Text16Bold from '../components/Text/Text16Bold';
import Text16Normal from '../components/Text/Text16Normal';
import Text28 from '../components/Text/Text28';
import VerifyEmailIcon from '../../assets/modal-icons/verify-email-icon.svg';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import moment from 'moment';
import myProfileStyles from '../styles/MyProfileScreen/myprofile';
import parsePhoneNumber from 'libphonenumber-js';
import {useIsFocused} from '@react-navigation/native';

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
  

  const [isSyncDataDone,setPopUpAfterSyncData] = useState(false);
  const [ isSyncSuccess ,setPopUpIconSuccess] = useState(true);
  const [popUpMessage, setPopUpMessage]= useState("");

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
        console.log(data);
        setPreferredConnection(data.preferred_connection);
        dispatch(setEmailVerifiedData(data['is_verified_email']));
        dispatch(setData(data));
        setUserData(data);
        getToken();
        pullLoader === false ? setLoading(false) : setRefreshing(false);
      })
      .catch(err => {
        console.log('failed in user data');
        console.log(err);
        pullLoader === false ? setLoading(false) : setRefreshing(false);
      });
  };

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
            color={'#565656'}
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
            <RNLoaderSimple/>
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
                  { userData["college"] === undefined ? null : <ProfileInput
                    type={ProfileInputFieldTypes.INSTITUTION}
                    iconName="public"
                    textField={ userData["college"]["name"] + ", " + userData["college"]["city"] }  
                  />}
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

                {/*
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
                  </View> : null} */}
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
              <View style={{padding: 70}} />
            </ScrollView>
          )}
          {/* <View style={{position: 'absolute', bottom: 20, right: 20}}>
            <FloatingActionButton
              onPress={() => {
                navigation.navigate('AddActivityScreen');
              }}
            />
          </View> */}
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
