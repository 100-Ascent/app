import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';

const CommonCard = ({data, imageOnPress}) => {
  // console.log(data);
  return (
    <View
      style={{
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 1,
      }}>
      <View style={{flex: 1}}>
        <TouchableOpacity onPress={() => imageOnPress(data.image)}>
          <FastImage
            style={{
              height: 150,
              borderRadius: 10,
              margin: 8,
            }}
            source={{
              uri: data.image,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20}}>
        <Text20 text={data.title} textColor={Colors.TEXTDARK} />
      </View>
      <View style={{paddingTop: 10, paddingHorizontal: 20, paddingBottom: 10}}>
        <Text14 text={data.description} textColor={Colors.TEXTDARK} />
      </View>
    </View>
  );
};

export default CommonCard;
