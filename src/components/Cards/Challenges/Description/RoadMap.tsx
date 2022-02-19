import React from 'react';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../../utils/colors';
import { FONTS } from '../../../../utils/constants/fonts';
import Text20 from '../../../Text/Text20';

const RoadMapCard = ({roadMap, roadmapOnPressHandler}) => {
  return (
    <View style={styles.container}>
      <Text20 
        text={'Roadmap'} 
        textColor={Colors.TEXTDARK} 
        textStyle={FONTS.SEMIBOLD}
        containerStyle={styles.header} 
      />
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={roadmapOnPressHandler}>
          <FastImage 
            style={styles.image}
            source={{ uri: roadMap, priority: FastImage.priority.high }}
            resizeMode={FastImage.resizeMode.contain}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RoadMapCard;

const styles =
StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: Colors.TEXT,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
  },
  header: {
    width: '100%',
    paddingTop: 15,
    paddingLeft: 20,
  },
  imageContainer: {
    width: '100%',
    justifyContent: 'center',
  },
  image: {
    height: 200,
    borderRadius: 10,
    marginHorizontal: 20,
  }
})