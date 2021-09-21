import React from 'react';
import {Text, View} from 'react-native';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';

const AboutChallengeCard = ({description}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 1,
      }}>
      <View style={{paddingTop: 10, paddingHorizontal: 20}}>
        <Text20
          text="Virtually Travel to Incredible India"
          textColor={Colors.TEXTDARK}
        />
      </View>
      {/* <View style={{paddingTop: 10, paddingHorizontal: 20}}>
        <Text14 text={description} textColor={Colors.TEXTDARK} />
      </View> */}
      <View style={{paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20}}>
        <Text14 text={description} textColor={Colors.TEXTDARK} />
      </View>
    </View>
  );
};

export default AboutChallengeCard;
