import React from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import Background from '../components/Background/StyledBackground';
import auth from '@react-native-firebase/auth';
import ViewAllChallenges from './App_ViewAllChallenges';
import { RootNavProp } from '../routes/RootStackParamList';

interface Props{
  navigation: RootNavProp<"AllChallengesScreen">
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <Background> */}
      <View style={{flex: 1, padding: 16}}>
        {/* <ViewAllChallenges navigation={navigation} /> */}
        {/* <Button title={"Log out"} onPress={async()=>await auth().signOut()}></Button>     */}
      </View>
      {/* </Background> */}
    </SafeAreaView>
  );
};

export default HomeScreen;