import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../../utils/colors';
import Background from '../../Background/StyledBackground';
import Text16Normal from '../../Text/Text16Normal';
import Reward1 from '../../../../assets/icons/Rewards/reward1.svg';
import Reward2 from '../../../../assets/icons/Rewards/reward2.svg';

const RewardsUnlocked = () => {
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
      <View
        style={{
          flex: 1,
          paddingTop: 5,
          flexDirection: 'row',
          marginHorizontal: 10,
        }}>
        {RewardCard('#3378DF', '#22467B', <Reward1 />)}
        {RewardCard('#34CE27', '#23861A', <Reward2 />)}
      </View>
      <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 10}}>
        {RewardCard('#DF3333', '#7B2222', <Reward2 />)}
        {RewardCard('#8827CE', '#591A86', <Reward1 />)}
      </View>
    </View>
  );
};

export default RewardsUnlocked;

const RewardCard = (startColor, endColor, reward) => {
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
        <View
          style={{
            padding: 15,
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {reward}
        </View>
      </Background>
    </View>
  );
};
