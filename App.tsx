import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import NavigationProviders from './src/routes';
import axios from 'axios';
import auth from '@react-native-firebase/auth';
import {BASEURL} from './src/utils/constants';
import {store} from './src/utils/utils';
import {Provider} from 'react-redux';

import {LogBox} from 'react-native';

axios.defaults.baseURL = BASEURL;
const CancelToken = axios.CancelToken;

axios.interceptors.request.use(async request => {
  request.headers.Authorization = await auth().currentUser.getIdToken();
  return request;
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    flex: 1,
  };
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

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
