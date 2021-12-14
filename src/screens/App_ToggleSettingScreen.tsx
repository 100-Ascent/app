import React, { useState } from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Switch, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import Background from '../components/Background/StyledBackground';
import ToggleCard from '../components/Cards/NotificationCards/ToggleCard';
import Text12Normal from '../components/Text/Text12Normal';
import Text16Normal from '../components/Text/Text16Normal';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'ToggleSettingScreen'>;
  route : RootNavRouteProps<'ToggleSettingScreen'>;
}

const ToggleSettingScreen: React.FC<Props> = ({navigation, route}) => {

  //State variables
  const [data, setData] = useState( route.params.data.data);
  const toggleSwitch = (idx: number) => {
    let newData = [...data];
    newData[idx].active = !data[idx].active;
    setData(newData); 
  } 
  //Async functions

  //Component functions
  navigation.setOptions({
    headerTitle: route.params.data.group,
    headerTitleContainerStyle: {alignItems: 'center'},
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerRight: () => <View style={{marginLeft: 0}} />,
    headerLeft: () => (
      <View style={{marginLeft: 10}}>
        <Icon
          name="arrow-back"
          type="ionicons"
          size={30}
          onPress={() => navigation.pop()}
        />
      </View>
    ),
  });
  return (
    <View style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 55}
          enabled={Platform.OS === 'ios' ? true : false}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            <View style={{flex: 1, marginHorizontal: 20, marginTop: 10 }}>
              <ToggleCard data={data} toggleSwitch={toggleSwitch} />            
            </View>
            <View style={{ position: 'relative', bottom: 10, justifyContent: 'center', alignItems: 'center' }}>
                <Text16Normal text={"With ❤️ from"} textColor={Colors.TEXTDARK}/>
                <View style={{padding:2}}/>
                <Text16Normal text={"Team Yellow Monk"} textColor={Colors.TEXTDARK}/>
                <View style={{padding:5}}/>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default ToggleSettingScreen;
