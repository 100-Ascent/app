import React from 'react';
import {Image, ScrollView, TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const RewardsCarousal = ({data, onPress}) => {
  const rewards = data.map((val, idx) => {
    return val.is_passed ? (
      <View style={{flex: 1}} key={idx}>
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
            <View style={{width: '10%'}} />
            <View
              style={{
                width: '80%',
                alignContent: 'center',
                justifyContent: 'center',
              }}>
              <Text14
                text={val.title}
                textColor={Colors.BLACK4}
                textStyle={{textAlign: 'center'}}
              />
            </View>
            <View style={{width: '10%'}} />
          </View>
        </TouchableOpacity>
      </View>
    ) : null;
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
