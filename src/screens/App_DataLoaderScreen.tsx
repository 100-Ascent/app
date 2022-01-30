import axios from 'axios';
import React, {useEffect, useState } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../redux';

import {RootNavProp} from '../routes/RootStackParamList';
import {SetActivitData, } from '../redux/action';
import {useIsFocused} from '@react-navigation/native';
import { ACTIVITY_LIST, USER_DETAILS } from '../utils/apis/endpoints';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';

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
    getDropdownActivities();
    setLoading(false);
  }, [isFocused]);
  //Component functions

  return <RNLoaderSimple/>;
};

export default DataLoaderScreen;
