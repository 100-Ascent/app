import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import RewardsCarousal from '../Carousals/RewardsCarousal';
import RewardsCardHeader from '../Headers/RewardsCardHeader';
import RewardsPopUp from '../PopUps/RewardsPopUp';

const RewardsCard = ({rewards, onPress}) => {
<<<<<<< HEAD
  const [indexOfReward, setIndexOfReward] = useState(0);
  const [visible, setVisible] = useState(false);
  const handleRewardPress = idx => {
    setVisible(true);
    setIndexOfReward(idx);
=======
  const [reward, setReward] = useState(0);
  const [visible, setVisible] = useState(false);
  const handleRewardPress = val => {
    setReward(val);
    setVisible(true);
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
  };
  const onClose = () => {
    setVisible(false);
  };
<<<<<<< HEAD
=======

>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
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
<<<<<<< HEAD
      <RewardsPopUp
        data={rewards[indexOfReward]}
        visible={visible}
        onClose={onClose}
      />
=======
      <RewardsPopUp data={reward} visible={visible} onClose={onClose} />
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
    </View>
  );
};

export default RewardsCard;
