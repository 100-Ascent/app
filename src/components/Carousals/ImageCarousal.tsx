import React from 'react';
<<<<<<< HEAD
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

import auth from '@react-native-firebase/auth';
import { useEffect } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
=======
import {useState} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import auth from '@react-native-firebase/auth';
import {useEffect} from 'react';
import {Colors} from '../../utils/colors';
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99

interface Props {
  data: string[];
  wrapStyle: any;
<<<<<<< HEAD
  onPressImageHandler: any;
}
const ImageCarousal: React.FC<Props> = ({ data, wrapStyle, onPressImageHandler }) => {
=======
}
const ImageCarousal: React.FC<Props> = ({data, wrapStyle}) => {
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
  const getToken = async () => {
    const token = await auth().currentUser.getIdToken();
    setToken(token);
  };
  useEffect(() => {
    getToken();
  }, []);

  const [token, setToken] = useState('');
  const [active, setActive] = useState(0);
<<<<<<< HEAD
=======
  const [loading, setLoading] = useState(false);
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
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
<<<<<<< HEAD
          onScroll={({ nativeEvent }) => change(nativeEvent)}
=======
          onScroll={({nativeEvent}) => change(nativeEvent)}
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={[wrapStyle]}>
          {data.map((val, index) => (
<<<<<<< HEAD
            <TouchableOpacity onPress={() => onPressImageHandler(typeof val === 'string' ? val : val['image'])}>
=======
            <>
              {/* {loading ? (
                <View
                  style={[
                    wrapStyle,
                    {alignItems: 'center', justifyContent: 'center'},
                  ]}>
                  <ActivityIndicator size="large" color={Colors.POPUP_RED} />
                </View>
              ) : null} */}
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
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
<<<<<<< HEAD
            </TouchableOpacity>

=======
            </>
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
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
