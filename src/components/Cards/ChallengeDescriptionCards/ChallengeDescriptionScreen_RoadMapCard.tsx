import React from 'react';
<<<<<<< HEAD
import {Dimensions, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../utils/colors';
import Text20 from '../../Text/Text20';

const RoadMapCard = ({roadMap}) => {
=======
import { Dimensions, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../../utils/colors';
import Text20 from '../../Text/Text20';

const RoadMapCard = ({ roadMap, roadmapOnPressHandler }) => {
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
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
<<<<<<< HEAD
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
=======
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

>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
      </View>
    </View>
  );
};

export default RoadMapCard;
