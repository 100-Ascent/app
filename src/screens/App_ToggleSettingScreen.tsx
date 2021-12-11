import React, { useState } from 'react';
import {KeyboardAvoidingView, Platform, ScrollView, Switch, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import Background from '../components/Background/StyledBackground';
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
  const settings = [
    {
      name: 'Push Notification',
      description: 'Receive weekly push notification',
      isActive: true,
    },
    {
        name: "Chat Notification",
        description: "Receive chat notification",
        isActive: false,
    },
    {
        name: "Email Notification",
        description: "Receive email notification",
        isActive: true,
    }
  ];

  const [data, setData] = useState(settings);
  const toggleSwitch = (idx: number) => {
    let newData = [...data];
    newData[idx].isActive = !data[idx].isActive;
    setData(newData); 
  } 
  //Async functions

  //Component functions
  navigation.setOptions({
    headerTitle: route.params.data,
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
              <View style={{ backgroundColor: Colors.TEXT, elevation: 2, borderRadius: 10, paddingBottom: 20 }}>
                {data.map((val, idx) => {
                  return (
                    <View key={idx}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'row',
                          marginHorizontal: 30,
                          paddingTop: 20,
                          paddingHorizontal: 0
                        }}>
                        <View style={{flex: 3,}}>
                          <View>
                            <Text16Normal
                              text={val.name}
                              textColor={Colors.TEXTDARK}
                            //   textStyle={{ fontFamily: "Quicksand-SemiBold" }}
                            />
                          </View>
                          <View>
                            <Text12Normal
                              text={val.description}
                              textColor={Colors.TEXTDARK}
                            />
                          </View>
                        </View>
                        <View style={{flex: 1}}>
                          <View>
                            <Switch
                              trackColor={{false: Colors.BLACK2, true: Colors.POPUP_RED}}
                              thumbColor={val.isActive ? '#f4f3f4' : '#f4f3f4'}
                              ios_backgroundColor="#3e3e3e"
                              onValueChange={()=>toggleSwitch(idx)}
                              value={val.isActive}                              
                            />
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default ToggleSettingScreen;
