import {StyleSheet, TouchableOpacity, View} from 'react-native';

import { Colors } from '../../../utils/colors';
import { FONTS } from '../../../utils/constants/fonts';
import FastImage from 'react-native-fast-image';
import React from 'react';
import Text10 from '../../Text/Text10';
import Text12Normal from '../../Text/Text12Normal';
import Text18 from '../../Text/Text18';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
  data: any;
  index?: number;
  handlePress: (item)=>void;
  selectedId: any;
}

const InstitutionCard: React.FC<Props> = ({data, index, handlePress, selectedId}) => {
  return data.abbr === "-1"  ? (
    <View style={[styles.emptyCard]} />
  ) : (
    <View
      style={[
        styles.cardStyle,
        {
          marginRight: index % 2 == 0 ? 10 : 15,
          marginLeft: index % 2 != 0 ? 10 : 15,
          backgroundColor: data.is_active ?  "rgba(0,0,0,0.9)" : "rgba(0,0,0,0.3)", 
        },
      ]}>
    <TouchableOpacity activeOpacity={0.8} 
        disabled={!data.is_active}
        style={{ 
            borderWidth: data.id === selectedId ? 3 : 0,
            borderColor: data.id === selectedId ? Colors.POPUP_RED : Colors.WHITE, 
            borderRadius: 10,

        }} 
        onPress={ data.is_active ? () => handlePress(data) : () => { } }>

          { data.is_active ? null : <View style={{ position: 'absolute', top: 60, left: 60, zIndex: 1 }}>
              <Icon name="lock" size={40} />
          </View>}
        <FastImage
            style={{
            width: "100%",
            height: "100%",
            borderRadius: 10,
            opacity: 0.3
            }}
            source={{
            uri: data.image,
            priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
        />
      <View style={styles.textStyle}>
          <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
            <Text18 text={data.abbr} textColor={Colors.TEXT} textStyle={data.id === selectedId ? FONTS.BOLD : FONTS.SEMIBOLD} /> 
          </View>
          <View style={{ paddingHorizontal: 10, paddingTop: 5 }}>
            <Text12Normal text={data.name?.length > 60 ? data.name.substr(0,50) + "..." : data.name } textColor={Colors.TEXT} textStyle={ data.id === selectedId ? FONTS.BOLD : FONTS.SEMIBOLD}  /> 
          </View>
          <View style={{ paddingHorizontal: 10, paddingTop: 5  }}>
            <Text12Normal text={data.city} textColor={Colors.TEXT} textStyle={data.id === selectedId ? FONTS.BOLD : FONTS.SEMIBOLD}  /> 
          </View>
          <View style={{ paddingHorizontal: 10, alignItems: 'flex-end',  paddingBottom: 10 }}>
            <Text10 text={ "Members: " + data.count} textColor={Colors.TEXT} textStyle={data.id === selectedId ? FONTS.BOLD : FONTS.SEMIBOLD}  /> 
          </View>
      </View>
      </TouchableOpacity>
    </View>
  );
};

export default InstitutionCard;

const styles = StyleSheet.create({
  cardStyle: {
    flex: 1,
    height: 150,    
    borderRadius: 10,
    marginBottom: 10,
    marginTop: 5,
  },
  emptyCard: {
    flex: 1,
    height: 150,
    marginHorizontal: 10,
    marginBottom: 12,
  },
  textStyle: {
      position: 'absolute',
      top: 0,
      width: '100%',
      height: 150,
      borderRadius: 10,
      justifyContent: "space-between"
  }
});
