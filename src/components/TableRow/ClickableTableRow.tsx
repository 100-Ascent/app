import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import {FONTS} from '../../utils/constants/fonts';
import WeeklyStreakCard from '../Cards/WeeklyStreakCard';
import Text14 from '../Text/Text14';
import FormulaSVG from '../../../assets/formula/formula.svg';
import Text28 from '../Text/Text28';

interface Props {
  item: any;
  handlePress?: any;
  expandedRowIndex?: any;
  isExpanded?: any;
}

const ClickableTableRow: React.FC<Props> = ({
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
            backgroundColor:
              item.rank === 2 ? Colors.PROMOTED : Colors.TRANSPARENT,
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
          <View style={{width: '50%'}}>
            <Text14
              text={item.username}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
          <View style={{width: '20%'}}>
            <Text14
              text={item.xp + ' XP'}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
        </View>
      </TouchableOpacity>
      {isExpanded && expandedRowIndex === item.rank - 1 ? (
        <View style={{ backgroundColor: item.rank === 2 ? Colors.PROMOTED_LIGHT : Colors.TRANSPARENT, paddingVertical: 10,}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',                     
            }}>
            <WeeklyStreakCard
              streak={1}
              textStyle={[{color: Colors.TEXTDARK, fontSize: 10 }, FONTS.SEMIBOLD]}
              borderStyle={{borderColor: Colors.BLACK2, borderWidth: 1, width: 25, height: 25, borderRadius: 25,}}
              valueArray = {['S', 'M', 'T', 'W', 'T', 'F', 'S']}
              subValueArray = {["26.42", "32.12","26.42", "32.12","26.42", "32.12","26.42"]}
            />
          </View>
          <View style={{flexDirection: 'row', paddingVertical: 15}}>
            {InfoCard('Active Days', '6/7')}
            {InfoCard('Median Klicks','17.85')}
            {InfoCard('Total Klicks', '69')}
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

