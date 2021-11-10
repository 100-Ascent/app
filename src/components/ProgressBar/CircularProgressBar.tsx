import React, { useRef } from 'react';
import {View} from 'react-native';
import {AnimatedCircularProgress} from 'react-native-circular-progress';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import LottieView from 'lottie-react-native';

const CircularProgressBar = ({streak, isToday}) => {
  let streakColored = useRef(null);
  let streakGrey = useRef(null);
  return (
    <AnimatedCircularProgress
      size={140}
      width={4}
      fill={(streak * 100) / 7}
      rotation={0}
      lineCap={'round'}
      tintColor='#ff9320'
      backgroundColor={Colors.BACKGROUND}>
      {() => (
        <View> 
          <View style={{alignItems: 'center', paddingBottom: 0, marginBottom: -5}}>
            {
              isToday ?  
              <LottieView
                source={ require( '../../../assets/lottie/streak.json')}
                style={{width: 90, height: 90}}
                autoPlay
                ref={animation => {
                  streakColored.current = animation;
                }}
                onLayout={()=> streakColored.current.play()}
                loop
              /> : <LottieView
                  source={require('../../../assets/lottie/streak-grey.json' )}
                  style={{width: 90, height: 90}}
                  autoPlay
                  ref={animation => {
                    streakGrey.current = animation;
                  }}
                  onLayout={()=> streakGrey.current.play()}
                  loop
                />
            }
            
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
