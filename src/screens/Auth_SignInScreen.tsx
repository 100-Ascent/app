import React from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import PhoneInput from 'react-native-phone-number-input';

import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import RNStepIndicator from '../components/StepIndicator/RNStepIndicator';
import StyledButton from '../components/Button/StyledButton';
import Text14 from '../components/Text/Text14';
import Text16Normal from '../components/Text/Text16Normal';

import AppIcon100Ascent from '../../assets/icons/app-icon.svg';
import {Colors} from '../utils/colors';
import {
  NUMBER_ERROR,
  PROCEED,
  SIGNIN_PHONE,
} from '../utils/constants/constants';

import globalStyles from '../styles/Global/styles';
import styles from '../styles/SignInScreen/styles';

interface Props {
  error: boolean;
  phoneInput: any;
  setError: any;
  onChangeCountry: (text: string) => void;
  onChangeFormattedText: (text: string) => void;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
}

const SignInScreen: React.FC<Props> = ({
  phoneInput,
  onChangeText,
  onChangeFormattedText,
  onChangeCountry,
  onSubmit,
  error,
  setError,
}) => {
  return (
    <View style={globalStyles.flex}>
      <Background startColor={Colors.TEXT} endColor={Colors.TEXT}>
        <View style={globalStyles.flex}>
          <KeyboardAvoidingView
            behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 65}
            enabled={Platform.OS === 'ios' ? true : false}
            style={[globalStyles.flex, globalStyles.flexColumnJustifyCenter]}>
            <ScrollView
              style={globalStyles.flex}
              contentContainerStyle={{flexGrow: 1}}
              keyboardShouldPersistTaps="handled">
              <View style={globalStyles.flex}>
                <BackgroundVector />
                <View
                  style={[
                    globalStyles.flex,
                    globalStyles.flexAllCenter,
                    {zIndex: 1},
                  ]}>
                  <AppIcon100Ascent />
                </View>
                <View style={styles.phoneInput}>
                  <View style={{marginBottom: 10}}>
                    <Text16Normal
                      textColor={Colors.TEXTDARK}
                      text={SIGNIN_PHONE}
                    />
                  </View>
                  <PhoneInput
                    ref={phoneInput}
                    defaultValue={''}
                    defaultCode="IN"
                    layout="first"
                    onChangeText={text => {
                      onChangeText(text);
                      setError(false);
                    }}
                    onChangeFormattedText={text => {
                      onChangeFormattedText(text);
                      onChangeCountry(
                        phoneInput.current?.getCountryCode() || '',
                      );
                    }}
                    // withDarkTheme
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
                      paddingVertical: 0,
                      borderLeftWidth: 1,
                      marginVertical: 8,
                      borderLeftColor: Colors.BLACK3,
                      paddingLeft: 10,
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
                  {error ? (
                    <View
                      style={{
                        width: '100%',
                        paddingHorizontal: 40,
                        marginTop: 5,
                      }}>
                      <Text14
                        text={NUMBER_ERROR}
                        textColor={Colors.POPUP_RED}
                      />
                    </View>
                  ) : null}
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
                  <View style={globalStyles.flex} />
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
                  <View style={globalStyles.flex} />
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
