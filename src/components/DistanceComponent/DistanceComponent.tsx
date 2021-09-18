import React from 'react';
import {useState} from 'react';
import {View} from 'react-native';
import DistanceCard from '../Cards/MyChallengeScreen_DistanceCard';
import KlicksToGoCard from '../Cards/ChallengeScreen/KlicksToGoCard';
const DistanceComponent = ({distanceData}) => {
  const [current, setCurrent] = useState(0);

  return (
    <View style={{marginTop: 20}}>
      {distanceData.length > 0 ? (
        <DistanceCard
          data={distanceData[current]}
          current={current}
          total={distanceData.length}
          onRightPress={() => setCurrent(current + 1)}
          onLeftPress={() => setCurrent(current - 1)}
        />
      ) : null}
      <KlicksToGoCard data={distanceData[current]} current={current} />
    </View>
  );
};

export default DistanceComponent;
