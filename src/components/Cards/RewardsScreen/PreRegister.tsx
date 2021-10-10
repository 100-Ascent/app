import React, {useState} from 'react';
import {View, TextInput} from 'react-native';

import {Colors} from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import StyledButton from '../../Button/StyledButton';

const PreRegister = () => {
  const [email, setEmail] = useState('');
  const submitHandler = () => {};

  return (
    <View
      style={{
        marginHorizontal: 20,
        flex: 10,
        elevation: 2,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: Colors.TEXT,
      }}>
      <View style={{flex: 1, flexDirection: 'row'}}>
        <View style={{flex: 2}}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'flex-start',
              padding: 10,
            }}>
            <Text16Normal
              textColor={Colors.TEXTDARK}
              text={'Pre-register for physical gifts'}
            />
          </View>
          <View style={{flex: 1, flexDirection: 'row', marginBottom: 5}}>
            <View
              style={{
                width: '70%',
                alignItems: 'center',
                padding: 10,
              }}>
              <TextInput
                value={email}
                placeholder="Email Id"
                placeholderTextColor={Colors.BLACK3}
                onChangeText={text => setEmail(text)}
                style={{
                  width: '100%',
                  borderWidth: 1,
                  borderRadius: 10,
                  color: Colors.TEXTDARK,
                  padding: 8,
                  fontSize: 16,
                }}
              />
            </View>
            <View
              style={{
                justifyContent: 'center',
                flex: 4,
                marginBottom: 10,
                paddingTop: 8,
                paddingRight: 10,
                alignItems: 'stretch',
              }}>
              <StyledButton text="SUBMIT" onPress={() => submitHandler()} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PreRegister;
