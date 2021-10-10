import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import axios from 'axios';
import React, {useState} from 'react';
import {View} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../../redux';
import {setCurrentValues} from '../../redux/action';
import {RootStackParamList} from '../../routes/RootStackParamList';
import DistanceCard from '../Cards/MyChallengeScreen_DistanceCard';

const DistanceComponent = ({distanceData}) => {
  const [current, setCurrent] = useState(0);
  const [distance, setDistance] = useState(distanceData);
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);

  const currentValue = useSelector(
    (state: AppState) => state.rootStore.currentValue,
  );

  const dispatch = useDispatch();
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const callToDeleteDistance = async () => {
    const id = distanceData[current].id;
    currentValue.distance =
      currentValue.distance - distanceData[current].distance;
    dispatch(setCurrentValues(currentValue));

    await axios
      .delete('/api/challenge_data/' + id, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        navigation.navigate('AllChallengesScreen');
      })
      .catch(err => {
        console.log('error123');
        console.log(err);
      });
  };

  const handleEditPressed = () => {
    navigation.navigate('EditActivityDataScreen', {
      data: distance[current],
      cd_id: distance[current].id,
    });
  };

  return (
    <View style={{marginTop: 20}}>
      {distanceData.length > 0 ? (
        <DistanceCard
          current={current}
          data={distance[current]}
          editPressed={handleEditPressed}
          handleDelete={callToDeleteDistance}
          onLeftPress={() => setCurrent(current - 1)}
          onRightPress={() => setCurrent(current + 1)}
          total={distanceData.length}
        />
      ) : null}
    </View>
  );
};

export default DistanceComponent;
