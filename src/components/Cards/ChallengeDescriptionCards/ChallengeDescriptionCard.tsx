import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';

const ChallengeDescriptionCard = ({description}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 1,
      }}>
      <View style={{paddingTop: 10, paddingLeft: 20}}>
        <Text20 text="Description" textColor={Colors.TEXTDARK} />
      </View>
      <View style={{paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20}}>
        <Text14 text={description} textColor={Colors.TEXTDARK} />
      </View>
    </View>
  );
};

export default ChallengeDescriptionCard;
