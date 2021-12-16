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
import moment from 'moment';
import Text16Normal from '../Text/Text16Normal';
import { Colors } from '../../utils/colors';

interface Props {
  setRefreshing?: any;
  distanceData?: any;
  setLoading?: any;
  setActivityData?: any;
  setStreak?: any;
  setIsToday?: any;
  showAllActivities?: boolean
}

const DistanceComponent : React.FC<Props> = ({setRefreshing, distanceData, setLoading, setActivityData, setStreak, setIsToday, showAllActivities = false}) => {
  
  let dataMap = new Map();
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
          callToGetStreakData();
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

  const callToGetStreakData = async () => {
    setLoading(true);
    await axios
      .get("/api/user/activity/streak", {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data.data.streak;
        const isToday = res.data.data.is_today;
        if(res.data.success){
          setIsToday(isToday);
          setStreak(data);
        }else{
          setStreak(0);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('failed in Streakkk data yohoooooooo');
        console.log(err);
      });
  }

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

  for(let i=0;i<distanceData.length;i++){
    let date = moment(new Date(distanceData[i]['date'])).format('ll');
    if(dataMap.get(date)===undefined){
      dataMap.set(date, []);
    }
    let arr = dataMap.get(date);
    arr.push(distanceData[i]);
    dataMap.set(date,arr);
  }

  const card = distanceData.map((val,idx)=>{
      return <View style={{ marginTop: idx === 0 ? 5 : 15 }}>
        <DistanceCard
          data={distanceData[idx]}
          editPressed={handleEditPressed}
          handleDelete={callToDeleteDistance}
        />
        </View>
  })

  let allActivitesArray = [];
  dataMap.forEach((val, key)=>{
    let obj = {
      heading: key,
      value: val
    }
    allActivitesArray.push(obj);
  })

  const cardWithHeader = allActivitesArray.map((val,idx)=>{
    return <View style={{ }} key={idx}>
      <View style={{ marginTop: idx === 0 ? 5 : 30, marginBottom: 20 }} key={idx}>
        <Text16Normal text={val.heading} textColor={Colors.TEXTDARK} textStyle={{ fontFamily: "Quicksand-SemiBold" }}/>
      </View>
      {
        val.value.map((cardValue,idxx)=>{
          return <View style={{ marginTop: idxx === 0 ? 5 : 15 }} key={idxx}>
          <DistanceCard
            showAllActivities ={showAllActivities}
            data={cardValue}
            editPressed={handleEditPressed}
            handleDelete={callToDeleteDistance}
          />
        </View>
        })
      }
      
    </View>
  });
  
  return (
    <View style={{marginTop: 20}}>
      {distanceData.length > 0 ? (
        showAllActivities ? cardWithHeader : card
      ) : null}
    </View>
  );
};

export default DistanceComponent;
