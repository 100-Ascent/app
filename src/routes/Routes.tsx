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
import {setContextId} from '../redux/action';

const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) {
    await messaging().subscribeToTopic('all');
    return fcmToken;
  } else {
    return '';
  }
};

const callToCreateUser = (
  notifyToken: string,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setEmailVerified: {
    (value: React.SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
) => {
  const data = {
    notifyToken: notifyToken,
    os: Platform.OS,
    appVersion: VersionNumber.appVersion,
    deviceId: uuid.v4().toString(),
  };

  console.log('creating user');
  console.log(data);

  axios
    .post('/login', data)
    .then(async res => {
      console.log(res.data.status);
      if (res.data.status.code !== undefined) {
        if (res.data.status.code === '101') {
          setEmailVerified(false);
        }
      } else {
        setEmailVerified(true);
      }
      await AsyncStorage.setItem('user', 'true');
      setLoading(false);
    })
    .catch(err => {
      console.log('failed');
      console.log(err);
      setLoading(false);
    });
};

const callToUserCheckIn = (
  setLoading: {
    (value: React.SetStateAction<boolean>): void;
    (arg0: boolean): void;
  },
  dispatch,
) => {
  axios
    .get('/api/userCheckIn')
    .then(async res => {
      dispatch(setContextId(res.data.data.code));
      setLoading(false);
    })
    .catch(err => {
      console.log('failed');
      console.log(err);
      setLoading(false);
    });
};

const Routes = () => {
  const [loading, setLoading] = useState(false);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [isValidAppVersion, setIsValidAppVersion] = useState(false);
  const [isEmailVerified, setEmailVerified] = useState(false);
  const dispatch = useDispatch();

  function onAuthStateChanged(user) {
    if (user) {
      setLoading(true);
      getFcmToken().then(async notifyToken => {
        const isValidUser = await AsyncStorage.getItem('user');

        if (isValidUser === null) {
          callToCreateUser(notifyToken, setLoading, setEmailVerified);
          callToUserCheckIn(setLoading, dispatch);
          setUser(user);
        } else {
          callToUserCheckIn(setLoading, dispatch);
          setEmailVerified(true);
          setLoading(false);
          setUser(user);
        }
      });
    } else {
      setUser(null);
    }
    if (initializing) setInitializing(false);
  }

  // Check app version
  useEffect(() => {
    console.log('check app version');
    const uninterceptedAxiosInstance = axios.create();
    uninterceptedAxiosInstance
      .post('/versionCheck', {
        appVersion: VersionNumber.appVersion,
        os: Platform.OS,
      })
      .then(res => {
        console.log('Checking version');
        setIsValidAppVersion(res.data.data.success);
      })
      .catch(err => {
        console.log('failed');
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer>
      {isValidAppVersion ? (
        loading ? (
          <RNLoader />
        ) : user ? (
          isEmailVerified ? (
            <AppStack />
          ) : (
            <EmailVerifyScreen
              setIsEmailVerifiedToTrue={() => setEmailVerified(true)}
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
