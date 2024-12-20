import React from 'react';
import {Text, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import Text20 from '../Text/Text20';

const ProgressBar = ({distance}) => {
  const isCompleted = false;
  return (
    <View style={{flex: 1, marginHorizontal: 15}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          borderWidth: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          backgroundColor: Colors.CARDS_COLOR2,
          paddingVertical: 15,
        }}>
        <View style={{flex: 1}}>
          <Icon
            name="location-sharp"
            type="ionicon"
            size={30}
            color={Colors.WHITE}
          />
        </View>
        <View style={{flex: 4}}>
          <Text20 text="Distance Covered" textColor={Colors.WHITE} />
        </View>
      </View>

      <View
        style={{
          flex: 1,
          borderWidth: 0,
          borderBottomLeftRadius: 10,
          borderBottomRightRadius: 10,
          borderColor: Colors.BLACK1,
          backgroundColor: Colors.CARDS_COLOR1,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: `${distance}%`,
            backgroundColor: '#E06627',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomLeftRadius: 10,
            borderWidth: 0,
            borderBottomRightRadius: isCompleted ? 10 : 0,
          }}>
          {distance >= 15 ? (
            <Text14 text={`${distance} km`} textColor={Colors.TEXT} />
          ) : null}
        </View>
        {distance < 15 ? (
          <View style={{paddingLeft: 15}}>
            <Text14 text={`${distance} km`} textColor={Colors.TEXT} />
          </View>
        ) : null}
      </View>
    </View>
  );
};

export default ProgressBar;
