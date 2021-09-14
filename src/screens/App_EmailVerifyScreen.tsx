import React, {useState} from 'react';
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
  EMAIL_VERIFICATION_SENT_AFTER,
  EMAIL_VERIFICATION_SENT_BEFORE,
  PROCEED,
} from '../utils/constants';
import Text16Bold from '../components/Text/Text16Bold';
import RNStepIndicator from '../components/StepIndicator/RNStepIndicator';

const EmailVerifyScreen = ({setIsEmailVerifiedToTrue}) => {
  const [email, setEmail] = useState('');
  const [isEmailSentMessage, setEmailSentMessage] = useState(false);

  const callToVerifyEmail = () => {
    axios
      .post('/api/updateEmail', {email: email})
      .then(async res => {
        console.log(res.data.data.success);
        if (res.data.data.success) {
          setEmailSentMessage(true);
        }
      })
      .catch(err => {
        console.log('failed');
        console.log(err);
      });
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
              <View style={{flex: 1, justifyContent: 'center'}}>
                <View
                  style={{
                    flex: 2,
                    zIndex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <AppIcon100Ascent />
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    flex: 3,
                    justifyContent: 'center',
                  }}>
                  {isEmailSentMessage ? (
                    <View style={{}}>
                      <View style={{alignItems: 'center'}}>
                        <Text16Normal
                          text={EMAIL_VERIFICATION_SENT_BEFORE}
                          textColor={Colors.TEXTDARK}
                        />
                        <View style={{marginVertical: 2}} />
                        <Text16Bold text={email} textColor={Colors.TEXTDARK} />
                        <View style={{marginVertical: 2}} />
                        <Text16Normal
                          text={EMAIL_VERIFICATION_SENT_AFTER}
                          textColor={Colors.TEXTDARK}
                        />
                      </View>
                    </View>
                  ) : (
                    <>
                      <View style={{}}>
                        <View style={{alignItems: 'center'}}>
                          <Text16Normal
                            text={`PLEASE ENTER YOUR EMAIL ID`}
                            textColor={Colors.TEXTDARK}
                          />
                        </View>
                      </View>
                      <View
                        style={{
                          width: '80%',
                          alignItems: 'center',
                          marginTop: 20,
                        }}>
                        <TextInput
                          value={email}
                          onChangeText={text => setEmail(text)}
                          style={{
                            width: '100%',
                            borderWidth: 1,
                            borderRadius: 10,
                            color: Colors.TEXTDARK,
                            paddingLeft: 15,
                            fontSize: 16,
                          }}
                        />
                      </View>
                    </>
                  )}
                </View>
                {!isEmailSentMessage ? (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      paddingBottom: 30,
                    }}>
                    <RNStepIndicator stepCount={3} currentStep={3} />
                  </View>
                ) : (
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'flex-end',
                      paddingBottom: 30,
                    }}></View>
                )}
                <View style={{flex: 1, flexDirection: 'row'}}>
                  <View style={{flex: 1}} />
                  <View style={{flex: 2}}>
                    {isEmailSentMessage ? (
                      <View style={{alignItems: 'center'}}>
                        <View></View>
                        <View>
                          <TouchableOpacity
                            activeOpacity={0.5}
                            onPress={setIsEmailVerifiedToTrue}>
                            <View
                              style={{
                                paddingVertical: 10,
                                paddingHorizontal: 25,
                                borderWidth: 1,
                                borderRadius: 10,
                              }}>
                              <Text16Normal
                                text="SKIP"
                                textColor={Colors.TEXTDARK}
                              />
                            </View>
                          </TouchableOpacity>
                        </View>
                      </View>
                    ) : (
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 1}} />
                        <View style={{flex: 3}}>
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
                            onPress={() => callToVerifyEmail()}
                          />
                        </View>
                        <View style={{flex: 1}} />
                      </View>
                    )}
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

export default EmailVerifyScreen;
