import {StyleSheet, TouchableOpacity, View} from 'react-native';

import { Colors } from '../../utils/colors';
import React from 'react';
import ShareIcon from '../../../assets/icons/share-icon.svg';
import Text16Normal from '../Text/Text16Normal';

interface Props {
  shouldShowIcon?: boolean;
  onPress?: ()=> void;
}

const ShareButton: React.FC<Props> = ({ onPress, shouldShowIcon = true }) => {
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress}>
      <View style={styles.button}>
        { shouldShowIcon ? <ShareIcon /> : <Text16Normal text={"Share"} textColor={Colors.TEXT} /> }
      </View>
    </TouchableOpacity>
  );
};

export default ShareButton;

const styles = StyleSheet.create({
  button : {
    backgroundColor: '#111426',
    marginHorizontal: 5,
    paddingHorizontal: 5,
    paddingVertical: 11,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  }
})