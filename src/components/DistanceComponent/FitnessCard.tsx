import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import GoogleFitIcon from '../../../assets/icons/googlefit.svg';
import {Colors} from '../../utils/colors';
import { STREAM } from '../../utils/constants/constants';

const FitnessCard = ({stream}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}}>
      <View style={{flex: 1, width: 30, height: 14}}>
        <GoogleFitIcon />
      </View>
      <View style={{flex: 7, justifyContent: 'flex-start'}}>
        <Text14
          text={ "via " + (stream.toLowerCase() !== STREAM.MANUAL.toLowerCase() ? STREAM.GOOGLE_FIT : STREAM.MANUAL + " entry" )  }
          textColor={Colors.TEXTDARK}
        />
      </View>
    </View>
  );
};

export default FitnessCard;
