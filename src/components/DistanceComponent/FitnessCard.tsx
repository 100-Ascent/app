import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import GoogleFitIcon from '../../../assets/icons/googlefit.svg';
import {Colors} from '../../utils/colors';

const FitnessCard = ({isGoogleFit}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
      <View style={{flex: 1, width: 30, height: 14}}>
        <GoogleFitIcon />
      </View>
      <View style={{flex: 7, justifyContent: 'flex-start'}}>
        <Text14
          text={isGoogleFit ? 'via Google Fit' : 'via Manual Entry'}
          textColor={Colors.TEXTDARK}
        />
      </View>
    </View>
  );
};

export default FitnessCard;
