import React from 'react';
<<<<<<< HEAD
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../utils/colors';
=======
import { useState, useRef } from 'react';
import { TouchableOpacity, View, Animated, Easing } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import { Colors } from '../../../utils/colors';
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';
import FastImage from 'react-native-fast-image';

<<<<<<< HEAD
const AdditionalRewardsCard = ({data}) => {
=======
const AdditionalRewardsCard = ({ data }) => {
  const [animation] = useState(new Animated.Value(0));
  const [indexToAnimate, setIndexToAnimate] = useState('');
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
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

<<<<<<< HEAD
=======
  const startAnimation = (index) => {
    setIndexToAnimate(index)
    animation.setValue(0);
    Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      easing: Easing.linear,
      useNativeDriver: true
    }).start(() => {
      animation.setValue(0)
    });
  }

  const animatedStyles = {
    transform: [
      {
        translateX: animation.interpolate({
          inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
          outputRange: [0, 10, -10, 10, -10, 0, 0, 0, 0, 0, 0]
        })
      },
    ]
  }
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
  return (
    <View
      style={{
        flex: 1,
        marginHorizontal: 15,
        backgroundColor: Colors.CARDS_COLOR2,
        borderRadius: 10,
        padding: 10,
      }}>
<<<<<<< HEAD
      <TouchableOpacity activeOpacity={0.8} onPress={() => {}}>
=======
      <TouchableOpacity activeOpacity={0.8} onPress={() => { }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
        <View
          style={{
            flex: 1,
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              borderColor: Colors.BLACK1,
              paddingVertical: 10,
            }}>
<<<<<<< HEAD
            <View style={{flex: 1}}>
=======
            <View style={{ flex: 1 }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
              <Icon
                name="trophy"
                type="ionicon"
                size={25}
                color={Colors.WHITE}
              />
            </View>
<<<<<<< HEAD
            <View style={{flex: 4}}>
=======
            <View style={{ flex: 4 }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
              <Text20 text="Additional Rewards" textColor={Colors.WHITE} />
            </View>
          </View>
        </View>

<<<<<<< HEAD
        <View style={{flex: 1}}>
          {rewards.map((row, idx) => {
            return (
              <View
                style={{flex: 1, flexDirection: 'row', marginTop: 10}}
                key={idx}>
                {row.map((val, idx2) => {
                  return (
                    <View style={{flex: 1}} key={idx2}>
=======
        <View style={{ flex: 1 }}>
          {rewards.map((row, idx) => {
            return (
              <View
                style={{ flex: 1, flexDirection: 'row', marginTop: 10 }}
                key={idx}>
                {row.map((val, idx2) => {
                  return (
                    <View style={{ flex: 1 }} key={idx2}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
                      <View
                        style={{
                          marginHorizontal: 10,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        {val !== '' ? (
<<<<<<< HEAD
                          <View
                            style={{
                              borderRadius: 70,
                              borderWidth: 1,
                              borderColor: Colors.ORANGE,
                              padding: 7,
                            }}>
                            <FastImage
                              style={{width: 70, height: 70, borderRadius: 70}}
                              source={{
                                uri: val.icon,
                                priority: FastImage.priority.high,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </View>
=======
                          <TouchableOpacity onPress={() => startAnimation(val.icon)} >
                            <Animated.View
                              key={val.icon}
                              style={[{
                                borderRadius: 70,
                                borderWidth: 1,
                                borderColor: Colors.ORANGE,
                                padding: 7,
                              }, indexToAnimate === val.icon ? animatedStyles : null]} >

                              <FastImage
                                style={{ width: 70, height: 70, borderRadius: 70 }}
                                source={{
                                  uri: val.icon,
                                  priority: FastImage.priority.high,
                                }}
                                resizeMode={FastImage.resizeMode.cover}
                              />
                            </Animated.View>
                          </TouchableOpacity>

>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
                        ) : null}
                      </View>
                      <View
                        style={{
                          flex: 1,
                          justifyContent: 'center',
                          alignItems: 'center',
                          paddingHorizontal: 10,
                          marginTop: 10,
                        }}>
                        <Text14 text={val.title} textColor={Colors.BLACK4} />
                      </View>
                    </View>
                  );
                })}
              </View>
            );
          })}

          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              paddingVertical: 15,
            }}>
            <Text20 text={'Coming Soon!'} textColor={Colors.BLACK4} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default AdditionalRewardsCard;
