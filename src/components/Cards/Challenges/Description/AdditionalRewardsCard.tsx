import React from 'react';
import {useState, useRef} from 'react';
import {TouchableOpacity, View, Animated, Easing, StyleSheet} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../../utils/colors';
import Text14 from '../../../Text/Text14';
import Text20 from '../../../Text/Text20';
import FastImage from 'react-native-fast-image';

const AdditionalRewardsCard = ({data}) => {
  const [animation] = useState(new Animated.Value(0));
  const [indexToAnimate, setIndexToAnimate] = useState('');
  let rewards = [];
  let temp = [];
  for (let i = 0; i < data.length; i++) {
    if (i % 3 === 0 && i !== 0) {
      rewards.push(temp);
      temp = [];
      temp.push(data[i]);
    } else {
      temp.push(data[i]);
    }
  }
  if (temp.length !== 3) {
    temp.push('');
    if (temp.length === 2) {
      temp.push('');
    }
  }
  rewards.push(temp);

  const startAnimation = index => {
    setIndexToAnimate(index);
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      animation.setValue(0);
    });
  };

  const animatedStyles = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          outputRange: [0, 10, -10, 10, -10, 0, 0, 0, 0, 0, 0],
        }),
      },
    ],
  };
  return (
    <View style={styles.container} >
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
        <View style={{ flex: 1 }}>
          <View style={styles.header}>
            <View style={{flex: 1}}>
              <Icon
                name="trophy"
                type="ionicon"
                size={25}
                color={Colors.WHITE}
              />
            </View>
            <Text20 
              text="Additional Rewards"
              textColor={Colors.WHITE}
              containerStyle={{flex: 4}}
            />
          </View>
        </View>

        {rewards.map((row, idx) => {
          return (
            <View style={{flex: 1, flexDirection: 'row', marginTop: 10}} key={idx} >
              {row.map((val, idx2) => {
                return (
                  <View style={{flex: 1}} key={idx2}>
                    <View style={styles.rewardsContainer}>
                      {val !== '' ? (
                        <TouchableOpacity onPress={() => startAnimation(val.icon)}>
                          <Animated.View key={val.icon} style={[ styles.animated, indexToAnimate === val.icon ? animatedStyles : null ]}>
                            <FastImage style={styles.image} source={{ uri: val.icon, priority: FastImage.priority.high }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </Animated.View>
                        </TouchableOpacity>
                      ) : null}
                    </View>

                    <Text14
                      text={val.title} 
                      textColor={Colors.BLACK4} 
                      containerStyle={styles.rewardText} 
                    />
                  </View>
                );
              })}
            </View>
          );
        })}
      
        <View style={styles.comingSoon}>
          <Text20 text={'Coming Soon!'} textColor={Colors.BLACK4} />
        </View>

      </TouchableOpacity>
    </View>
  );
};

export default AdditionalRewardsCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 20,
    backgroundColor: Colors.CARDS_COLOR2,
    borderRadius: 10,
    padding: 10,
    elevation: 1
  },
  header: {
    flex: 1,
    flexDirection: 'row',
    borderColor: Colors.BLACK1,
    paddingVertical: 10,
  },
  animated: {
    borderRadius: 70,
    borderWidth: 1,
    borderColor: Colors.ORANGE,
    padding: 7,
    marginTop: 10
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 70,
  },
  rewardsContainer: {
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rewardText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  comingSoon: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    marginTop: 10 
  }
})
