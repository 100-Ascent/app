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
import Text16Bold from '../Text/Text16Bold';
import Text12Bold from '../Text/Text12Bold';
import EmptyState from '../../../assets/icons/empty_state.svg';

interface Props {
  distanceData?: any;
  setLoading?: any;
  setActivityData?: any;
  setStreak?: any;
  setIsToday?: any;
  showAllActivities?: boolean;
  handleEditActivity?: any;
  callToGetUserActivityData?: any;
}

const DistanceComponent : React.FC<Props> = ({ distanceData, setLoading, setActivityData, setStreak, setIsToday, showAllActivities = false, handleEditActivity, callToGetUserActivityData}) => {
  
  let dataMap = new Map();
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  
  
  const callToDeleteDistance = async (id) => {
    // console.log(id);
    await axios
      .delete(USER_ACTIVITY_DATA + "/" + id, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        ToastAndroid.show('Activity Data Deleted',ToastAndroid.SHORT);
        callToGetUserActivityData();        
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
      });
  };

  const handleEditPressed = (id: any ) => {     
    const index = distanceData.findIndex( obj => obj.uad? obj.uad.id : obj.id === id );
    handleEditActivity(distanceData[index])  
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
          data={val}
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
            data={cardValue}
            showAllActivities ={showAllActivities}
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
      ) : 
          <View style={{marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <EmptyState />
            <Text16Bold text={'No Activity Found!'} textColor={Colors.TEXTDARK} textStyle={{marginTop: -30}} />
            <Text12Bold text={'Click on + icon to add your first activity'} textColor={'grey'} />
          </View>

      }
    </View>
  );
};

export default DistanceComponent;
