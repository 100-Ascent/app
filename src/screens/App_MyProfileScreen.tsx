import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  ImageBackground,
} from 'react-native';
import Background from '../components/Background/StyledBackground';
import ProfileDetails from '../components/MyProfile/ProfileDetails';
import Text28 from '../components/Text/Text28';
import {Colors} from '../utils/colors';
import Text16Normal from '../components/Text/Text16Normal';
import Text16Bold from '../components/Text/Text16Bold';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import Gender from '../../assets/icons/profile-gender.svg';
import myProfileStyles from '../styles/MyProfileScreen/myprofile';

interface Props {
  navigation: RootNavProp<'MyProfileScreen'>;
  route: RootNavRouteProps<'MyProfileScreen'>;
}
const MyProfileScreen: React.FC<Props> = ({navigation, route}) => {
  const [image, setImage] = useState('');

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <ScrollView scrollEnabled style={{flexGrow: 1}}>
          <View style={{flex: 1, marginHorizontal: 15}}>
            <View style={myProfileStyles.profileWrapper}>
              <View style={myProfileStyles.circularImage}>
                <ImageBackground
                  source={{
                    uri: image,
                  }}
                  style={myProfileStyles.profilePhoto}
                  imageStyle={{borderRadius: 100}}></ImageBackground>
              </View>
              <Text28 text={'Megha Dandapat'} textColor={Colors.TEXTDARK} />
              <Text16Normal
                text={'Member since 2001'}
                textColor={Colors.TEXTDARK}
              />
            </View>
            <View style={myProfileStyles.menuWrapper}>
              <ProfileDetails
                iconName="email"
                textField="megha13dandapat@gmail.com"
              />
              <ProfileDetails iconName="phone" textField="8830401437" />
              <ProfileDetails iconName="public" textField="India" />
              <ProfileDetails iconName="home" textField="Pune" />
              <ProfileDetails iconName="cake" textField="01/01/20202" />
              <View style={myProfileStyles.menuItem}>
                <Gender />
                <Text style={myProfileStyles.menuItemText}>Female</Text>
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
