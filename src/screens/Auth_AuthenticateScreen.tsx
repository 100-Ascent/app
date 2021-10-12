import React, {useRef, useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import auth from '@react-native-firebase/auth';
import {RootNavProp} from '../routes/RootStackParamList';
import SignInScreen from './Auth_SignInScreen';
import VerifyScreen from './Auth_VerifyScreen';

interface Props {
  navigation: RootNavProp<'AuthenticateScreen'>;
}

const AuthenticateScreen: React.FC<Props> = () => {
  const phoneInput = useRef<PhoneInput>(null);

  const [countryCode, setCountry] = useState('IN');
  const [confirm, setConfirm] = useState<any | null>(null);
  const [error, setError] = useState(false);
  const [formattedValue, setFormattedValue] = useState('');
  const [isVerifyDisabled, setVerifyDisabled] = useState(true);
  const [isVerifyScreen, setVerifyScreen] = useState(false);
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);
  const [value, setValue] = useState('');

  //Async calls
  async function confirmCode() {
    try {
      const otp = otpArray.join('');
      await confirm.confirm(otp);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  async function signInWithPhoneNumber(phoneNumber: any) {
    try {
      await auth()
        .signInWithPhoneNumber(phoneNumber)
        .then(confirmation => {
          setVerifyDisabled(false);
          setConfirm(confirmation);
        });
    } catch (error) {
      console.log(error);
    }
  }

  const handleSetOtpArray = array => {
    setOtpArray(array);
  };

  const onChangeCountry = () => {
    setCountry(phoneInput.current?.getCallingCode() || '');
  };

  const onGoBack = () => {
    setVerifyScreen(false);
  };

  const onSubmit = () => {
    if (formattedValue.length !== 0) {
      setVerifyScreen(true);
    } else {
      setError(true);
    }
  };

  return !isVerifyScreen ? (
    <SignInScreen
      error={error}
      phoneInput={phoneInput}
      setError={setError}
      onChangeCountry={onChangeCountry}
      onChangeFormattedText={setFormattedValue}
      onChangeText={setValue}
      onSubmit={onSubmit}
    />
  ) : (
    <VerifyScreen
      phoneNumber={formattedValue}
      onSignInClicked={signInWithPhoneNumber}
      onVerify={confirmCode}
      otpArray={otpArray}
      handleSetOtpArray={handleSetOtpArray}
      isVerifyDisabled={isVerifyDisabled}
      onGoBack={onGoBack}
    />
  );
};

export default AuthenticateScreen;
