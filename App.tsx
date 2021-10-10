import 'react-native-gesture-handler';
import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  AppState,
  Platform,
  SafeAreaView,
  StatusBar,
  useColorScheme,
} from 'react-native';
import NavigationProviders from './src/routes';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {BASEURL} from './src/utils/constants';
import {store} from './src/utils/utils';
import {Provider} from 'react-redux';

import {LogBox} from 'react-native';
import {
  getTrackingStatus,
  requestTrackingPermission,
  TrackingStatus,
} from 'react-native-tracking-transparency';

axios.defaults.baseURL = BASEURL;
const CancelToken = axios.CancelToken;

axios.interceptors.request.use(async request => {
  request.headers.Authorization = await auth().currentUser.getIdToken();
  return request;
});

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  if (Platform.OS === 'ios') {
    const [trackingStatus, setTrackingStatus] = React.useState<
      TrackingStatus | '(loading)'
    >('(loading)');

    React.useEffect(() => {
      request();
      getTrackingStatus()
        .then(status => {
          setTrackingStatus(status);
        })
        .catch(e => Alert.alert('Error', e?.toString?.() ?? e));
    }, []);

    const request = React.useCallback(async () => {
      try {
        const status = await requestTrackingPermission();
        setTrackingStatus(status);
      } catch (e) {
        Alert.alert('Error', e?.toString?.() ?? e);
      }
    }, []);
  }

  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1,
  };
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  // const appState = useRef(AppState.currentState);
  // const [appStateVisible, setAppStateVisible] = useState(appState.current);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (
  //       appState.current.match(/inactive|background/) &&
  //       nextAppState === 'active'
  //     ) {
  //       console.log('App has come to the foreground!');
  //     }

  //     appState.current = nextAppState;
  //     setAppStateVisible(appState.current);
  //     console.log('AppState', appState.current);
  //   });

  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  return (
    <SafeAreaView style={backgroundStyle}>
      <Provider store={store}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationProviders />
      </Provider>
    </SafeAreaView>
  );
};

export default App;
