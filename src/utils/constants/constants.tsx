import {Dimensions} from 'react-native';

export const IS_DEV_ENVIRONMENT = true; 
export const DEV_BASEURL = 'https://pre-prod.100ascent.com';
export const PROD_BASEURL = 'https://api.100ascent.com';

export const BASEURL = IS_DEV_ENVIRONMENT ? DEV_BASEURL : PROD_BASEURL;

export const getCurrentEnvironmemnt = () => { return BASEURL; }

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

export const EMAIL_NOT_VERIFIED = "Your email id is not yet verified. Verify Now!"; 

export const NO_REWARDS_TEXT =
  'Good stuff come to those who work hard! Keep grinding on your fitness journey you will unlock rewards on completing milestone';
export const NO_REWARDS_TOUNLOCK_PRESENT = 'Unlock rewards to reveal them';
export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const SUBSCRIBE = "Subscribe"
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
  INSTITUTION = "institution",
}

export const DEV_GOOGLE_FIT_CONFIG = {
  issuer: 'https://accounts.google.com',
  clientId: '730727502414-bk7k9runddlpv1s0b10n4q1tnfav2o1e.apps.googleusercontent.com',
  redirectUrl: 'com.googleusercontent.apps.730727502414-bk7k9runddlpv1s0b10n4q1tnfav2o1e:/oauth2redirect/google',
  scopes: [ 
    'https://www.googleapis.com/auth/fitness.activity.read',
]
};

export const PROD_GOOGLE_FIT_CONFIG = {
  issuer: 'https://accounts.google.com',
  clientId: '730727502414-urev3kc18jh61qc41r3slea7pkltmvk5.apps.googleusercontent.com',
  redirectUrl: 'com.googleusercontent.apps.730727502414-urev3kc18jh61qc41r3slea7pkltmvk5:/oauth2redirect/google',
  scopes: [ 
    'https://www.googleapis.com/auth/fitness.activity.read',
]
};

export const DEV_MERCHANT_ID = "JBheFY42775698183177";
export const PROD_MERCHANT_ID = "KJPngf43133528107300";

export const DEV_CALLBACK_URL = "https://securegw-stage.paytm.in/theia/paytmCallback?ORDER_ID=";
export const PROD_CALLBACK_URL =  "https://securegw.paytm.in/theia/paytmCallback?ORDER_ID=";

export const MERCHANT_ID = IS_DEV_ENVIRONMENT ? DEV_MERCHANT_ID : PROD_MERCHANT_ID;
export const CALLBACK_URL = IS_DEV_ENVIRONMENT ? DEV_CALLBACK_URL : PROD_CALLBACK_URL;
export const GOOGLE_FIT_CONFIG = IS_DEV_ENVIRONMENT ? DEV_GOOGLE_FIT_CONFIG : PROD_GOOGLE_FIT_CONFIG;


export const STREAM = {
  GOOGLE_FIT : "Google Fit",
  MANUAL : "Manual"
}
