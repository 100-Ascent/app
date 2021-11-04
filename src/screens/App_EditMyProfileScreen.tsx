import React, {useState} from 'react';
import {ImageBackground, SafeAreaView, ScrollView, View} from 'react-native';

import Background from '../components/Background/StyledBackground';
import EditProfileInput from '../components/Input/EditProfileInput';
import Text14 from '../components/Text/Text14';

import Text18 from '../components/Text/Text18';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import myProfileStyles from '../styles/MyProfileScreen/myprofile';
import {Colors} from '../utils/colors';

import Checkbox from '../components/Checkbox/Checkbox';
import StyledButton from '../components/Button/StyledButton';
import Icon from 'react-native-elements/dist/icons/Icon';
import axios from 'axios';
import { USER_DETAILS_UPDATE } from '../utils/apis/endpoints';
import moment from 'moment';
import Text16Bold from '../components/Text/Text16Bold';
import Text20 from '../components/Text/Text20';

interface Props {
  navigation: RootNavProp<'EditMyProfileScreen'>;
  route: RootNavRouteProps<'EditMyProfileScreen'>;
}

const EditMyProfileScreen: React.FC<Props> = ({navigation, route}) => {
  //State variables
  const userData = route.params.data;
  const [data, setData] = useState(userData);  
  const genderOptions = [
    {id: 'male', value: 'Male'},
    {id: 'female', value: 'Female'},
    {id: 'other', value: 'Rather Not Say'},
  ];
  const [checkedGender, setCheckedGender] = useState(userData['gender']);

  //Async functions

  //Component functions
  const handleCheckBoxPress = (e, value) => {
    setCheckedGender(value);
    setData(prevState => ({...prevState, ["gender"]: value}))
  };

  const handleDateOfBirth = (dob) => {
    setData(prevState => ({...prevState, ["dob"]: moment(new Date(dob)).format('DD/MM/YYYY')  }))
  }

  const handleInput = (name, value) => {
    setData(prevState => ({...prevState, [name]: value}));
  };

  // Extras
  const genderView = genderOptions.map((val, idx) => {

    return (
      <View style={{marginRight: 10, marginTop: 5}} key={idx}>
        <Checkbox
          isChecked={checkedGender.toLowerCase() === val.value.toLowerCase()}
          value={val.value}
          onPress={handleCheckBoxPress}
        />
      </View>
    );
  });

  const handleSavePress = () => {
      axios
      .post(USER_DETAILS_UPDATE, data)
      .then(async res => {
        navigation.pop();
      })
      .catch(err => {
        console.log('failed');
        console.log(err);
      });
  }

  navigation.setOptions({
    headerLeft: () => (
      <View style={{marginLeft: 10}}>
        <Icon
          name="arrow-back"
          type="ionicons"
          size={30}
          onPress={() => navigation.pop()} 
          tvParallaxProperties={undefined}        />
      </View>
    ),
    headerRight: () => <View style={{marginLeft: 10}} />,
    headerTitle: 'My Profile',
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerTitleContainerStyle: {alignItems: 'center'},
  });

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <ScrollView
          scrollEnabled
          style={{flexGrow: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, paddingHorizontal: 15}}>
            <View style={myProfileStyles.profileWrapper}>
              <View style={myProfileStyles.circularImage}>
                <ImageBackground
                  source={{
                    uri: 'https://i.ibb.co/XJ127jN/john-wick.png',
                  }}
                  style={myProfileStyles.profilePhoto}
                  imageStyle={{borderRadius: 60}}></ImageBackground>
              </View>
              <View style={{marginTop: 15}}>
                <Text14
                  text={'Change Profile Photo'}
                  textColor={Colors.BLACK2}
                />
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <View style={{marginHorizontal: 10}}>
                <Text20 text={'Personal Info'} textColor={Colors.TEXTDARK} />
              </View>

              <EditProfileInput
                label={'Name'}
                keyName={'first_name'}
                isName={true}
                value={data['first_name'] + ' ' + data['last_name']}
                onChangeText={handleInput}
              />
              <EditProfileInput
                label={'E-Mail ID'}
                keyName={'email'}
                isEmail={data['is_verified_email']}
                value={data['email']}
                onChangeText={handleInput}
              />
              <EditProfileInput
                label={'Phone Number'}
                keyName={'phoneNumber'}
                isPhone={true}
                value={data['phoneNumber']}
              />
              <EditProfileInput
                label={'Date of Birth'}
                keyName={'dob'}
                value={data['dob'].length===0 ? moment(new Date()).format('DD/MM/YYYY'): data['dob'] }
                handleDateOfBirth={handleDateOfBirth}
              />

              <View style={{marginHorizontal: 10, marginTop: 20}}>
                <View>
                  <Text14 text={'Gender'} textColor={Colors.BLACK3} />
                </View>
                <View style={{flexDirection: 'row'}}>{genderView}</View>
              </View>

              <View style={{marginHorizontal: 10, marginTop: 25}}>
                <Text18 text={'Address'} textColor={Colors.TEXTDARK} />
              </View>

              <EditProfileInput
                label={'PIN Code/ ZIP Code'}
                keyName={'pincode'}
                value={data['pincode']}
                isNumeric={true}
                onChangeText={handleInput}
              />
              <EditProfileInput
                label={'Country'}
                keyName={'country'}
                value={data['country']}
                onChangeText={handleInput}
              />
              <EditProfileInput
                label={'State'}
                keyName={'state'}
                value={data['state']}
                onChangeText={handleInput}
              />
              <EditProfileInput
                label={'City'}
                keyName={'city'}
                value={data['city']}
                onChangeText={handleInput}
              />
              <EditProfileInput
                label={'Address Line 1'}
                keyName={'address'}
                value={data['address']}
                onChangeText={handleInput}
              />
            </View>
            <View style={{marginTop: 50}}>
              <StyledButton
                text={'SAVE'}
                onPress={handleSavePress}
                buttonStyle={{marginHorizontal: 10}}
              />
            </View>
          </View>
          <View style={{padding: 30}} />
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default EditMyProfileScreen;
