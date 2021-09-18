import React from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const RewardsCarousal = ({data, onPress}) => {
  const rewards = data.map((val, idx) => {
<<<<<<< HEAD
    console.log(val);
    return (
      <View style={{flex: 1}} key={idx}>
        <TouchableOpacity
          disabled={!val.is_passed}
          activeOpacity={0.8}
          onPress={() => onPress(idx)}>
=======
    return val.is_passed ? (
      <View style={{flex: 1}} key={idx}>
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(val)}>
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
          <View
            style={{
              flex: 1,
              alignItems: 'center',
              marginHorizontal: 10,
              marginVertical: 5,
            }}>
            <FastImage
              style={{
                width: 90,
                height: 90,
                borderRadius: 90,
<<<<<<< HEAD
                opacity: val.is_passed ? 1 : 0.1,
                backgroundColor: val.is_passed ? Colors.TRANSPARENT : 'grey',
=======
                opacity: 1,
                backgroundColor: Colors.TRANSPARENT,
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
              }}
              source={{
                uri: val.icon,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View
            style={{
              alignItems: 'center',
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View style={{width: '10%'}} />
            <View
              style={{
                width: '80%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text14
                text={val.title}
<<<<<<< HEAD
                textColor={val.is_passed ? Colors.BLACK4 : Colors.BLACK2}
=======
                textColor={Colors.BLACK4}
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
                textStyle={{textAlign: 'center'}}
              />
            </View>
            <View style={{width: '10%'}} />
          </View>
        </TouchableOpacity>
      </View>
<<<<<<< HEAD
    );
=======
    ) : null;
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
  });

  return (
    <View style={{flex: 1, paddingBottom: 10}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        onScroll={() => {}}>
        {rewards}
      </ScrollView>
    </View>
  );
};

export default RewardsCarousal;
