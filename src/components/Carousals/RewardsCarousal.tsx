import React from 'react';
<<<<<<< HEAD
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const RewardsCarousal = ({data, onPress}) => {
  const rewards = data.map((val, idx) => {
    return val.is_passed ? (
      <View style={{flex: 1}} key={idx}>
=======
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Colors } from '../../utils/colors';
import Text14 from '../Text/Text14';

const RewardsCarousal = ({ data, onPress }) => {
  const rewards = data.map((val, idx) => {
    return val.is_passed ? (
      <View style={{ flex: 1 }} key={idx}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
        <TouchableOpacity activeOpacity={0.8} onPress={() => onPress(val)}>
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
                opacity: 1,
                backgroundColor: Colors.TRANSPARENT,
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
<<<<<<< HEAD
            <View style={{width: '10%'}} />
=======
            <View style={{ width: '10%' }} />
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
            <View
              style={{
                width: '80%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text14
                text={val.title}
                textColor={Colors.BLACK4}
<<<<<<< HEAD
                textStyle={{textAlign: 'center'}}
              />
            </View>
            <View style={{width: '10%'}} />
=======
                textStyle={{ textAlign: 'center' }}
              />
            </View>
            <View style={{ width: '10%' }} />
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
  });

  return (
<<<<<<< HEAD
    <View style={{flex: 1, paddingBottom: 10}}>
      <ScrollView
        contentContainerStyle={{flexGrow: 1}}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        onScroll={() => {}}>
=======
    <View style={{ flex: 1, paddingBottom: 10 }}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        onScroll={() => { }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
        {rewards}
      </ScrollView>
    </View>
  );
};

export default RewardsCarousal;
