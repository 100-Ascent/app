import React from 'react';
import {TextInput, View, StyleSheet} from 'react-native';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';

interface Props {
  placeholderText: string;
}

const MyProfileTextInput: React.FC<Props> = ({placeholderText}) => {
  return (
    <View style={styles.editform}>
      <View style={styles.textfield}>
        <Text14 text={placeholderText} textColor={Colors.TEXTDARK} />
      </View>

      <TextInput
        style={styles.textInput}
        underlineColorAndroid={'transparent'}
        autoCorrect={false}
      />
    </View>
  );
};

export default MyProfileTextInput;
const styles = StyleSheet.create({
  textfield: {
    marginVertical: 0,
    paddingVertical: 0,
  },

  textInput: {
    alignSelf: 'stretch',
    height: 30,
    marginBottom: 20,
    paddingBottom: 0,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  editform: {
    alignSelf: 'stretch',
  },
});
