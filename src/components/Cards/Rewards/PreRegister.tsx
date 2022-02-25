import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

import {Colors} from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import StyledButton from '../../Button/StyledButton';
import { FONTS } from '../../../utils/constants/fonts';

const PreRegister = () => {
  const [email, setEmail] = useState('');
  const submitHandler = () => {};

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'column'}}>
          <Text16Normal
            textColor={Colors.TEXTDARK}
            text={'Pre-register for physical gifts'}
            containerStyle={styles.header}
            textStyle={FONTS.SEMIBOLD}
          />

          <View style={{ flexDirection: 'row', marginBottom: 5 }}>
            <View style={styles.input}>
              <TextInput
                value={email}
                placeholder="Email Id"
                placeholderTextColor={Colors.BLACK3}
                onChangeText={text => setEmail(text)}
                style={styles.textInput}
              />
            </View>
            <View style={styles.buttonContainer}>
              <StyledButton text="SUBMIT" onPress={() => submitHandler()} buttonStyle={{ paddingVertical: 7 }} />
            </View>
          </View>
      </View>
    </View>
  );
};

export default PreRegister;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    elevation: 3,
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  input: {
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.BLACK3,
    borderRadius: 10,
    color: Colors.TEXTDARK,
    padding: 8,
    fontSize: 16,
  },
  buttonContainer: {
    width: '30%',
    justifyContent: 'center',
  }
})