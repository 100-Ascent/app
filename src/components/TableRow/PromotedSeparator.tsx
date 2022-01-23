import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {FONTS} from '../../utils/constants/fonts';
import Text16Normal from '../Text/Text16Normal';

interface Props {
    league: any;
}

const PromotedSeparator: React.FC<Props> = ({league}) => {
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
      <Icon name="arrow-up" type="entypo" color={'#58A700'} />
      <View style={{paddingHorizontal: 20}}>
        <Text16Normal
          text={league.toUpperCase()+ ' LEAGUE'}
          textColor={'#58A700'}
          textStyle={FONTS.SEMIBOLD}
        />
      </View>
      <Icon name="arrow-up" type="entypo" color={'#58A700'} />
    </View>
  );
};

export default PromotedSeparator;
