import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import {FONTS} from '../../utils/constants/fonts';
import Text14 from '../Text/Text14';
import Text18 from '../Text/Text18';
import RankOne from '../../../assets/icons/leaderboard/rank-one.svg';
import RankTwo from '../../../assets/icons/leaderboard/rank-two.svg';
import RankThree from '../../../assets/icons/leaderboard/rank-three.svg';
import { truncate } from '../../utils/services/text-utils';

interface Props {
  item: any;
  handlePress?: any;
  expandedRowIndex?: any;
  isExpanded?: any;
  rank?: any;
  tableRowStyle?: any;
  isFixedRow?: boolean;
}

const TableRow: React.FC<Props> = ({
  item,
  handlePress,
  rank,
  expandedRowIndex,
  isExpanded,
  tableRowStyle,
  isFixedRow = false
}) => {
  return (
    <View style={{  }}>
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View
          style={[{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
          },tableRowStyle]}>
          <View style={{width: '10%', alignItems: 'center',}}>
          { rank === 1 ? <RankOne/> : rank === 2? <RankTwo/> : rank === 3 ? <RankThree/> :  <Text14
              text={ rank === 1000 ? "1K" : rank > 1000 ? Math.floor( rank/1000 ) + "K" : rank }
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />}
           
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
          <View style={{width: '35%'}}>
            <Text14
              text={truncate(item.username)}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
            {
              isFixedRow ? <Text14
                text={"Rank " + rank}
                textColor={Colors.TEXTDARK}
                textStyle={FONTS.REGULAR}
              /> : null
            }
          </View>
          <View style={{width: '18%', alignItems: 'center' }}>
            <Text18
              text={((item.global_points) + item.lp)}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
          <View style={{width: '17%', alignItems: 'flex-end', marginTop: 1, paddingRight: 15 }}>            
            <View style={{ paddingLeft: 5 }}>
              <Text style={[{ color: isFixedRow ? Colors.TEXTDARK : Colors.DEMOTED, fontSize: 10, textAlign: 'right'},FONTS.SEMIBOLD]}>{item.global_points + ' XP'}</Text>
            </View>
            <Text style={[{ color: isFixedRow ? Colors.TEXTDARK : Colors.GREEN, fontSize: 8, textAlign: 'right' },FONTS.SEMIBOLD]}>{"+ " + item.lp + ' LP'}</Text>
          </View>
        </View>
      </TouchableOpacity>      
    </View>
  );
};

export default TableRow;
