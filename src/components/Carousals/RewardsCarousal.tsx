import React from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const RewardsCarousal = ({data, onPress}) => {
  const rewards = data.map((val, idx) => {
    console.log(val);
    return (
      <View style={{flex: 1}} key={idx}>
        <TouchableOpacity
          disabled={!val.is_passed}
          activeOpacity={0.8}
          onPress={() => onPress(idx)}>
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
                opacity: val.is_passed ? 1 : 0.1,
                backgroundColor: val.is_passed ? Colors.TRANSPARENT : 'grey',
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
                textColor={val.is_passed ? Colors.BLACK4 : Colors.BLACK2}
                textStyle={{textAlign: 'center'}}
              />
            </View>
            <View style={{width: '10%'}} />
          </View>
        </TouchableOpacity>
      </View>
    );
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
