import {EMAIL_NOT_VERIFIED, ProfileInputFieldTypes} from '../utils/constants/constants';
import { Image, RefreshControl, SafeAreaView, ScrollView, StyleSheet, ToastAndroid, TouchableOpacity, View } from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import { USER_ACTIVITY_DATA, USER_DETAILS, VERIFY_EMAIL } from '../utils/apis/endpoints';
import {setData, setEmailVerifiedData} from '../redux/action';
import {useDispatch, useSelector} from 'react-redux';

import ActivitiesToolTip from '../components/Tooltip/ActivitiesToolTip';
import {AppState} from '../redux';
import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import {Colors} from '../utils/colors';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import DistanceComponent from '../components/DistanceComponent/DistanceComponent';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import NotifyBanner from '../components/Banners/NotifyBanner';
import ProfileInput from '../components/Input/ProfileInput';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
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
  const [activityData, setActivityData] = useState([]);
  const [token, setToken] = useState('');
  const [verifyEmailPopUpVisible, setVerifyEmailPopUp] = useState(false);
  const [refreshing, setRefreshing] = React.useState(false);

  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const headers = { headers: { 'X-CONTEXT-ID': contextId } };

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    callToGetUserDetails(true);
  }, []);

  // Async Functions
  const getToken = async () => {
    const token = await auth().currentUser.getIdToken();
    setToken(token);
  };

  const callToGetUserDetails = async (pullLoader = false) => {
    pullLoader === false ? setLoading(true) : setRefreshing(true);
    await axios
        .get(USER_DETAILS, headers)
        .then(res => {
            const data = res.data.data;
            dispatch(setEmailVerifiedData(data['is_verified_email']));
            dispatch(setData(data));
            setUserData(data);
            navigation.setOptions({
              headerRight: () => (
                <View style={{marginRight: 15, flexDirection: 'row'}}>
                  <TouchableOpacity onPress={()=>navigation.navigate('LeaderboardScreen')}> 
                    <Image source={require('../../assets/icons/leaderboard/podium.png')} style={{ width: 25, height: 25 }} />
                  </TouchableOpacity>        
                  <View style={{padding: 5}}/>
                  <TouchableOpacity>
                    <Icon name="edit" size={25} color={'#565656'} onPress={() => navigation.navigate('EditMyProfileScreen', { data: data })} />
                  </TouchableOpacity>
                </View>
              ),
            })
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
    await axios
        .get(USER_ACTIVITY_DATA, headers)
        .then(res => {
            const data = res.data.data;        
            setActivityData(res.data.success ? data : []);            
        })
        .catch(err => {
            console.log('failed in activity data yohoooooooo');
            console.log(err);
            setLoading(false);
        });
  };

  const setNavigationHeader = () => {
    navigation.setOptions({
      headerTitle: 'My Profile',
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerTitleContainerStyle: {alignItems: 'center'},    
      headerRight: ()=>(<View style={{ marginRight: 10 }} />)  
    });
  }
  
  useEffect(() => {
    setNavigationHeader();
    callToGetUserDetails(false);    
  }, [isFocused]);


  // headerRight: () => (
  //   <View style={{marginRight: 15, flexDirection: 'row'}}>
  //     <TouchableOpacity onPress={()=>navigation.navigate('LeaderboardScreen')}> 
  //       <Image source={require('../../assets/icons/leaderboard/podium.png')} style={{ width: 25, height: 25 }} />
  //     </TouchableOpacity>        
  //     <View style={{padding: 5}}/>
  //     <TouchableOpacity>
  //       <Icon name="edit" size={25} color={'#565656'} onPress={() => console.log(userData)} />
  //     </TouchableOpacity>
  //   </View>
  // ),

  // Component Functions
  const handleInfoPressed = () => setVerifyEmailPopUp(true);

  const handleResendEmail = () => {
    axios
      .get(VERIFY_EMAIL)
      .then(async res => {
          if (res.data.data.success) {
            setVerifyEmailPopUp(false);
            ToastAndroid.show('Verification link sent successfully!', ToastAndroid.SHORT);
          }
      })
      .catch(err => {
          ToastAndroid.show('Something went wrong. Please try again!', ToastAndroid.SHORT);
          console.log('failed');
          console.log(err);
      });
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <>
          {loading ? <RNLoaderSimple/> : 
            <ScrollView scrollEnabled style={{flexGrow: 1}} 
              refreshControl={ <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> }
              contentContainerStyle={{flexGrow: 1}}>
              
              <View style={styles.container}>
                <BackgroundVector/>
                <View style={styles.profileWrapper}>
                  { 
                    userData['is_verified_email'] ? null : 
                      <NotifyBanner 
                        onPress={handleInfoPressed} 
                        text={EMAIL_NOT_VERIFIED} 
                      /> 
                  }

                  <View style={styles.circularImage}>
                    <FastImage 
                      style={styles.image} 
                      source={{ uri: userData['image_id'], priority: FastImage.priority.high, headers: { Authorization: token } }} 
                      resizeMode={FastImage.resizeMode.cover} 
                    />
                  </View>

                  <Text28 text={ userData['first_name'] + ' ' + userData['last_name'] } textColor={Colors.TEXTDARK} containerStyle={{marginTop: 10}} />
                  <Text16Normal text={ 'Member since ' + moment(new Date(userData['created_at'])).format('ll') } textColor={Colors.TEXTDARK} />
                </View>   

                <View style={styles.userDataContainer}>

                  <ProfileInput type={ProfileInputFieldTypes.USERNAME} 
                    iconName="red"  isUsername={userData['username']?.length !== 0} 
                    textField={userData['username']} 
                  />
                  <ProfileInput type={ProfileInputFieldTypes.EMAIL} 
                    iconName="email" isEmailVerified={userData['is_verified_email']} 
                    textField={userData['email']} onInfoPressed={handleInfoPressed} 
                  />
                  <ProfileInput type={ProfileInputFieldTypes.PHONE} 
                    iconName="phone" isPhone={true} textField={parsePhoneNumber(userData['phoneNumber']).formatInternational()}
                  />
                  
                  { 
                    userData["college"] === undefined ? null : 
                      <ProfileInput type={ProfileInputFieldTypes.INSTITUTION}
                        iconName="public" textField={ userData["college"]["name"] + ", " + userData["college"]["city"] }  
                      />
                  }

                  <ProfileInput type={ProfileInputFieldTypes.COUNTRY}
                    iconName="public" textField={ userData['country'].length === 0 ? 'India' : userData['country']}
                  />

                  {
                    userData['address'].length === 0 ? null : 
                      <ProfileInput type={ProfileInputFieldTypes.ADDRESS} iconName="home" 
                        textField={ userData['address'].length === 0 ? 'Hogwarts Castle, Highlands' : userData['address'] + ', '
                        + userData['city'] + ', ' + userData['state'] + ' - ' + userData['pincode'] } isAddressFilled={userData['address'].length !== 0}
                      />
                  }

                  {
                    userData['gender'] == 'Rather not say' || userData['gender'] == 'Rather Not Say' ? null : 
                      <ProfileInput type={ProfileInputFieldTypes.GENDER}
                        iconName="user" iconType="feather" textField={userData['gender']}
                      />
                  }

                  {
                    userData['dob'].length === 0 ? null :
                      <ProfileInput type={ProfileInputFieldTypes.DOB}
                        iconName="cake" isDOBFilled={userData['dob'].length !== 0}
                        textField={ userData['dob'].length === 0 ? '29/02/2030' : userData['dob'] }
                      />                     
                  }                  
                </View>

                <View style={styles.allActivitiesHeader}>                  
                  <Text16Bold
                      text="All Activities"
                      textColor={Colors.TEXTDARK} 
                      textStyle={undefined} 
                      containerStyle={{flex: 1}}
                    />
                  <ActivitiesToolTip color={Colors.INFO_GREY} iconSize={28} />
                </View>

                <View style={{marginHorizontal: 10}}>
                  <DistanceComponent
                      showAllActivities={false}
                      distanceData={activityData.length > 3 ? activityData.slice(0,3) : activityData } 
                      handleEditActivity={(data) => navigation.navigate('EditActivityScreen', { data: data.uad? data.uad : data })}  
                      callToGetUserActivityData={callToGetUserActivityData}                             
                    />
                </View>

                { 
                  activityData.length > 3 ? <View style={styles.seeAllActivities}>
                    <TouchableOpacity onPress={()=> navigation.navigate('DataInListViewScreen', { data: activityData }) }>
                      <Text16Bold text="See All Activities" textColor={Colors.TEXTDARK} textStyle={{textDecorationLine: 'underline'}} />
                    </TouchableOpacity>
                  </View> : null
                }
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
          }
        </>
      </Background>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 15
  },
  profileWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  circularImage: {
    borderWidth: 2,
    borderRadius: 110,
    padding: 5,
    borderColor: Colors.RED
  },
  image: { 
    width: 110, 
    height: 110,
    borderRadius: 110 
  },
  userDataContainer: {
    marginTop: 20
  },
  allActivitiesHeader: {
    marginTop: 35, 
    marginHorizontal: 20, 
    flexDirection: 'row'
  },
  seeAllActivities: {
    flex: 1, 
    alignItems: 'flex-end', 
    marginRight: 15, 
    marginTop: 20 
  }
})
