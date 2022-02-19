import React from 'react';
import {View} from 'react-native';

import CarousalCard from './CarousalCard';
import {Colors} from '../../../utils/colors';

const ActiveChallengeCard = ({data, onPress}) => {
  const allChallengeList = data.map((val, idx) => {
    return (
      <View
        style={{
          borderRadius: 10,
          backgroundColor: Colors.TRANSPARENT,
          flexDirection: 'row',
          marginTop: 15,
        }}
        key={idx}>
        <CarousalCard
          data={val}
          handleSubscribe={() => {}}
          isSubscribed={val.is_subscribed}
          onPress={() => onPress(val)}
        />
      </View>
    );
  });
  return (
    <View style={{flex: 1, borderRadius: 10, marginTop: 10}}>
      <View style={{flex: 1}}>{allChallengeList}</View>
    </View>
  );
};

export default ActiveChallengeCard;
