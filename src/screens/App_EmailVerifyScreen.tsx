import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../components/Background/StyledBackground';
import StyledButton from '../components/Button/StyledButton';
import Text16Normal from '../components/Text/Text16Normal';
import {Colors} from '../utils/colors';
import AppIcon100Ascent from '../../assets/icons/app-icon.svg';
import axios from 'axios';
import {
  EMAIL,
  EMAIL_VERIFICATION_SENT_AFTER_1,
  EMAIL_VERIFICATION_SENT_AFTER_2,
  EMAIL_VERIFICATION_SENT_BEFORE,
  FIRSTNAME,
  LASTNAME,
  PROCEED,
  VALID_EMAIL_ERROR,
} from '../utils/constants/constants';
import Text16Bold from '../components/Text/Text16Bold';
import RNStepIndicator from '../components/StepIndicator/RNStepIndicator';
import Text14 from '../components/Text/Text14';
import BackgroundVector from '../components/Background/BackgroundVector';

const EmailVerifyScreen = ({setIsEmailVerifiedToTrue}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [isProceedDisabled, setProceedDisabled] = useState(true);
  const [isEmailSentMessage, setEmailSentMessage] = useState(false);
  const [error, setError] = useState(false);
  const [resendOTPDisabled, setResendOTPDisabled] = useState(true);
  const [startTimeMS, setStartTimeMS] = useState(0);

  const countdown = () => {
    var seconds = 20;
    function tick() {
      seconds--;
      setStartTimeMS(seconds);
      if (seconds > 0) {
        setTimeout(tick, 1000);
      } else {
        setResendOTPDisabled(false);
      }
    }
    tick();
  };

  const validateEmail = email => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const callToVerifyEmail = () => {
    let isEverythingOk = true;
    if (!validateEmail(email)) {
      setError(true);
      isEverythingOk = false;
    }

    if (isEverythingOk) {
      axios
        .post('/api/updateEmail', {
          email: email,
          first_name: 'test',
          last_name: 'user',
        })
        .then(async res => {
          console.log(res.data.data.success);
          if (res.data.data.success) {
            setProceedDisabled(false);
            setEmailSentMessage(true);
            setResendOTPDisabled(true);
            countdown();
          }
        })
        .catch(err => {
          console.log('failed');
          console.log(err);
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
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

                <View style={{flex: 3}}>
                  {isEmailSentMessage ? (
                    <View style={{flex: 1}}>
                      <View
                        style={{flex: 1, alignItems: 'center', marginTop: 20}}>
                        <View style={{paddingTop: 10}}>
                          <Text16Normal
                            text={EMAIL_VERIFICATION_SENT_BEFORE}
                            textColor={Colors.TEXTDARK}
                          />
                        </View>
                        <View style={{paddingVertical: 10}}>
                          <Text16Bold
                            text={email}
                            textColor={Colors.TEXTDARK}
                          />
                        </View>
                        <View style={{paddingVertical: 3}}>
                          <Text16Normal
                            text={EMAIL_VERIFICATION_SENT_AFTER_1}
                            textColor={Colors.TEXTDARK}
                          />
                        </View>
                        <View style={{paddingVertical: 3}}>
                          <Text16Normal
                            text={EMAIL_VERIFICATION_SENT_AFTER_2}
                            textColor={Colors.TEXTDARK}
                          />
                        </View>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            width: '100%',
                            paddingHorizontal: 45,
                            paddingTop: 40,
                          }}>
                          <TouchableOpacity
                            onPress={callToVerifyEmail}
                            disabled={resendOTPDisabled}>
                            <View>
                              <Text14
                                text={
                                  resendOTPDisabled
                                    ? 'Resend link in ' + startTimeMS + ' sec'
                                    : 'Resend link'
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
                    </View>
                  ) : (
                    <>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                        }}>
                        <View
                          style={{flex: 1, marginLeft: 30, marginRight: 15}}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                            }}>
                            <Text16Normal
                              text={FIRSTNAME}
                              textColor={Colors.TEXTDARK}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <TextInput
                              value={firstName}
                              onChangeText={text => {
                                setFirstName(text);
                                setProceedDisabled(
                                  email.length === 0 ||
                                    text.length === 0 ||
                                    lastName.length === 0,
                                );
                              }}
                              style={{
                                borderWidth: 1,
                                borderRadius: 10,
                                color: Colors.TEXTDARK,
                                paddingLeft: 15,
                                fontSize: 16,
                              }}
                            />
                          </View>
                        </View>
                        <View style={{flex: 1, marginRight: 30}}>
                          <View
                            style={{
                              flex: 1,
                              justifyContent: 'center',
                            }}>
                            <Text16Normal
                              text={LASTNAME}
                              textColor={Colors.TEXTDARK}
                            />
                          </View>
                          <View style={{flex: 1}}>
                            <TextInput
                              value={lastName}
                              onChangeText={text => {
                                setLastName(text);
                                setProceedDisabled(
                                  email.length === 0 ||
                                    firstName.length === 0 ||
                                    text.length === 0,
                                );
                              }}
                              style={{
                                borderWidth: 1,
                                borderRadius: 10,
                                color: Colors.TEXTDARK,
                                paddingLeft: 15,
                                fontSize: 16,
                              }}
                            />
                          </View>
                        </View>
                      </View>
                      <View style={{flex: 1, marginHorizontal: 30}}>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                          <Text16Normal
                            text={EMAIL}
                            textColor={Colors.TEXTDARK}
                          />
                        </View>
                        <View style={{flex: 1}}>
                          <TextInput
                            value={email}
                            onChangeText={text => {
                              setEmail(text);
                              setError(false);
                              setProceedDisabled(
                                text.length === 0 ||
                                  firstName.length === 0 ||
                                  lastName.length === 0,
                              );
                            }}
                            autoCapitalize={'none'}
                            keyboardType={'email-address'}
                            style={{
                              borderWidth: 1,
                              borderRadius: 10,
                              color: Colors.TEXTDARK,
                              paddingLeft: 15,
                              fontSize: 16,
                            }}
                          />
                          {error ? (
                            <View
                              style={{
                                flex: 1,
                                paddingTop: 5,
                              }}>
                              <Text14
                                text={VALID_EMAIL_ERROR}
                                textColor={Colors.POPUP_RED}
                              />
                            </View>
                          ) : null}
                        </View>
                      </View>
                      <View style={{flex: 4}} />
                    </>
                  )}
                </View>

                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                    paddingBottom: 30,
                  }}>
                  <RNStepIndicator stepCount={3} currentStep={3} />
                </View>

                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}} />
                  <View style={{flex: 2}}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View style={{flex: 1}} />
                      <View style={{flex: 3}}>
                        <StyledButton
                          buttonStyle={{
                            backgroundColor: isProceedDisabled
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
                          text={PROCEED}
                          onPress={() =>
                            isEmailSentMessage
                              ? setIsEmailVerifiedToTrue()
                              : callToVerifyEmail()
                          }
                          disabled={isProceedDisabled}
                        />
                      </View>
                      <View style={{flex: 1}} />
                    </View>
                  </View>
                  <View style={{flex: 1}} />
                </View>
                <View style={{flex: 1, alignItems: 'center'}}>
                  {isEmailSentMessage ? (
                    <TouchableOpacity
                      onPress={() => setEmailSentMessage(false)}>
                      <Text14 text={'GO BACK'} textColor={'#666666'} />
                    </TouchableOpacity>
                  ) : (
                    <></>
                  )}
                </View>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </View>
      </Background>
    </View>
  );
};

export default EmailVerifyScreen;
