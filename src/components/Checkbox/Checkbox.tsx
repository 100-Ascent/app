import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

const CheckBox = ({ value, onPress, isChecked }) => {
  return (
    <View style={{marginRight: 10}}>
      <TouchableOpacity activeOpacity={0.8} onPress={(e) => onPress(e, value)}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{padding: 5, alignItems: 'center' }}>
            <Icon
              name={ isChecked? 'radio-button-checked':'radio-button-unchecked'}
              type="material-icons"
              size={20}
            />
          </View>
          <View style={{paddingVertical: 5}}>
            <Text14 text={value} textColor={Colors.TEXTDARK} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckBox;
