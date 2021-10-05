import React, {useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import Background from '../components/Background/StyledBackground';
import FastImage from 'react-native-fast-image';
import Text16Normal from '../components/Text/Text16Normal';
import {Colors} from '../utils/colors';
import {RootNavProp} from '../routes/RootStackParamList';
import Text16Bold from '../components/Text/Text16Bold';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import MyProfileTextInput from '../components/MyProfile/MyProfileTextInput';
import StyledButton from '../components/Button/StyledButton';

import ImagePicker from 'react-native-image-crop-picker';

interface Props {
  navigation: RootNavProp<'EditProfileScreen'>;
}
const EditProfileScreen: React.FC<Props> = ({navigation}) => {
  const handleSave = () => {};
  const [image, setImage] = useState(
    'https://api.adorable.io/avatars/80/abott@adorable.png',
  );
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
          <View style={{flex: 1, marginHorizontal: 15}}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: 10,
              }}>
              <View style={{borderWidth: 1, borderRadius: 100, padding: 3}}>
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={{height: 100, width: 100}}
                  imageStyle={{borderRadius: 100}}>
                  <View
                    style={{
                      flex: 1,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Icon
                      name="camera"
                      size={35}
                      color="#fff"
                      style={{
                        opacity: 0.7,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderWidth: 1,
                        borderColor: '#fff',
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </ImageBackground>
              </View>
              <View style={{paddingVertical: 5}} />
              <TouchableOpacity onPress={choosePhotoFromLibrary}>
                <Text>Change Profile Photo</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              <View style={{marginVertical: 20}}>
                <Text16Bold text="Personal Info" textColor={Colors.TEXTDARK} />
              </View>
              <MyProfileTextInput placeholderText="Name" />
              <MyProfileTextInput placeholderText="Email" />
              <MyProfileTextInput placeholderText="Date of Birth" />
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
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingBottom: 100,
    paddingRight: 20,
  },
});
