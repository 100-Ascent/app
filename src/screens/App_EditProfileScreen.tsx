import React, {useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Background from '../components/Background/StyledBackground';
import MyProfileRadioComponent from '../components/RadioButton/RadioButton';
import MyProfileTextInput from '../components/MyProfile/MyProfileTextInput';
import StyledButton from '../components/Button/StyledButton';
import Text16Bold from '../components/Text/Text16Bold';
import {RootNavProp} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import Text16Normal from '../components/Text/Text16Normal';
import myProfileStyles from '../styles/MyProfileScreen/myprofile';

interface Props {
  navigation: RootNavProp<'EditProfileScreen'>;
}
const EditProfileScreen: React.FC<Props> = ({navigation}) => {
  const handleSave = () => {};
  const [image, setImage] = useState('');
  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <ScrollView scrollEnabled style={{flexGrow: 1}}>
          <View>
            <View style={styles.screenContainer}>
              <View style={myProfileStyles.circularImage}>
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={myProfileStyles.profilePhoto}
                  imageStyle={{borderRadius: 100}}></ImageBackground>
              </View>
              <View style={{paddingVertical: 5}} />
              <TouchableOpacity onPress={choosePhotoFromLibrary}>
                <Text16Normal
                  text="Change Profile Photo"
                  textColor={Colors.TEXTDARK}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.infoContainer}>
              <View style={{marginVertical: 20}}>
                <Text16Bold text="Personal Info" textColor={Colors.TEXTDARK} />
              </View>
              <MyProfileTextInput placeholderText="Name" />
              <MyProfileTextInput placeholderText="Email" />
              <MyProfileTextInput placeholderText="Date of Birth" />
              <MyProfileRadioComponent />
              <View style={{marginVertical: 20}}>
                <Text16Bold text="Address" textColor={Colors.TEXTDARK} />
              </View>
              <MyProfileTextInput placeholderText="Pin Code/Zip Code" />
              <MyProfileTextInput placeholderText="Country" />
              <MyProfileTextInput placeholderText="State" />
              <MyProfileTextInput placeholderText="City" />
              <MyProfileTextInput placeholderText="Address Line 1" />
              <MyProfileTextInput placeholderText="Address Line 2" />
              <StyledButton text="SAVE" onPress={handleSave} />
            </View>
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};
export default EditProfileScreen;

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 15,
  },
  infoContainer: {
    flex: 1,
    padding: 30,
    paddingBottom: 100,
  },
});
