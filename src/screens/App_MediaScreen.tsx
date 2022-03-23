import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';

interface Props {
  navigation: RootNavProp<'MediaScreen'>;
  route: RootNavRouteProps<'MediaScreen'>;
}
const MediaScreen: React.FC<Props> = ({navigation, route}) => {

  navigation.setOptions({
    headerTitle: 'Media',
    headerTitleContainerStyle: {alignItems: 'center'},
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerRight: () => <View style={{marginRight: 0}}/>,
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
  });
  
  const roadmap = route.params.data;
  return (
    <View
      style={{
        width: '100%',
        height: 220,
        justifyContent: 'center',
      }}>
      <FastImage
        style={{
          height: 200,
          borderRadius: 10,
          marginHorizontal: 20,
        }}
        source={{
          uri: roadmap,
          priority: FastImage.priority.high,
        }}
        resizeMode={FastImage.resizeMode.contain}
      />
    </View>
  );
};

export default MediaScreen;
