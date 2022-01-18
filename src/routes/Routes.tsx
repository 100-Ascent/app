import React, {useState, useEffect} from 'react';
import { Platform} from 'react-native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import messaging, { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import VersionNumber from 'react-native-version-number';

import EmailVerifyScreen from '../screens/App_EmailVerifyScreen';
import RNLoader from '../components/Loader/RNLoader';
import OnboardingScreen from '../screens/App_OnBoarding';
import {setContextId, setEmailVerifiedData, setHeartBeatConfig} from '../redux/action';
import uninterceptedAxiosInstance from '../utils/services/uninterceptedAxiosInstance';
import {LOGIN, USER_CHECKIN, VERSION_CHECK} from '../utils/apis/endpoints';
import {LOGIN_TYPE, VERSION_CHECK_TYPE} from '../utils/apis/endpointType';
import ForceUpdateScreen from '../screens/App_ForceUpdate';
import UnderMaintenanceScreen from '../screens/App_UnderMaintenance';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import NotificationIcon from '../../assets/modal-icons/notification-icon.svg';

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    await messaging().subscribeToTopic('all');
    console.log(fcmToken)
    return fcmToken;
  } else {
    return '';
  }
};

const callToCreateUser = async (
  notifyToken: string,
  setLoading: any,
  setEmailEntered: any,
  dispatch: any,
) => {
  const data: LOGIN_TYPE = {
    notifyToken: notifyToken,
    os: Platform.OS,
    appVersion: VersionNumber.appVersion,
    deviceId: uuid.v4().toString(),
  };
  
  await axios
    .post(LOGIN, data)
    .then(async res => {
      if (res.data.status.code !== undefined) {
        dispatch(setEmailVerifiedData({isEmailVerified: false}));
        if (res.data.status.code === '101') {
          setEmailEntered(false);
        } else if (res.data.status.code === '102') {
          setEmailEntered(true);
        } else {
          setEmailEntered(true);
        }
      } else {
        setEmailEntered(true);
      }
      await AsyncStorage.setItem('user', 'true');
    })
    .catch(err => {
      console.log('failed in login api');
      console.log(err);
      setEmailEntered(true);
      setLoading(false);
    });
};

const callToUserCheckIn = async (setLoading: any, dispatch: any) => {
  console.log("Calling User checkin ");
  await axios
    .post(USER_CHECKIN, {
      timezone_offset_mins : new Date().getTimezoneOffset()
    })
    .then(async res => {
      dispatch(setContextId(res.data.data.code));
      setLoading(false);
    })
    .catch(err => {
      console.log('user checkin failed');
      console.log(err);
      setLoading(false);
    });
};

const Routes = () => {
  const [isValidAppVersion, setIsValidAppVersion] = useState(true);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [isEmailEntered, setEmailEntered] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [killSwitch, setKillSwitch] = useState(false);
  const [notification, setNotification] = useState<FirebaseMessagingTypes.RemoteMessage>();
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      setLoading(true);
      getFcmToken()
        .then(async notifyToken => {
          const isValidUser = await AsyncStorage.getItem('user');
          if (isValidUser === null) {
            await callToCreateUser(notifyToken, setLoading, setEmailEntered, dispatch);
            await callToUserCheckIn(setLoading, dispatch);
            setUser(user);
          } else {
            setEmailEntered(true);
            await callToUserCheckIn(setLoading, dispatch);
            setLoading(false);
            setUser(user);
          }
        })
        .catch(err => {
          console.log('Error getting FCM token' + err);
        });
    } else {
      setUser(null);
    }
    if (initializing) setInitializing(false);
  };

  const showAppStack = () => {
    AsyncStorage.setItem('alreadyLaunched', 'true');
    setIsFirstLaunch(false);
  };

  // Check app version
  const checkAppVersion = async () => {
    const data: VERSION_CHECK_TYPE = {
      appVersion: VersionNumber.appVersion,
      os: Platform.OS,
    };

    await uninterceptedAxiosInstance
      .post(VERSION_CHECK, data)
      .then(res => {
        setIsValidAppVersion(res.data.data.is_version_allowed);
        setKillSwitch(res.data.data.kill_switch);
        dispatch( setHeartBeatConfig({ heart_beat_timeout: res.data.data.heart_beat_timeout, heart_beat_toggle: res.data.data.heart_beat_toggle }) )
      })
      .catch(err => {
        console.log('check app version failed');
        console.log(err);
      });
  };


  useEffect(() => {
    // requestUserPermission();

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      return await setNotification(remoteMessage)          
    });
     
    messaging().setBackgroundMessageHandler(async remoteMessage => {      
      console.log('Message handled in the background!', remoteMessage);      
    });

    return unsubscribe;
  }, []);

  // const requestUserPermission = async () => {
  //   const authStatus = await messaging().requestPermission();
  //   const enabled =
  //     authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
  //     authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  //   if (enabled) {
  //     getFcmToken()
  //   }
  // }

  // First called
  useEffect(() => {
    checkAppVersion();
  }, []);

  // Second called
  useEffect(() => {
    
    if(isValidAppVersion && !killSwitch ){
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
    }
    
  }, []);

  // Third called
  useEffect(() => {
    if(isValidAppVersion && !killSwitch ){
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }
  }, []);

  return (
    <NavigationContainer>
      { killSwitch ? <UnderMaintenanceScreen/> : isValidAppVersion ? (
        loading ? (
          <RNLoader />
        ) : isFirstLaunch ? (
          <OnboardingScreen showAppStack={showAppStack} />
        ) : user ? (
          isEmailEntered ? (
            <AppStack />
          ) : (
            <EmailVerifyScreen
              setIsEmailVerifiedToTrue={() => setEmailEntered(true)}
            />
          )
        ) : (
          <AuthStack />
        )
      ) : (
       <ForceUpdateScreen/>
      )}
       {
        notification !== undefined ? 
        <CustomPopUp
          icon={<NotificationIcon/>}
          visible={true}
          onOk={() => setNotification(undefined)}
          isCancelable={false}
          oKText={'OKAY'}
          header={notification.notification.title}
          description={notification.notification.body}
          isCloseButton={false}   
          isDescriptionLong={false} 
      /> :  <></> }
    </NavigationContainer>
  );
};

export default Routes;
