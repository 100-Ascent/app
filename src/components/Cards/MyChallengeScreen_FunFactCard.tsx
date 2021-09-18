import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import Text16Normal from '../Text/Text16Normal';

const FunFactCard = ({fact}) => {
  return (
    <LinearGradient
      start={{x: 0, y: 0}}
      end={{x: 1, y: 0}}
      colors={['#026E8D', '#308FD7']}>
      <View
        style={{
          flex: 1,
          elevation: 1,
        }}>
        <View style={{flex: 1, paddingHorizontal: 25, paddingTop: 15}}>
          <Text16Normal text="Fun Fact" textColor={Colors.WHITE} />
        </View>
        <View style={{flex: 1, paddingHorizontal: 25, paddingVertical: 15}}>
          <Text14 text={fact} textColor={Colors.WHITE} />
        </View>
      </View>
    </LinearGradient>
  );
};

export default FunFactCard;
