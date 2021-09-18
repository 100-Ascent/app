import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import RewardCard from './NewRewardCard';

interface Props {
  onPress: (idx: number) => void;
}

const RewardsUnlocked = ({ onPress }) => {
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 20,
        backgroundColor: Colors.TEXT,
        borderRadius: 10,
        elevation: 2,
        paddingBottom: 5,
      }}>
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 15 }}>
        <Text16Normal
          text={'New Rewards Unlocked'}
          textColor={Colors.TEXTDARK}
        />
      </View>
      <View
        style={{
          flex: 1,
          paddingTop: 5,
          flexDirection: 'row',
          marginHorizontal: 10,
        }}>
        <RewardCard
          startColor={'#3378DF'}
          endColor={'#22467B'}
          rewardIndex={1}
          onPress={onPress}
        />
        <RewardCard
          startColor={'#34CE27'}
          endColor={'#23861A'}
          rewardIndex={2}
          onPress={onPress}
        />
      </View>
      <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10 }}>
        <RewardCard
          startColor={'#DF3333'}
          endColor={'#7B2222'}
          rewardIndex={3}
          onPress={onPress}
        />
        <RewardCard
          startColor={'#8827CE'}
          endColor={'#591A86'}
          rewardIndex={4}
          onPress={onPress}
        />
      </View>
    </View>
  );
};

export default RewardsUnlocked;
