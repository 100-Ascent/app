import React, {useState} from 'react';
import {SafeAreaView, ScrollView, Text, View, StyleSheet} from 'react-native';
import {Colors} from '../utils/colors';
import {Image, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import Text28 from '../components/Text/Text28';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import Text16Normal from '../components/Text/Text16Normal';
import Text16Bold from '../components/Text/Text16Bold';
import Gender from '../../assets/icons/profile-gender.svg';
import ProfileDetails from '../components/MyProfile/ProfileDetails';
import Background from '../components/Background/StyledBackground';

interface Props {
  navigation: RootNavProp<'MyProfileScreen'>;
  route: RootNavRouteProps<'MyProfileScreen'>;
}
const MyProfileScreen: React.FC<Props> = ({navigation, route}) => {
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
              <Text28 text={'Megha Dandapat'} textColor={Colors.TEXTDARK} />
              <Text16Normal
                text={'Member since 2001'}
                textColor={Colors.TEXTDARK}
              />
            </View>
            <View style={styles.menuWrapper}>
              <ProfileDetails
                iconName="email"
                textField="megha13dandapat@gmail.com"
              />

              <ProfileDetails iconName="phone" textField="8830401437" />
              <ProfileDetails iconName="public" textField="India" />
              <ProfileDetails iconName="home" textField="Pune" />
              <ProfileDetails iconName="cake" textField="01/01/20202" />
              <View style={styles.menuItem}>
                <Gender />
                <Text style={styles.menuItemText}>Male</Text>
              </View>
            </View>
            <View>
              <Text16Bold
                text="Last added distances"
                textColor={Colors.TEXTDARK}
              />
            </View>
            {/* <DistanceComponent distanceData={myDistanceData} /> */}
          </View>
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default MyProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  menuWrapper: {
    marginTop: 10,
  },
  menuItem: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  menuItemText: {
    color: '#777777',
    marginLeft: 10,
    fontWeight: '600',
    fontSize: 16,
    lineHeight: 26,
  },
});
