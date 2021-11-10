import React from 'react';
import {View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import LottieView from 'lottie-react-native';

const CircularProgressBar = ({streak}) => {
  return (
    <AnimatedCircularProgress
      size={140}
      width={4}
      fill={(streak * 100) / 7}
      rotation={0}
      lineCap={'round'}
      tintColor='#ff9320'
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor={Colors.BACKGROUND}>
      {() => (
        <View>
          <View style={{alignItems: 'center', paddingBottom: 0, marginBottom: -5}}>
            <LottieView
              source={require('../../../assets/lottie/streak.json')}
              style={{width: 90, height: 90}}
              autoPlay
              loop
            />
          </View>
          <View style={{alignItems: 'center', paddingBottom: 5}}>
            <Text14
              text={`${streak} ${streak === 1 ? 'day' : 'days'}`}
              textColor={Colors.TEXT}
            />
          </View>
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

export default CircularProgressBar;
