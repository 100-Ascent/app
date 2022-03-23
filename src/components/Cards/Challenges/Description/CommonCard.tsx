import React from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../../utils/colors';
import { WIDTH } from '../../../../utils/constants/constants';
import Text14 from '../../../Text/Text14';
import Text20 from '../../../Text/Text20';

const CommonCard = ({data, imageOnPress}) => {

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.6} onPress={() => imageOnPress(data.image)}>
        <FastImage 
          style={styles.image}
          source={{ uri: data.image, priority: FastImage.priority.high }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </TouchableOpacity>
      <Text20 
        text={data.title}
        textColor={Colors.TEXTDARK}
        containerStyle={{ paddingHorizontal: 20 }}
      />
      <Text14 
        text={data.description} 
        textColor={Colors.TEXTDARK} 
        containerStyle={styles.description} 
      />
    </View>
  );
};

export default CommonCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.TEXT,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 3,
    // alignItems: 'center'
  },
  image: {
    height: 150,
    borderRadius: 10,
    margin: 8,
  },
  description: {
    paddingTop: 10, 
    paddingHorizontal: 20, 
    paddingBottom: 20
  }
})
