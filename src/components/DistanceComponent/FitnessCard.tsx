import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import GoogleFitIcon from '../../../assets/icons/googlefit.svg';
import {Colors} from '../../utils/colors';

const FitnessCard = ({isGoogleFit}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <GoogleFitIcon />
      </View>
      <View style={{flex: 4, justifyContent: 'center'}}>
        <Text14
          text={isGoogleFit ? 'via Google Fit' : 'via Manual Entry'}
          textColor={Colors.TEXTDARK}
        />
      </View>
    </View>
  );
};

export default FitnessCard;
