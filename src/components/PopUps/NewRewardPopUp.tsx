import React, {useEffect, useRef} from 'react';
import {Dimensions, Modal, View} from 'react-native';
import {Colors} from '../../utils/colors';
import StyledButton from '../Button/StyledButton';
import RewardCard from '../Cards/RewardsScreen/NewRewardCard';
import ConfettiCannon from 'react-native-confetti-cannon';
import {HEIGHT} from '../../utils/constants/constants';
import FastImage from 'react-native-fast-image';

const NewRewardPopUp = ({
  visible,
  onCancel,
  onHandleRevealPressed,
  rewardIndex,
  explosion,
  setRef,
  isRevealed,
  toUnlockRewardsArray,
}) => {
  const getStartColor = rewardIndex => {
    switch (rewardIndex) {
      case 1:
        return '#3378DF';
      case 2:
        return '#34CE27';
      case 3:
        return '#DF3333';
      case 4:
        return '#8827CE';
    }
  };

  const getEndColor = rewardIndex => {
    switch (rewardIndex) {
      case 1:
        return '#22467B';
      case 2:
        return '#23861A';
      case 3:
        return '#7B2222';
      case 4:
        return '#591A86';
    }
  };

  return (
    <Modal
      style={{margin: 20}}
      visible={visible}
      onRequestClose={onCancel}
      animationType="fade"
      transparent>
      <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.8)'}}>
        <View style={{flex: 1}} />
        <View style={{flex: 1}}>
          <View style={{flex: 1, marginHorizontal: 30}}>
            <View
              style={{
                flex: 3,
                paddingHorizontal: 30,
              }}>
              {isRevealed ? (
                <FastImage
                  style={{
                    height: 250,
                    borderRadius: 10,
                    marginHorizontal: 20,
                    padding: 10,
                  }}
                  source={{
                    uri: toUnlockRewardsArray[rewardIndex - 1].icon,
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.contain}
                />
              ) : (
                <RewardCard
                  startColor={getStartColor(rewardIndex)}
                  endColor={getEndColor(rewardIndex)}
                  rewardIndex={rewardIndex}
                  onPress={() => {}}
                />
              )}
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <View style={{flex: 1}} />
              <View style={{flex: isRevealed ? 5 : 3}}>
                <StyledButton
                  onPress={
                    isRevealed
                      ? onCancel
                      : () => onHandleRevealPressed(rewardIndex)
                  }
                  text={isRevealed ? 'CHECK OTHER REWARDS' : 'REVEAL NOW'}
                  buttonStyle={{backgroundColor: Colors.BLACK5, opacity: 1}}
                  textStyle={{color: Colors.TEXTDARK, fontWeight: 'bold'}}
                />
              </View>
              <View style={{flex: 1}} />
            </View>
          </View>
        </View>
        <View style={{flex: 1}} />
      </View>
      <ConfettiCannon
        ref={_ref => {
          setRef(_ref);
        }}
        count={150}
        fadeOut={true}
        fallSpeed={1500}
        origin={{x: -20, y: HEIGHT / 2}}
        autoStart={false}
        onAnimationStart={() => {
          //console.log('sd');
        }}
        onAnimationEnd={() => {}}
      />
    </Modal>
  );
};

export default NewRewardPopUp;
