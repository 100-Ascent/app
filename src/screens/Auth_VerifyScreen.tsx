import React, {useState} from 'react';
import {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../components/Background/StyledBackground';
import StyledButton from '../components/Button/StyledButton';
import Text16Normal from '../components/Text/Text16Normal';
import {Colors} from '../utils/colors';
import AppIcon100Ascent from '../../assets/icons/app-icon.svg';
import Text16Bold from '../components/Text/Text16Bold';
import OTPCard from '../components/Cards/AuthScreen/VerifyScreen_OTPCard';
import {AWAITINGOTP, RESEND_OTP, VERIFY} from '../utils/constants';
import RNStepIndicator from '../components/StepIndicator/RNStepIndicator';
import Text14 from '../components/Text/Text14';
import BackgroundVector from '../components/Background/BackgroundVector';

interface Props {
  phoneNumber: string;
  onVerify: () => void;
  onSignInClicked: (phoneNumber: any) => Promise<void>;
  otpArray: string[];
  handleSetOtpArray: (array: string[]) => void;
  isVerifyDisabled: boolean;
  onGoBack: () => void;
}

const VerifyScreen: React.FC<Props> = ({
  phoneNumber,
  onVerify,
  onSignInClicked,
  otpArray,
  handleSetOtpArray,
  isVerifyDisabled,
  onGoBack,
}) => {
  useEffect(() => {
    onSignInClicked(phoneNumber);
  }, []);

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
                <BackgroundVector />
                <View
                  style={{
                    flex: 1,
                    zIndex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AppIcon100Ascent />
                </View>
                <View
                  style={{
                    flex: 3,
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <View style={{}}>
                    <View style={{alignItems: 'center'}}>
                      <Text16Normal
                        text={`AN OTP HAS BEEN SENT TO THE`}
                        textColor={Colors.TEXTDARK}
                      />
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text16Normal
                        text={`MOBILE NUMBER`}
                        textColor={Colors.TEXTDARK}
                      />
                    </View>
                    <View style={{alignItems: 'center'}}>
                      <Text16Bold
                        text={`${phoneNumber}`}
                        textColor={Colors.TEXTDARK}
                      />
                    </View>
                  </View>
                  <View style={{paddingTop: 30}}>
                    <OTPCard
                      otpArray={otpArray}
                      handleSetOtpArray={handleSetOtpArray}
                    />
                  </View>
                  <View
                    style={{
                      alignItems: 'flex-end',
                      width: '100%',
                      paddingHorizontal: 40,
                      paddingTop: 20,
                    }}>
                    <TouchableOpacity
                      onPress={() => onSignInClicked(phoneNumber)}>
                      <View>
                        <Text14
                          text={RESEND_OTP}
                          textColor={Colors.TEXT2}
                          textStyle={{
                            borderBottomWidth: 1,
                            borderBottomColor: Colors.BLACK6,
                          }}
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flex: 2,
                    justifyContent: 'flex-end',
                    paddingBottom: 30,
                  }}>
                  <RNStepIndicator stepCount={3} currentStep={2} />
                </View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}} />
                  <View style={{flex: 2}}>
                    <StyledButton
                      buttonStyle={{
                        backgroundColor: isVerifyDisabled
                          ? Colors.BLACK6
                          : Colors.POPUP_RED,
                        shadowColor: Colors.POPUP_RED,
                        shadowOffset: {
                          width: 0,
                          height: 10,
                        },
                        shadowOpacity: 0.51,
                        shadowRadius: 13.16,
                      }}
                      text={isVerifyDisabled ? AWAITINGOTP : VERIFY}
                      onPress={onVerify}
                      disabled={isVerifyDisabled}
                    />
                  </View>
                  <View style={{flex: 1}} />
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <TouchableOpacity onPress={onGoBack}>
                    <Text14 text={'GO BACK'} textColor={'#666666'} />
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Background>
    </View>
  );
};

export default VerifyScreen;
