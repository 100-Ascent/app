import React from 'react';
import {View} from 'react-native';
import NoActiveChallengeIcon from '../../../../assets/background-icons/no-active-challenge.svg';
import Text16Normal from '../../Text/Text16Normal';

const NoActiveChallengeCard = () => {
  return (
    <View style={{alignItems: 'center'}}>
      <View>
        <NoActiveChallengeIcon />
      </View>
      <View>
        <Text16Normal text="No Active Challenges Found" textColor={'#666666'} />
      </View>
    </View>
  );
};

export default NoActiveChallengeCard;
