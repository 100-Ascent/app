import React from 'react';
import {View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import LottieView from 'lottie-react-native';

const CircularProgressBar = ({streak}) => {
  return (
    <AnimatedCircularProgress
      size={100}
      width={5}
      fill={(streak * 100) / 7}
      rotation={0}
      lineCap={'round'}
      tintColor="#E06627"
      onAnimationComplete={() => console.log('onAnimationComplete')}
      backgroundColor={Colors.BACKGROUND}>
      {() => (
        <View>
          <View style={{alignItems: 'center', paddingBottom: 5}}>
            <LottieView
              source={require('../../../assets/lottie/streak.json')}
              style={{width: 50, height: 45}}
              autoPlay
              loop></LottieView>
          </View>
          <Text14
            text={`${streak} ${streak === 1 ? 'day' : 'days'}`}
            textColor={Colors.TEXT}
          />
        </View>
      )}
    </AnimatedCircularProgress>
  );
};

export default CircularProgressBar;
