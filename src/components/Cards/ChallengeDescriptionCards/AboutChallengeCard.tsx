import React from 'react';
<<<<<<< HEAD
import {Text, View} from 'react-native';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';

const AboutChallengeCard = ({description}) => {
=======
import { Text, View } from 'react-native';
import { Colors } from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';

const AboutChallengeCard = ({ description }) => {
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
  return (
    <View
      style={{
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 1,
      }}>
<<<<<<< HEAD
      <View style={{paddingTop: 10, alignItems: 'center'}}>
=======
      <View style={{ paddingTop: 10, paddingHorizontal: 20 }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
        <Text20
          text="Virtually Travel to Incredible India"
          textColor={Colors.TEXTDARK}
        />
      </View>
      {/* <View style={{paddingTop: 10, paddingHorizontal: 20}}>
        <Text14 text={description} textColor={Colors.TEXTDARK} />
      </View> */}
<<<<<<< HEAD
      <View style={{paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20}}>
=======
      <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20 }}>
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
        <Text14 text={description} textColor={Colors.TEXTDARK} />
      </View>
    </View>
  );
};

export default AboutChallengeCard;
