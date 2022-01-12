import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import {FONTS} from '../../utils/constants/fonts';
import Text14 from '../Text/Text14';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
  item: any;
  handlePress?: any;
  expandedRowIndex?: any;
  isExpanded?: any;
  rank?: any
}

const TableRow: React.FC<Props> = ({
  item,
  handlePress,
  rank,
  expandedRowIndex,
  isExpanded,
}) => {

  return (
    <View>
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          }}>
          <View style={{width: '10%', alignItems: 'center'}}>
            <Text14
              text={rank}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
          <View style={{width: '20%', borderRadius: 50, height: 50}}>
            <FastImage
              style={{
                width: 50,
                height: 50,
                borderRadius: 50,
                borderWidth: 0.5
              }}
              source={{
                uri: item.image_id,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{width: '45%'}}>
            <Text14
              text={item.username}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
          <View style={{width: '7%', justifyContent: 'center' }}>
            <Text14
              text={item.global_points + item.lp }
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
          <View style={{width: '18%', alignItems: 'center', marginTop: 1 }}>
            {/* <Icon 
                type= { item.lp > 0 ? "ionicon" : "entypo"} 
                name= { item.lp > 0 ? "caret-up" : "minus"} 
                color={ item.lp > 0 ? Colors.INFO_GREEN: Colors.TEXTDARK } 
                size={10} 
                style={{ marginTop: 2, paddingRight: 2 }}
            /> */}
            <Text
              style={[{ color: Colors.TEXTDARK, fontSize: 10 },FONTS.SEMIBOLD]}
            >{item.global_points + ' XP'}</Text>
            <Text
              style={[{ color: Colors.TEXTDARK, fontSize: 10 },FONTS.SEMIBOLD]}
            >{item.lp + ' LP'}</Text>
          </View>
        </View>
      </TouchableOpacity>      
    </View>
  );
};

export default TableRow;
