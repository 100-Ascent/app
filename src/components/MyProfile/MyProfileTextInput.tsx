import React from 'react';
import {TextInput, View} from 'react-native';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import textInputStyles from '../../styles/MyProfileScreen/MyProfileTextInput';

interface Props {
  placeholderText: string;
}

const MyProfileTextInput: React.FC<Props> = ({placeholderText}) => {
  return (
    <View style={textInputStyles.editform}>
      <View style={textInputStyles.textfield}>
        <Text14 text={placeholderText} textColor={Colors.TEXTDARK} />
      </View>

      <TextInput
        style={textInputStyles.textInput}
        underlineColorAndroid={'transparent'}
        autoCorrect={false}
      />
    </View>
  );
};

export default MyProfileTextInput;
