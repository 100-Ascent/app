import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Background from '../../Background/StyledBackground';
import Reward1 from '../../../../assets/icons/Rewards/reward1.svg';
import Reward2 from '../../../../assets/icons/Rewards/reward2.svg';

interface Props {
  startColor: string;
  endColor: string;
  rewardIndex: number;
  onPress?: (idx?: number) => void;
}

const RewardCard: React.FC<Props> = ({
  startColor,
  endColor,
  rewardIndex,
  onPress,
}) => {
  const getReward = rewardIndex => {
    switch (rewardIndex) {
      case 1:
        return <Reward1 />;
      case 2:
        return <Reward2 />;
      case 3:
        return <Reward2 />;
      case 4:
        return <Reward1 />;
    }
  };
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        margin: 10,
      }}>
      <Background
        style={{borderRadius: 10}}
        startColor={startColor}
        endColor={endColor}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => onPress(rewardIndex)}>
          <View
            style={{
              height: '100%',
              padding: 16,
              borderRadius: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {getReward(rewardIndex)}
          </View>
        </TouchableOpacity>
      </Background>
    </View>
  );
};

export default RewardCard;
