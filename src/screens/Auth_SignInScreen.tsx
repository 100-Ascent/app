import React, {useRef, useState} from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import Background from '../components/Background/StyledBackground';
import StyledButton from '../components/Button/StyledButton';
import PhoneInput from 'react-native-phone-number-input';
import {Colors} from '../utils/colors';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import AppIcon100Ascent from '../../assets/icons/app-icon.svg';
import Text14 from '../components/Text/Text14';
import {PROCEED, SIGNIN_PHONE} from '../utils/constants';
import RNStepIndicator from '../components/StepIndicator/RNStepIndicator';

interface Props {
  phoneInput: any;
  value: any;
  onChangeText: (text: string) => void;
  onChangeFormattedText: (text: string) => void;
  onChangeCountry: any;
  onSubmit: () => void;
}

const SignInScreen: React.FC<Props> = ({
  phoneInput,
  value,
  onChangeText,
  onChangeFormattedText,
  onChangeCountry,
  onSubmit,
}) => {
  return (
    <View style={{flex: 1}}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        <View style={{flex: 1}}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 65}
            enabled={Platform.OS === 'ios' ? true : false}
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
            }}>
            <ScrollView
              style={{flex: 1}}
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled">
              <View style={{flex: 1}}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1,
                  }}>
                  <AppIcon100Ascent />
                </View>
                <View
                  style={{
                    flex: 3,
                    alignItems: 'center',
                    paddingTop: 30,
                  }}>
                  <View style={{marginBottom: 10}}>
                    <Text14 textColor={Colors.TEXTDARK} text={SIGNIN_PHONE} />
                  </View>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={''}
                    defaultCode="IN"
                    layout="first"
                    onChangeText={text => {
                      onChangeText(text);
                    }}
                    onChangeFormattedText={text => {
                      onChangeFormattedText(text);
                      onChangeCountry(
                        phoneInput.current?.getCountryCode() || '',
                      );
                    }}
                    //   withDarkTheme
                    containerStyle={{
                      borderRadius: 20,
                      borderWidth: 1,
                      backgroundColor: Colors.TRANSPARENT,
                    }}
                    textContainerStyle={{
                      borderTopRightRadius: 20,
                      borderBottomRightRadius: 20,
                      backgroundColor: Colors.TRANSPARENT,
                      borderLeftWidth: 1,
                      borderBottomColor: Colors.TEXTDARK,
                      paddingVertical: 0,
                      paddingLeft: 10,
                    }}
                    textInputStyle={{
                      fontSize: 18,
                      color: Colors.TEXTDARK,
                      paddingHorizontal: 0,
                    }}
                    textInputProps={{
                      selectionColor: Colors.TEXTDARK,
                      placeholderTextColor: Colors.TRANSPARENT,
                    }}
                    codeTextStyle={{
                      fontSize: 18,
                      color: Colors.TEXTDARK,
                    }}
                    renderDropdownImage={
                      <View>
                        <Icon
                          name="caret-down"
                          type="font-awesome"
                          size={18}
                          color={Colors.TEXTDARK}
                        />
                      </View>
                    }
                  />
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom: 30,
                  }}>
                  <RNStepIndicator stepCount={3} currentStep={1} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}} />
                  <View style={{flex: 2}}>
                    <StyledButton
                      buttonStyle={{
                        backgroundColor: Colors.POPUP_RED,
                        shadowColor: Colors.POPUP_RED,
                        shadowOffset: {
                          width: 0,
                          height: 10,
                        },
                        shadowOpacity: 0.51,
                        shadowRadius: 13.16,
                      }}
                      text={PROCEED}
                      onPress={onSubmit}
                    />
                  </View>
                  <View style={{flex: 1}} />
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Background>
    </View>
  );
};

export default SignInScreen;
