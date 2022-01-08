import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import {FONTS} from '../../utils/constants/fonts';
import WeeklyStreakCard from '../Cards/WeeklyStreakCard';
import Text14 from '../Text/Text14';
import FormulaSVG from '../../../assets/formula/formula.svg';
import Text28 from '../Text/Text28';
import Text12Normal from '../Text/Text12Normal';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
  item: any;
  handlePress?: any;
  expandedRowIndex?: any;
  isExpanded?: any;
}

const TableRow: React.FC<Props> = ({
  item,
  handlePress,
  expandedRowIndex,
  isExpanded,
}) => {
  //State variables

  const [touchedRow, setTouchedRow] = useState(-1);
  //Async functions

  //Component functions

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
              text={item.rank}
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
              }}
              source={{
                uri: item.icon,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
          <View style={{width: '40%'}}>
            <Text14
              text={item.username}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
          <View style={{width: '15%', justifyContent: 'center' }}>
            <Text14
              text={item.xp + ' XP'}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
          <View style={{width: '15%', alignItems: 'center', flexDirection: 'row', marginTop: 1 }}>
            <Icon 
                type="ionicon" 
                name= { item.isDecreased ? "caret-down" : "caret-up"} 
                color={ item.isDecreased ? Colors.POPUP_RED : Colors.INFO_GREEN} 
                size={10} 
                style={{ marginTop: 2, paddingRight: 2 }}
            />
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
