import React from 'react';
import {useState} from 'react';
import {Image, TouchableOpacity} from 'react-native';
import {View, StyleSheet, ScrollView, Dimensions} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import FunFactCard from '../Cards/MyChallengeScreen_FunFactCard';
import Text14 from '../Text/Text14';

const window = Dimensions.get('window');

const JourneySliderComponent = ({data, onPress, funfact}) => {
  const [currentOffset, setCurrentOffset] = useState(0);
  const [avgWidth, setWidth] = useState(0);
  const arrayColor = [
    '#9400d3',
    '#2c9bff',
    '#ffbd1b',
    '#ff7f00',
    '#000080',
    '#ff0000',
    '#633a0d',
  ];

  const handleScroll = e => {
    const x = (parseInt(e.nativeEvent.contentOffset.x) / 180) | 0;
    setCurrentOffset(x);
  };

  let cards = (
    <View style={{flexDirection: 'row', paddingTop: 30}}>
      {data.map((item, ii) => {
        return (
          <View style={[styles.card, {flex: 1, flexDirection: 'row'}]} key={ii}>
            <View style={{flex: 1}} />
            <View style={{flex: 2, alignItems: 'center'}}>
              <View
                style={{
                  flex: 1,
                  paddingHorizontal: 20,
                }}
                onLayout={event => {
                  var {x, y, width, height} = event.nativeEvent.layout;
                  setWidth(width);
                }}>
                <TouchableOpacity
                  disabled={!item.is_passed}
                  activeOpacity={item.is_passed ? 0.5 : 1}
                  onPress={() => onPress(item)}>
                  <View
                    style={{
                      borderWidth: 3,
                      borderColor:
                        arrayColor[
                          Math.floor(Math.random() * arrayColor.length)
                        ],
                      padding: 3,
                      borderRadius: 90,
                      backgroundColor: item.is_passed
                        ? Colors.TRANSPARENT
                        : Colors.BLACK5,
                      opacity: item.is_passed ? 1 : 0.2,
                    }}>
                    <FastImage
                      style={{
                        width: 90,
                        height: 90,
                        borderRadius: 90,
                      }}
                      source={{
                        uri: item.images[0],
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                </TouchableOpacity>
              </View>
              <View style={{flex: 1, paddingVertical: 20}}>
                <Text14 text={item.name} textColor={Colors.BLACK1} />
              </View>
            </View>
            <View
              style={{
                alignItems: 'center',
                // marginTop: 10,
                paddingTop: 30,
              }}>
              {ii !== data.length - 1 ? (
                <Icon
                  name="arrow-long-right"
                  type="entypo"
                  size={30}
                  color={Colors.ORANGE}
                />
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );

  return (
    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={5}
        onScroll={e => handleScroll(e)}>
        {cards}

        <View style={{padding: 20}} />
      </ScrollView>
      <FunFactCard fact={funfact} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
  },
});

export default JourneySliderComponent;
