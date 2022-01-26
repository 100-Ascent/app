import axios from 'axios';
import React, {useEffect, useState } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../redux';

import RNLoader from '../components/Loader/RNLoader';
import {RootNavProp} from '../routes/RootStackParamList';
import {SetActivitData, setData, setEmailVerifiedData} from '../redux/action';
import {useIsFocused} from '@react-navigation/native';
import { ACTIVITY_LIST, USER_DETAILS } from '../utils/apis/endpoints';

interface Props {
  navigation: RootNavProp<'DataLoaderScreen'>;
}

const DataLoaderScreen: React.FC<Props> = ({navigation}) => {
  
  //State variables
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);
  const headers = { 'X-CONTEXT-ID': contextId };

  //Async functions
  const callToGetUserDetails = async () => {
    await axios
      .get(USER_DETAILS, { headers })
      .then(async res => {
        const { data } = res.data;
        dispatch(setEmailVerifiedData(data['is_verified_email']));
        dispatch(setData(data));
      })
      .catch(err => {
        console.log('failed in user data');
        console.log(err);
      });
  };

  const getDropdownActivities = async () => {
    
    await axios
      .get(ACTIVITY_LIST, { headers })
      .then(res => {
        dispatch(SetActivitData({data: res.data.data}));
        navigation.navigate('HomeScreen');
      })
      .catch(err => {
        console.log('error');
        console.log(err);
      });
  };

  useEffect(() => {
    setLoading(true);
    callToGetUserDetails();
    getDropdownActivities();
    setLoading(false);
  }, [isFocused]);
  //Component functions

  return <RNLoader/>;
};

export default DataLoaderScreen;
