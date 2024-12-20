import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import {Button, View, Text, SafeAreaView} from 'react-native';

const SettingScreen = ({ }) => {
    const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, padding: 16}}>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16,
            }}>
            Setting Screen
          </Text>
          <Button
            onPress={() => navigation.navigate('HomeScreenStack')}
            title="Go to Home Stack"
          />
          <Button
            onPress={() => navigation.navigate('HomeScreen')}
            title="Go to Home Screen"
          />
          <Button
            onPress={() => navigation.navigate('ExploreScreen')}
            title="Go to Explore Screen"
          />
        </View>
        <Text
          style={{
            fontSize: 18,
            textAlign: 'center',
            color: 'grey'
          }}>
          React Navigate Drawer with Bottom Tab
        </Text>
        <Text
          style={{
            fontSize: 16,
            textAlign: 'center',
            color: 'grey'
          }}>
          www.aboutreact.com
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SettingScreen;