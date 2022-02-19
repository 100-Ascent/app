import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../../utils/colors';
import RewardsCarousal from '../../Carousals/RewardsCarousal';
import RewardsPopUp from '../../PopUps/RewardsPopUp';
import RewardsCardHeader from './RewardsCardHeader';


const RewardsCard = ({rewards, onPress}) => {
  const [reward, setReward] = useState(0);
  const [visible, setVisible] = useState(false);
  const handleRewardPress = val => {
    setReward(val);
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <View
      style={{
        backgroundColor: Colors.CARDS_COLOR2,
        borderRadius: 10,
        padding: 10,
      }}>
      <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
        <View
          style={{
            flex: 1,
          }}>
          <RewardsCardHeader />
        </View>
      </TouchableOpacity>
      <RewardsCarousal data={rewards} onPress={handleRewardPress} />
      <RewardsPopUp data={reward} visible={visible} onClose={onClose} />
    </View>
  );
};

export default RewardsCard;
