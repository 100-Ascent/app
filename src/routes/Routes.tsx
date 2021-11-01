import React, {useState, useEffect} from 'react';
import {View, Platform} from 'react-native';

import AuthStack from './AuthStack';
import AppStack from './AppStack';
import AsyncStorage from '@react-native-community/async-storage';
import auth from '@react-native-firebase/auth';
import axios from 'axios';
import messaging from '@react-native-firebase/messaging';
import {NavigationContainer} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import uuid from 'react-native-uuid';
import VersionNumber from 'react-native-version-number';

import EmailVerifyScreen from '../screens/App_EmailVerifyScreen';
import RNLoader from '../components/Loader/RNLoader';
import OnboardingScreen from '../screens/App_OnBoarding';
import {setContextId, setEmailVerifiedData} from '../redux/action';
import uninterceptedAxiosInstance from '../utils/services/uninterceptedAxiosInstance';
import {LOGIN, USER_CHECKIN, VERSION_CHECK} from '../utils/apis/endpoints';
import {LOGIN_TYPE, VERSION_CHECK_TYPE} from '../utils/apis/endpointType';

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    await messaging().subscribeToTopic('all');
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
  await axios
    .get(USER_CHECKIN)
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
  const [isValidAppVersion, setIsValidAppVersion] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState();
  const [isEmailEntered, setEmailEntered] = useState(false);
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const dispatch = useDispatch();

  const onAuthStateChanged = user => {
    if (user) {
      console.log(user);
      setLoading(true);
      getFcmToken()
        .then(async notifyToken => {
          const isValidUser = await AsyncStorage.getItem('user');

          if (isValidUser === null) {
            callToCreateUser(notifyToken, setLoading, setEmailEntered, dispatch);
            callToUserCheckIn(setLoading, dispatch);
            setUser(user);
          } else {
            setEmailEntered(true);
            callToUserCheckIn(setLoading, dispatch);
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
  const checkAppVersion = () => {
    const data: VERSION_CHECK_TYPE = {
      appVersion: VersionNumber.appVersion,
      os: Platform.OS,
    };

    uninterceptedAxiosInstance
      .post(VERSION_CHECK, data)
      .then(res => {
        setIsValidAppVersion(res.data.data.success);
      })
      .catch(err => {
        console.log('check app version failed');
        console.log(err);
      });
  };

  // First called
  useEffect(() => {
    checkAppVersion();
  }, []);

  // Second called
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  // Third called
  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  return (
    <NavigationContainer>
      {isValidAppVersion ? (
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
        <View></View>
      )}
    </NavigationContainer>
  );
};

export default Routes;
