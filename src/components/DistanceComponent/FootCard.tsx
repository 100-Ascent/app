import React from 'react';
import {View} from 'react-native';
import Text14 from '../Text/Text14';
import FootIcon from '../../../assets/icons/CalMinStepsIcon/foot.svg';
import {Colors} from '../../utils/colors';

const FootCard = ({steps}) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View style={{flex: 1}}>
        <FootIcon />
      </View>
      <View style={{flex: 3, justifyContent: 'center'}}>
<<<<<<< HEAD
        {/* <Text14
          text={steps.length !== 0 ? `${steps}` : '---'}
          textColor={Colors.TEXTDARK}
        /> */}
=======
        <Text14
          text={steps.length !== 0 ? `${steps}` : '---'}
          textColor={Colors.TEXTDARK}
        />
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
      </View>
    </View>
  );
};

export default FootCard;
