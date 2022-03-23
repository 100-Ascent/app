import {Colors} from '../../../utils/colors';
import React from 'react';
import RewardCard from './NewRewardCard';
import Text16Normal from '../../Text/Text16Normal';
import {View} from 'react-native';

interface Props {
  onPress: (idx: number) => void;
  rewards: any;
}

const RewardsUnlocked: React.FC<Props> = ({rewards, onPress}) => {
  const REWARD_START_BGCOLOR = [
    'rgb(51, 120, 223)',
    'rgb(52, 206, 39)',
    'rgb(223, 51, 51)',
    'rgb(136, 39, 206)',
  ];
  const REWARD_END_BGCOLOR = [
    'rgb(34, 70, 123)',
    'rgb(35, 134, 26)',
    'rgb(123, 34, 34)',
    'rgb(89, 26, 134)',
  ];

  let data = [];
  let temp = [];
  for (let i = 0; i < rewards.length; i++) {
    if (i % 2 === 0 && i !== 0) {
      data.push(temp);
      temp = [];
      temp.push(rewards[i]);
    } else {
      temp.push(rewards[i]);
    }
  }

  if (temp.length !== 2) {
    temp.push('');
    if (temp.length === 1) {
      temp.push('');
    }
  }
  data.push(temp);
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
      <View style={{flex: 1, paddingHorizontal: 20, paddingTop: 15}}>
        <Text16Normal
          text={'New Rewards Unlocked'}
          textColor={Colors.TEXTDARK}
        />
      </View>
      <View style={{flex: 1, padding: 5}}>
        {data.map((row, idx) => {
          return (
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
              }}
              key={idx}>
              {row.map((val, idx2) => {
                const index = idx * 2 + idx2;
                return (
                  <View
                    style={{
                      flex: 1,
                      paddingTop: 5,
                      flexDirection: 'row',
                      marginHorizontal: 5,
                    }}
                    key={idx2}>
                    {val !== '' ? (
                      <RewardCard startColor={ REWARD_START_BGCOLOR[ index % 4 ] }
                        endColor={ REWARD_END_BGCOLOR[index % 4] }
                        rewardIndex={index + 1}
                        onPress={onPress}
                      />
                    ) : null}
                  </View>
                );
              })}
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default RewardsUnlocked;
