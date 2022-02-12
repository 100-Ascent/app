import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import {FONTS} from '../../utils/constants/fonts';
import WeeklyStreakCard from '../Cards/WeeklyStreakCard';
import Text14 from '../Text/Text14';
import FormulaSVG from '../../../assets/formula/formula.svg';
import Text28 from '../Text/Text28';
import RankOne from '../../../assets/icons/leaderboard/rank-one.svg';
import RankTwo from '../../../assets/icons/leaderboard/rank-two.svg';
import RankThree from '../../../assets/icons/leaderboard/rank-three.svg';
import Text12Normal from '../Text/Text12Normal';

interface Props {
  item: any;
  handlePress?: any;
  expandedRowIndex?: any;
  isExpanded?: any;
  rank?: any;
  username:any;
  activeDays:any;
  isCustomLeaderboard?: any;
  isFinalLeague?: boolean;
}

const ClickableTableRow: React.FC<Props> = ({
  item,
  handlePress,
  expandedRowIndex,
  isExpanded,
  rank,
  username,
  activeDays,
  isCustomLeaderboard,
  isFinalLeague
}) => {
  //Async functions
  let data = [];
  let actualActiveDays = 0;
  for(let i=0; i < 7; i++) {
    if( i < item.values.length  && item.values[i] >= 0 ){
      data.push(item.values[i]);
      actualActiveDays+=1;
    }else if(i < item.values.length  && item.values[i] < 0){
      data.push(0);
    }else {
      data.push(-1);
    }
  }
  
  return (
    <View>
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingVertical: 10,
            backgroundColor:
             item.username === username ? isFinalLeague && item.rank<=25 ? Colors.CURRENT : item.rank <= 10 ? Colors.PROMOTED : item.rank>10 && item.rank<=25 ? Colors.CURRENT : 
             Colors.DEMOTED : Colors.TRANSPARENT,
          }}>
          <View style={{width: '10%', alignItems: 'center'}}>
            { item.rank === 1 ? <RankOne/> : item.rank === 2? <RankTwo/> : item.rank === 3 ? <RankThree/> : 
            <Text14
              text={item.rank}
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
              text={item.username}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
            {item.show_name ? <Text12Normal
              text={item.name}
              textColor={Colors.TEXTDARK}              
            /> : null }
          </View>
          <View style={{width: '25%', alignItems: 'flex-end'}}>
            <Text14
              text={item.lp + ' LP'}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isExpanded && expandedRowIndex === item.rank - 1 ? (
        <View style={{ backgroundColor:  item.username === username ? isFinalLeague && item.rank<=25 ? Colors.CURRENT_LIGHT :
          item.rank <= 10 ? Colors.PROMOTED_LIGHT : item.rank>10 && item.rank<=25 ? Colors.CURRENT_LIGHT : 
         Colors.DEMOTED_LIGHT : "rgba(220,220,220,0.2)", paddingVertical: 10,}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',                     
            }}>
            <WeeklyStreakCard
              streak={1}
              textStyle={[{color: Colors.TEXTDARK, fontSize: 10 }, FONTS.SEMIBOLD]}
              borderStyle={ {borderColor: Colors.BLACK2, borderWidth: 1, width: 25, height: 25, borderRadius: 25,}}
              valueArray = {['S', 'M', 'T', 'W', 'T', 'F', 'S']}
              subValueArray = {data}
            />
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 15}}>
            {InfoCard('Active Days', actualActiveDays + "/" + activeDays)}
            {InfoCard('Median Klicks',item.median_klicks)}
            {InfoCard('Total Klicks', item.total_klicks)}
          </View>
          <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: 10 }}>
            <FormulaSVG/>
          </View>
        </View>
      ) : null}
    </View>
  );
};

export default ClickableTableRow;

const InfoCard = ( type, value ) => {
    return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View>
            <Text14
                text={type}
                textColor={Colors.TEXTDARK} />
        </View>
        <View>
            <Text28 text={value}
                textColor={Colors.TEXTDARK} />
        </View>
    </View>;
}

