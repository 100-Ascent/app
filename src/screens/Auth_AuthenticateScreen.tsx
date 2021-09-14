import React from 'react';
import {useRef} from 'react';
import {useState} from 'react';
import PhoneInput from 'react-native-phone-number-input';
import SignInScreen from './Auth_SignInScreen';
import auth from '@react-native-firebase/auth';
import {RootNavProp} from '../routes/RootStackParamList';
import VerifyScreen from './Auth_VerifyScreen';

interface Props {
  navigation: RootNavProp<'AuthenticateScreen'>;
}

const AuthenticateScreen: React.FC<Props> = ({navigation}) => {
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');
  const [countryCode, setCountry] = useState('IN');

  const phoneInput = useRef<PhoneInput>(null);
  const [confirm, setConfirm] = useState<any | null>(null);
  const [code, setCode] = useState('');

  const [isVerifyScreen, setVerifyScreen] = useState(false);
  const [otpArray, setOtpArray] = useState(['', '', '', '', '', '']);

  const handleSetOtpArray = array => {
    setOtpArray(array);
  };

  const onSubmit = () => {
    console.log(formattedValue);
    console.log(countryCode);
    if (formattedValue.length !== 0) {
      setVerifyScreen(true);
    }
  };

  async function signInWithPhoneNumber(phoneNumber: any) {
    try {
      const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
      setConfirm(confirmation);
    } catch (error) {
      console.log(error);
    }
  }

  async function confirmCode() {
    try {
      const otp = otpArray.join('');
      await confirm.confirm(otp);
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  return !isVerifyScreen ? (
    <SignInScreen
      phoneInput={phoneInput}
      value={value}
      onChangeText={setValue}
      onChangeFormattedText={setFormattedValue}
      onChangeCountry={() => {
        setCountry(phoneInput.current?.getCallingCode() || '');
      }}
      onSubmit={onSubmit}
    />
  ) : (
    <VerifyScreen
      phoneNumber={formattedValue}
      onSignInClicked={signInWithPhoneNumber}
      onVerify={confirmCode}
      otpArray={otpArray}
      handleSetOtpArray={handleSetOtpArray}
    />
  );
};

export default AuthenticateScreen;
