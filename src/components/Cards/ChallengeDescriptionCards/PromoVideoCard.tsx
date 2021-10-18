import React from 'react';
import { View } from 'react-native';
import { Colors } from '../../../utils/colors';
import YoutubePlayer from 'react-native-youtube-iframe';

const PromoVideoCard = () => {
    return (
        <View style={{
            backgroundColor: Colors.TEXT,
            marginHorizontal: 20,
            borderRadius: 10,
            elevation: 1,
        }}>
            <View style={{ paddingHorizontal:20 , paddingTop: 10 }}>
                <YoutubePlayer height={200} play={false} videoId={'e8nzhP30Jwk'} />
            </View>

        </View>
    );
}
export default PromoVideoCard;