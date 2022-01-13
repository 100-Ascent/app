import React, {useEffect, useState} from 'react';
import {
  ImageBackground,
  Platform,
  SafeAreaView,
  ScrollView,
  ToastAndroid,
  View,
} from 'react-native';

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
import {USER_DETAILS_UPDATE} from '../utils/apis/endpoints';
import moment from 'moment';
import Text20 from '../components/Text/Text20';
import ImagePicker, { ImageOrVideo } from 'react-native-image-crop-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';
import {BASEURL} from '../utils/constants/constants';
import auth from '@react-native-firebase/auth';
import FastImage from 'react-native-fast-image';
import Text12Normal from '../components/Text/Text12Normal';

interface Props {
  navigation: RootNavProp<'EditMyProfileScreen'>;
  route: RootNavRouteProps<'EditMyProfileScreen'>;
}

const EditMyProfileScreen: React.FC<Props> = ({navigation, route}) => {
  //State variables
  const userData = route.params.data;
  const [data, setData] = useState(userData);
  const [image, setImage] = useState(null);
  const [token, setToken] = useState('');
  const [usernameError, setUsernameError] = useState(false);
  const genderOptions = [
    {id: 'male', value: 'Male'},
    {id: 'female', value: 'Female'},
    {id: 'other', value: 'Rather Not Say'},
  ];
  const [checkedGender, setCheckedGender] = useState(userData['gender']);
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);

  //Async functions
  const getToken = async () => {
    const token = await auth().currentUser.getIdToken();
    setToken(token);
  };

  useEffect(()=>{
    getToken();
  },[])


  //Component functions
  const handleCheckBoxPress = (e, value) => {
    setCheckedGender(value);
    setData(prevState => ({...prevState, ['gender']: value}));
  };

  const handleDateOfBirth = dob => {
    
    const year = new Date(dob).getFullYear();
    const month = new Date(dob).getMonth()+1;
    const date = new Date(dob).getDate();
    const dateOfBirthServerFormat =  year+ "-" +  (month < 10 ? "0" + month : month) + "-" + (date < 10 ? "0" + date : date) + "T00:00:00Z";

    setData(prevState => ({
      ...prevState,
      ['dob']: dateOfBirthServerFormat,
    }));
  };

  const handleInput = (name, value) => {
    setData(prevState => ({...prevState, [name]: value}));
  };

  const callToUploadImage = async (image: ImageOrVideo) => {
    const imageData = new FormData();
    imageData.append('image', {
      uri:
        Platform.OS === 'android'
          ? image.path
          : image.path.replace('file://', ''),
      type: image.mime,
      name: "profile",
      height: image.height,
      width: image.width,
    });
    await axios.post('/api/user/image', imageData,
          { headers: {
              'Content-Type': 'multipart/form-data',                        
              'X-CONTEXT-ID': contextId,
            },
          },
        ).then((res)=>{
          ToastAndroid.show('Updated profile picture', ToastAndroid.SHORT);
        }).catch(err => {
          console.log(err)
          ToastAndroid.show(
            'Error updating the profile picture',
            ToastAndroid.SHORT,
          );
        })
  };

  const handleImagePicker = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      callToUploadImage(image);
      setImage(image);
    }).catch(err=>{
      console.log(err)
    });
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
  };

  const handleCallToCheckUsername = () => {
    axios
      .post(USER_DETAILS_UPDATE, data)
      .then(async res => {
        if(res.data.success){
          setUsernameError(false);
        }else{
          setUsernameError(true);
        }
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
          tvParallaxProperties={undefined}
        />
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
              <TouchableOpacity onPress={handleImagePicker} style={myProfileStyles.circularImage}>
                  <FastImage
                        style={{ width: 110, height: 110, borderRadius: 110 }}
                          source={{
                            uri: image
                            ? image.path
                            : userData['image_id'],
                            priority: FastImage.priority.high,
                            headers: {
                              Authorization: token,
                            },
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
              </TouchableOpacity>
              <View style={{marginTop: 15}}>
                <TouchableOpacity onPress={handleImagePicker}>
                  <Text14
                    text={'Change Profile Photo'}
                    textColor={Colors.BLACK2}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{marginTop: 20}}>
              <View style={{marginHorizontal: 10}}>
                <Text20 text={'Personal Info'} textColor={Colors.TEXTDARK} />
              </View>

              <View style={{ flexDirection: 'row'}}>
                <View style={{ flex: 1}}>
                  <EditProfileInput
                    label={'First Name'}
                    keyName={'first_name'}
                    isName={false}
                    value={data['first_name'] }
                    onChangeText={handleInput}
                  />
                </View>
                <View style={{ flex: 1}}>
                  <EditProfileInput
                    label={'Last Name'}
                    keyName={'last_name'}
                    isName={false}
                    value={data['last_name'] }
                    onChangeText={handleInput}
                  />
                </View>
              </View>
              <EditProfileInput
                label={'E-Mail ID'}
                keyName={'email'}
                isEmail={data['is_verified_email']}
                value={data['email']}
                onChangeText={handleInput}
              />
              <EditProfileInput
                label={'Username'}
                keyName={'username'}
                isUsername={true}
                value={data['username']}
                onChangeText={handleInput}  
                handleUserNameBlurEvent={handleCallToCheckUsername}              
              />
              {usernameError ? <View style={{ paddingLeft: 10 }}><Text12Normal text={"This username is already taken"} textColor={Colors.RED}/></View> : null }
              <EditProfileInput
                label={'Phone Number'}
                keyName={'phoneNumber'}
                isPhone={true}
                value={data['phoneNumber']}
              />
              <EditProfileInput
                label={'Date of Birth'}
                keyName={'dob'}
                value={
                  data['dob'].length === 0
                    ? moment(new Date()).toISOString()
                    : moment(new Date(data['dob'])).toISOString()
                }
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
