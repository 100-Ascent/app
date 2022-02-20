import React from 'react';
import {View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';

interface Props {
  navigation: RootNavProp<'MediaScreen'>;
  route: RootNavRouteProps<'MediaScreen'>;
}
const MediaScreen: React.FC<Props> = ({navigation, route}) => {
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
