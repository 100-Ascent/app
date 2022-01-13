import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {FONTS} from '../../utils/constants/fonts';
import Text16Normal from '../Text/Text16Normal';

interface Props {
    league: any;
}

const DemotedSeparator: React.FC<Props> = ({ league }) => {
  //State variables

  //Async functions

  //Component functions

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10
      }}>
      <Icon name="arrow-down" type="entypo" color={'#FF4B4C'} />
      <View style={{paddingHorizontal: 20}}>
        <Text16Normal
          text={ league.toUpperCase() + ' LEAGUE'}
          textColor={'#FF4B4C'}
          textStyle={FONTS.SEMIBOLD}
        />
      </View>
      <Icon name="arrow-down" type="entypo" color={'#FF4B4C'} />
    </View>
  );
};

export default DemotedSeparator;
