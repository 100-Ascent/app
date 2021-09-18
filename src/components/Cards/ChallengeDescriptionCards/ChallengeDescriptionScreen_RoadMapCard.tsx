import React from 'react';
import { Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../utils/colors';
import Text20 from '../../Text/Text20';

const RoadMapCard = ({ roadMap, roadmapOnPressHandler }) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 1,
      }}>
      <View
        style={{
          width: '100%',
          paddingTop: 15,
          paddingLeft: 20,
        }}>
        <Text20 text={'Roadmap'} textColor={Colors.TEXTDARK} />
      </View>
      <View
        style={{
          width: '100%',
          height: 220,
          justifyContent: 'center',
        }}>
        <TouchableOpacity onPress={roadmapOnPressHandler}>
          <FastImage
            style={{
              height: 200,
              borderRadius: 10,
              marginHorizontal: 20,
            }}
            source={{
              uri: roadMap,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>

      </View>
    </View>
  );
};

export default RoadMapCard;
