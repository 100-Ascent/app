import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import RewardsCarousal from '../Carousals/RewardsCarousal';
import RewardsCardHeader from '../Headers/RewardsCardHeader';
import RewardsPopUp from '../PopUps/RewardsPopUp';

const RewardsCard = ({rewards, onPress}) => {
  const [indexOfReward, setIndexOfReward] = useState(0);
  const [visible, setVisible] = useState(false);
  const handleRewardPress = idx => {
    setVisible(true);
    setIndexOfReward(idx);
  };
  const onClose = () => {
    setVisible(false);
  };
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 15,
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
      <RewardsPopUp
        data={rewards[indexOfReward]}
        visible={visible}
        onClose={onClose}
      />
    </View>
  );
};

export default RewardsCard;
