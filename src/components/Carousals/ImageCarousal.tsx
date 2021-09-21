import React from 'react';
import {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
<<<<<<< HEAD
  TouchableOpacity,
=======
>>>>>>> e70f8a448bfc75ac883a71eeadcbb8105e515fb5
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {Colors} from '../../utils/colors';

interface Props {
  data: string[];
  wrapStyle: any;
  onPressImageHandler: any;
}
const ImageCarousal: React.FC<Props> = ({
  data,
  wrapStyle,
  onPressImageHandler,
}) => {
  const getToken = async () => {
    const token = await auth().currentUser.getIdToken();
    setToken(token);
  };
  useEffect(() => {
    getToken();
  }, []);

  const [token, setToken] = useState('');
  const [active, setActive] = useState(0);
  const [loading, setLoading] = useState(false);
  const change = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== active) {
        setActive(slide);
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={[wrapStyle]}>
        <ScrollView
          onScroll={({nativeEvent}) => change(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={[wrapStyle]}>
          {data.map((val, index) => (
            <TouchableOpacity
              onPress={() =>
                onPressImageHandler(
                  typeof val === 'string' ? val : val['image'],
                )
              }>
              <FastImage
                key={index}
                style={[wrapStyle]}
                source={{
                  uri: typeof val === 'string' ? val : val['image'],
                  priority: FastImage.priority.high,
                  headers: {
                    Authorization: token,
                  },
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.wrapDot}>
          {data.length > 1 &&
            data.map((val, index) => (
              <Text
                key={val}
                style={active === index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            ))}
        </View>
      </View>
    </View>
  );
};

export default ImageCarousal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    height: Dimensions.get('window').height * 0.25, // 25% window
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
});
