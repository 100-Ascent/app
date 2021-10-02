import React, {useState} from 'react';
import {View, Text, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import Background from '../components/Background/StyledBackground';
import FastImage from 'react-native-fast-image';
import Text16Normal from '../components/Text/Text16Normal';
import {Colors} from '../utils/colors';
import {RootNavProp} from '../routes/RootStackParamList';
import Text16Bold from '../components/Text/Text16Bold';

import MyProfileTextInput from '../components/MyProfile/MyProfileTextInput';
import StyledButton from '../components/Button/StyledButton';
interface Props {
  navigation: RootNavProp<'EditProfileScreen'>;
}
const EditProfileScreen: React.FC<Props> = ({navigation}) => {
  const handleSave = () => {};

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
                <FastImage
                  style={{width: 100, height: 100, borderRadius: 100}}
                  source={{
                    uri: '',
                    priority: FastImage.priority.high,
                  }}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
              <View style={{paddingVertical: 5}} />
              <Text16Normal
                text={'Change Profile photo'}
                textColor={Colors.TEXTDARK}
              />
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
