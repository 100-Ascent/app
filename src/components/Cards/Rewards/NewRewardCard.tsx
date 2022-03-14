import {TouchableOpacity, View} from 'react-native';

import Background from '../../Background/StyledBackground';
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
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
      default:
        return <Reward2 />;
    }
  };
  
  return (
    <View
      style={{
        flex: 1,
        borderRadius: 10,
        margin: 10,
      }}>
     <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 0}}
        colors={[ startColor, endColor, ]} style={{ borderRadius: 10 }}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            onPress(rewardIndex);
          }}>
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
        </LinearGradient>
    </View>
  );
};

export default RewardCard;
