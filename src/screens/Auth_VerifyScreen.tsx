import React, {useEffect} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';

import Background from '../components/Background/StyledBackground';
import BackgroundVector from '../components/Background/BackgroundVector';
import OTPCard from '../components/Cards/AuthScreen/VerifyScreen_OTPCard';
import RNStepIndicator from '../components/StepIndicator/RNStepIndicator';
import StyledButton from '../components/Button/StyledButton';
import Text14 from '../components/Text/Text14';
import Text16Bold from '../components/Text/Text16Bold';
import Text16Normal from '../components/Text/Text16Normal';

import AppIcon100Ascent from '../../assets/icons/app-icon.svg';
import {AWAITINGOTP, RESEND_OTP, VERIFY} from '../utils/constants/constants';
import {Colors} from '../utils/colors';
import globalStyles from '../styles/Global/styles';

interface Props {
  handleSetOtpArray: (array: string[]) => void;
  isVerifyDisabled: boolean;
  phoneNumber: string;
  onGoBack: () => void;
  onSignInClicked: (phoneNumber: any) => Promise<void>;
  onVerify: () => void;
  otpArray: string[];
  resendDisabled: boolean;
  startTimeMS: number;
}

const VerifyScreen: React.FC<Props> = ({
  handleSetOtpArray,
  isVerifyDisabled,
  phoneNumber,
  resendDisabled,
  onGoBack,
  onSignInClicked,
  onVerify,
  otpArray,
  startTimeMS,
}) => {
  useEffect(() => {
    onSignInClicked(phoneNumber);
  }, []);

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
                <View
                  style={{
                    flex: 3,
                    alignItems: 'center',
                    paddingTop: 10,
                  }}>
                  <View style={{}}>
                    <View style={{alignItems: 'center'}}>
                      <Text16Normal
                        text={`An OTP has been sent to the`}
                        textColor={Colors.TEXTDARK}
                      />
                    </View>
                    <View style={{alignItems: 'center', paddingTop: 5}}>
                      <Text16Normal
                        text={`following number`}
                        textColor={Colors.TEXTDARK}
                      />
                    </View>
                    <View style={{alignItems: 'center', paddingTop: 10}}>
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
                      onPress={() => onSignInClicked(phoneNumber)}
                      disabled={resendDisabled}>
                      <View>
                        <Text14
                          text={
                            resendDisabled
                              ? 'Resend OTP in ' + startTimeMS + ' sec'
                              : RESEND_OTP
                          }
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
                          height: 5,
                        },
                        shadowOpacity: 0.21,
                        shadowRadius: 10.16,
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
