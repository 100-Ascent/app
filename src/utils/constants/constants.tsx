import {Dimensions} from 'react-native';

export const BASEURL = 'https://team-100-ascent.herokuapp.com';
// export const BASEURL = 'https://pre-prod.100ascent.com';
// export const BASEURL = 'https://api.100ascent.com';

export const AWAITINGOTP = 'Waiting for OTP';
export const EMAIL = 'Email ID';
export const FIRSTNAME = 'First Name';
export const LASTNAME = 'Last Name';
export const NUMBER_ERROR = 'Enter a valid mobile number';
export const PROCEED = 'Proceed';
export const RESEND_OTP = 'Resend OTP';
export const SIGNIN_PHONE = 'Your Mobile Number';
export const SUBSCRIBE_TO_CHALLENGE = 'Subscribe to a challenge to get started';
export const VALID_EMAIL_ERROR = 'Please enter a valid email id';
export const VERIFY = 'VERIFY';

export const EMAIL_VERIFICATION_SENT_BEFORE = 'We have sent an email to ';
export const EMAIL_VERIFICATION_SENT_AFTER_1 =
  'Please click the verification link';
export const EMAIL_VERIFICATION_SENT_AFTER_2 = 'sent on above email';

export const NO_REWARDS_TEXT =
  'Good stuff come to those who work hard! Keep grinding on your fitness journey you will unlock rewards on completing milestone';
export const NO_REWARDS_TOUNLOCK_PRESENT = 'Unlock rewards to reveal them';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const DEV_VERSION = true;
export const RINGCOLORS = [
  '#9400d3',
  '#2c9bff',
  '#ffbd1b',
  '#ff7f00',
  '#000080',
  '#ff0000',
  '#633a0d',
];

export enum ProfileInputFieldTypes {
  EMAIL = "email",
  PHONE = "phone",
  COUNTRY = "country",
  ADDRESS = "address",
  DOB = "dob",
  GENDER = "gender",
  USERNAME = "username",
}

export const GOOGLE_FIT_CONFIG = {
  issuer: 'https://accounts.google.com',
  clientId: '730727502414-bk7k9runddlpv1s0b10n4q1tnfav2o1e.apps.googleusercontent.com',
  redirectUrl: 'com.googleusercontent.apps.730727502414-bk7k9runddlpv1s0b10n4q1tnfav2o1e:/oauth2redirect/google',
  scopes: [ 
    'https://www.googleapis.com/auth/fitness.activity.read',
]
};


export const STREAM = {
  GOOGLE_FIT : "Google Fit",
  MANUAL : "Manual"
}
