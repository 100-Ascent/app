import React, {useRef} from 'react';
import {useState} from 'react';
import {Platform, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';

interface Props {
  otpArray: string[];
  handleSetOtpArray: (array: string[]) => void;
}

const OTPCard: React.FC<Props> = ({otpArray, handleSetOtpArray}) => {
  const firstTextInputRef = useRef(null);
  const secondTextInputRef = useRef(null);
  const thirdTextInputRef = useRef(null);
  const fourthTextInputRef = useRef(null);
  const fifthTextInputRef = useRef(null);
  const sixthTextInputRef = useRef(null);

  const refCallback = textInputRef => node => {
    textInputRef.current = node;
  };

  const onOtpChange = index => {
    return value => {
      if (isNaN(Number(value))) {
        return;
      }
      const otpArrayCopy = otpArray.concat();
      otpArrayCopy[index] = value;
      handleSetOtpArray(otpArrayCopy);

      if (value !== '') {
        if (index === 0) {
          secondTextInputRef.current.focus();
        } else if (index === 1) {
          thirdTextInputRef.current.focus();
        } else if (index === 2) {
          fourthTextInputRef.current.focus();
        } else if (index === 3) {
          fifthTextInputRef.current.focus();
        } else if (index === 4) {
          sixthTextInputRef.current.focus();
        }
      }
    };
  };
  const onOtpKeyPress = index => {
    return ({nativeEvent: {key: value}}) => {
      if (value === 'Backspace' && otpArray[index] === '') {
        if (index === 1) {
          firstTextInputRef.current.focus();
        } else if (index === 2) {
          secondTextInputRef.current.focus();
        } else if (index === 3) {
          thirdTextInputRef.current.focus();
        } else if (index === 4) {
          fourthTextInputRef.current.focus();
        } else if (index === 5) {
          fifthTextInputRef.current.focus();
        }
        if (Platform.OS === 'android' && index > 0) {
          const otpArrayCopy = otpArray.concat();
          otpArrayCopy[index - 1] = '';
          handleSetOtpArray(otpArrayCopy);
        }
      }
    };
  };
  const data = [
    firstTextInputRef,
    secondTextInputRef,
    thirdTextInputRef,
    fourthTextInputRef,
    fifthTextInputRef,
    sixthTextInputRef,
  ].map((textInputRef, idx) => {
    return (
      <View
        style={{
          marginHorizontal: 5,
        }}
        key={idx}>
        <TextInput
          value={otpArray[idx]}
          keyboardType={'numeric'}
          // autoFocus={idx === 0 ? true : undefined}
          ref={refCallback(textInputRef)}
          onChangeText={onOtpChange(idx)}
          onKeyPress={onOtpKeyPress(idx)}
          maxLength={1}
          style={{
            padding: 10,
            fontSize: 18,
            borderWidth: 1,
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            borderRadius: 10,
            color: Colors.TEXTDARK,
          }}
          selectionColor={Colors.TEXTDARK}
        />
      </View>
    );
  });
  return (
    <View>
      <View style={{alignItems: 'center'}}>
        {/* <Text16Normal
          text={'PLEASE ENTER THE OTP'}
          textColor={Colors.TEXTDARK}
        /> */}
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>{data}</View>
    </View>
  );
};

export default OTPCard;
