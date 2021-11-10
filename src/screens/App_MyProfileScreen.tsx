import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  ImageBackground,
  ToastAndroid,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../redux';

import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import Background from '../components/Background/StyledBackground';
import ProfileInput from '../components/Input/ProfileInput';
import Text28 from '../components/Text/Text28';
import Text16Normal from '../components/Text/Text16Normal';

import {
  UPDATE_EMAIL,
  USER_ACTIVITY_DATA,
  USER_DETAILS,
  VERIFY_EMAIL,
} from '../utils/apis/endpoints';
import {Colors} from '../utils/colors';
import myProfileStyles from '../styles/MyProfileScreen/myprofile';
import {setEmailVerifiedData} from '../redux/action';
import RNLoader from '../components/Loader/RNLoader';
import {BASEURL, ProfileInputFieldTypes} from '../utils/constants/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import VerifyEmailIcon from '../../assets/modal-icons/verify-email-icon.svg';
import {Link, useIsFocused} from '@react-navigation/native';
import parsePhoneNumber from 'libphonenumber-js';
import Text12Bold from '../components/Text/Text12Bold';
import FloatingActionButton from '../components/Button/FloatingActionButton';
import Text16Bold from '../components/Text/Text16Bold';
import DistanceComponent from '../components/DistanceComponent/DistanceComponent';

import EmptyState from '../../assets/icons/empty_state.svg';
import StatsCard from '../components/Cards/StatsCard';
import FastImage from 'react-native-fast-image';
import auth from '@react-native-firebase/auth';

interface Props {
  navigation: RootNavProp<'MyProfileScreen'>;
  route: RootNavRouteProps<'MyProfileScreen'>;
}

const MyProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('');
  const [verifyEmailPopUpVisible, setVerifyEmailPopUp] = useState(false);
  const [activityData, setActivityData] = useState([]);
  const [streak, setStreak] = useState(0);
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
        dispatch(setEmailVerifiedData(data['is_verified_email']));
        setUserData(data);
        getToken();
        callToGetUserActivityData();
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
          callToGetStreakData();
        } else {
          setActivityData([]);
        }
        setLoading(false);
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
        if(res.data.success){
          setStreak(data);
        }else{
          setStreak(0);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('failed in Streakkk data yohoooooooo');
        console.log(err);
      });
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

  navigation.setOptions({
    headerTitle: 'My Profile',
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerTitleContainerStyle: {alignItems: 'center'},
    headerLeft: () => <View style={{marginLeft: 10}} />,
    headerRight: () => (
      <View style={{marginRight: 15}}>
        <Icon
          name="edit"
          onPress={() =>
            navigation.navigate('EditMyProfileScreen', {data: userData})
          }
        />
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
                        style={{ width: 110, height: 110 }}
                          source={{
                            uri: BASEURL + "/api/user/image/" + userData['image_id'],
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
                      'Member since ' +
                      new Date(userData['created_at']).getFullYear()
                    }
                    textColor={Colors.TEXTDARK}
                  />
                </View>
                <View style={myProfileStyles.menuWrapper}>
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
                <View style={{marginTop: 20 }}>
                 <StatsCard streak={streak} />
                </View>
                <View style={{marginTop: 40, marginHorizontal: 20, flexDirection: 'row'}}>
                  <View style={{flex: 1}}>
                    <Text16Bold
                        text="All Activities"
                        textColor={Colors.TEXTDARK} textStyle={undefined} />
                  </View>
                </View>
                {
                  activityData.length < 1 ? (
                    <View style={{marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                      <EmptyState />
                      <Text16Bold text={'No Activity Found!'} textColor={''} textStyle={{marginTop: -30}} />
                      <Text12Bold text={'Click on + icon to add your first activity'} textColor={'grey'} />
                    </View>
                  ) : (
                    <View />
                  )
                }
                <View style={{marginHorizontal: 10}}>
                  <DistanceComponent setLoading={setLoading} setActivityData={setActivityData} setStreak={setStreak} setRefreshing={setRefreshing} distanceData={ activityData.length === 0 ? activityData : activityData.slice(0,3)} />
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
                  'Please verify your email by clicking on the link sent to ' +
                  userData['email']
                }
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
        </>
      </Background>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
