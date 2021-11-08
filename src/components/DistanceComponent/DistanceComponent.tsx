import React from 'react';
import {ToastAndroid, View} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {AppState} from '../../redux';

import {RootStackParamList} from '../../routes/RootStackParamList';
import { USER_ACTIVITY_DATA } from '../../utils/apis/endpoints';
import DistanceCard from '../Cards/MyChallengeScreen_DistanceCard';


const DistanceComponent = ({setRefreshing, distanceData, setLoading, setActivityData}) => {

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

  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const callToDeleteDistance = async (id) => {
    await axios
      .delete('/api/user/data/' + id, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        ToastAndroid.show('Activity Data Deleted',ToastAndroid.SHORT);
        callToGetUserActivityData();
        navigation.navigate('MyProfileScreen');
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
      });
  };

  const handleEditPressed = (id: any ) => {     
    const index = distanceData.findIndex( obj => obj.id === id );    
    navigation.navigate('EditActivityScreen', { data: distanceData[index] });
  };

  const card = distanceData.map((val,idx)=>{
      return <View style={{ marginTop: idx === 0 ? 5 : 15 }}>
        <DistanceCard
          data={distanceData[idx]}
          editPressed={handleEditPressed}
          handleDelete={callToDeleteDistance}
        />
        </View>
  })
  
  return (
    <View style={{marginTop: 20}}>
      {distanceData.length > 0 ? (
        card 
      ) : null}
    </View>
  );
};

export default DistanceComponent;
