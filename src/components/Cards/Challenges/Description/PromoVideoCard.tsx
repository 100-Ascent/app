import {StyleSheet, View} from 'react-native';

import {Colors} from '../../../../utils/colors';
import React from 'react';
import YoutubePlayer from 'react-native-youtube-iframe';

const PromoVideoCard = () => {
  return (
    <View style={styles.container}>
        <YoutubePlayer height={180} play={false} videoId={'e8nzhP30Jwk'} />
    </View>
  );
};
export default PromoVideoCard;

const styles = StyleSheet.create({
    container: {
        elevation: 3,
        borderRadius: 10,
        marginHorizontal: 20,
        backgroundColor: Colors.TEXT,
        padding: 10
      }
})
