import axios from 'axios';
import React, {useEffect, useState } from 'react';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../redux';

import RNLoader from '../components/Loader/RNLoader';
import {RootNavProp} from '../routes/RootStackParamList';
import {SetActivitData} from '../redux/action';
import {useIsFocused} from '@react-navigation/native';

interface Props {
  navigation: RootNavProp<'DataLoaderScreen'>;
}

const DataLoaderScreen: React.FC<Props> = ({navigation}) => {
  //State variables
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();
  const [loading, setLoading] = useState(false);

  //Async functions
  const getDropdownActivities = () => {
    axios
      .get('/api/activities', {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        dispatch(SetActivitData({data: res.data.data}));
        navigation.navigate('MyProfileScreen');
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

  return <RNLoader/>;
};

export default DataLoaderScreen;
