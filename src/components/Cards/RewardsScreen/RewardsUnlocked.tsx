import React from 'react';
<<<<<<< HEAD
import {View} from 'react-native';
import {Colors} from '../../../utils/colors';
=======
import { View } from 'react-native';
import { Colors } from '../../../utils/colors';
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
import Text16Normal from '../../Text/Text16Normal';
import RewardCard from './NewRewardCard';

interface Props {
  onPress: (idx: number) => void;
}

<<<<<<< HEAD
const RewardsUnlocked = ({onPress}) => {
=======
const RewardsUnlocked = ({ onPress }) => {
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
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
<<<<<<< HEAD
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 15}}>
=======
      <View style={{ flex: 1, paddingHorizontal: 20, paddingTop: 15 }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
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
<<<<<<< HEAD
      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 10}}>
=======
      <View style={{ flex: 1, flexDirection: 'row', marginHorizontal: 10 }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
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
