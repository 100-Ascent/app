import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, ImageBackground, ToastAndroid} from 'react-native';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {AppState} from '../redux';

import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import Background from '../components/Background/StyledBackground';
import ProfileInput from '../components/Input/ProfileInput';
import Text28 from '../components/Text/Text28';
import Text16Normal from '../components/Text/Text16Normal';

import {UPDATE_EMAIL, USER_DETAILS, VERIFY_EMAIL} from '../utils/apis/endpoints';
import {Colors} from '../utils/colors';
import myProfileStyles from '../styles/MyProfileScreen/myprofile';
import {setEmailVerifiedData} from '../redux/action';
import RNLoader from '../components/Loader/RNLoader';
import {ProfileInputFieldTypes} from '../utils/constants/constants';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import CustomPopUp from '../components/PopUps/CustomPopUp';
import VerifyEmailIcon from '../../assets/modal-icons/verify-email-icon.svg';
import { useIsFocused } from '@react-navigation/native';

interface Props {
  navigation: RootNavProp<'MyProfileScreen'>;
  route: RootNavRouteProps<'MyProfileScreen'>;
}

const MyProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [verifyEmailPopUpVisible, setVerifyEmailPopUp] = useState(false);

  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const dispatch = useDispatch();
  const isFocused = useIsFocused();

  const callToGetUserDetails = async () => {
    setLoading(true);
    await axios
      .get(USER_DETAILS, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data.data;
        dispatch(setEmailVerifiedData(data['"is_verified_email']));
        setUserData(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('failed');
        console.log(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    callToGetUserDetails();
  }, [isFocused]);

  const handleInfoPressed = () => {
    setVerifyEmailPopUp(true);
  };

  const handleResendEmail = () => {
    axios
      .get(VERIFY_EMAIL)
      .then(async res => {
        if (res.data.data.success) {            
          setVerifyEmailPopUp(false);
          ToastAndroid.show("Verification link sent successfully!", ToastAndroid.SHORT);
        }
      })
      .catch(err => {
        console.log('failed');
        console.log(err);
      });
  };

  navigation.setOptions({
    headerTitle: 'My Profile',
    headerTitleContainerStyle: {alignItems: 'center'},
    headerLeft: () => <View style={{marginLeft: 10}} />,
    headerRight: () => (
      <View style={{marginRight: 15}}>
        <Icon
          name="edit"
          onPress={() =>
            navigation.navigate('EditMyProfileScreen', {data: userData})
          }
        />
      </View>
    ),
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        {loading ? (
          <RNLoader />
        ) : (
          <ScrollView
            scrollEnabled
            style={{flexGrow: 1}}
            contentContainerStyle={{flexGrow: 1}}>
            <View style={{flex: 1, paddingHorizontal: 15}}>
              <View style={myProfileStyles.profileWrapper}>
                <View style={myProfileStyles.circularImage}>
                  <ImageBackground
                    source={{
                      uri: 'https://www.iphonehacks.com/wp-content/uploads/2019/11/Anamorphic-Pro-Visual-Effects-Mac-Bundle.jpg',
                    }}
                    style={myProfileStyles.profilePhoto}
                    imageStyle={{borderRadius: 100}}></ImageBackground>
                </View>
                <View style={{marginTop: 20}}>
                  <Text28
                    text={userData['first_name'] + ' ' + userData['last_name']}
                    textColor={Colors.TEXTDARK}
                  />
                </View>
                <Text16Normal
                  text={
                    'Member since ' +
                    new Date(userData['created_at']).getFullYear()
                  }
                  textColor={Colors.TEXTDARK}
                />
              </View>
              <View style={myProfileStyles.menuWrapper}>
                <ProfileInput
                  type={ProfileInputFieldTypes.EMAIL}
                  iconName="email"
                  textField={userData['email']}
                  isEmailVerified={userData['is_verified_email']}
                  onInfoPressed={handleInfoPressed}
                />
                <ProfileInput
                  type={ProfileInputFieldTypes.PHONE}
                  iconName="phone"
                  isPhone = {true}
                  textField={userData['phoneNumber']}
                />
                <ProfileInput
                  type={ProfileInputFieldTypes.COUNTRY}
                  iconName="public"
                  textField={
                    userData['country'].length === 0
                      ? 'India'
                      : userData['country']
                  }
                />
                <ProfileInput
                  type={ProfileInputFieldTypes.ADDRESS}
                  iconName="home"
                  textField={
                    userData['address'].length === 0
                      ? 'Hogwarts Castle, Highlands'
                      : userData['address']
                  }
                  isAddressFilled={userData['address'].length !== 0}
                />
                <ProfileInput
                  type={ProfileInputFieldTypes.GENDER}
                  iconName="user"
                  iconType="feather"
                  textField={userData['gender']}
                />
                <ProfileInput
                  type={ProfileInputFieldTypes.DOB}
                  iconName="cake"
                  isDOBFilled = { userData['dob'].length !== 0 }
                  textField={
                    userData['dob'].length === 0
                      ? '29/02/2030'
                      : userData['dob']
                  }
                />
              </View>
            </View>
            <CustomPopUp
              icon={<VerifyEmailIcon />}
              visible={verifyEmailPopUpVisible}
              onOk={handleResendEmail}
              isCancelable={true}
              onCancel={() => {
                navigation.navigate('EditMyProfileScreen', {data: userData});
                setVerifyEmailPopUp(false);
              }}
              oKText={'Resend link'}
              cancelText={'Edit Email'}
              header={'Verify E-Mail'}
              description={
                'Please verify your email by clicking on the link sent to ' +
                userData['email']
              }
              isCloseButton={true}
              closeButtonPress={()=>setVerifyEmailPopUp(false)}
            />
          </ScrollView>
        )}
      </Background>
    </SafeAreaView>
  );
};

export default MyProfileScreen;
