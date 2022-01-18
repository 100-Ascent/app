import React, {useState} from 'react';
import {FlatList, ScrollView, Text, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../../utils/colors';
import Text24 from '../../Text/Text24';
import LeagueHelpToolTip from '../../Tooltip/LeagueHelpToolTip';

interface Props {
  data: any;
}

const LeagueListCard: React.FC<Props> = ({data}) => {
  //State variables
  const ref = React.useRef<FlatList>(null);
  const [index, setIndex] = useState(data['league_index']);
  //Async functions
  console.log(index);
  //Component functions

  return (
    <View style={{ paddingBottom: 10 }}>
      <FlatList
        data={data['league_images']}
        keyExtractor={(item, index) => 'key' + index}
        renderItem={({item, index}) => {
          return (
            <View style={{marginTop: 20, justifyContent: 'center', elevation: 5 }}>
              <FastImage
                style={{
                  width: data['league_index'] === index ? 95 : 65,
                  height: data['league_index'] === index ? 95 : 65,
                }}
                source={{
                  uri: item,
                  priority: FastImage.priority.high,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          );
        }}
        ItemSeparatorComponent={() => <View style={{paddingHorizontal: 10}} />}
        ListHeaderComponent={() => <View style={{paddingHorizontal: 15}} />}
        ListFooterComponent={() => <View style={{paddingHorizontal: 15}} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={index}
      />
      <View style={{ paddingTop: 5, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Text24
          text={data['all_leagues'][data['league_index']] + " League"}
          textColor={Colors.TEXTDARK}
          textStyle={{textAlign: 'center'}}
        />
        <View style={{ borderWidth: 0, marginTop: 7, marginLeft: 5 }}>
            <LeagueHelpToolTip color={Colors.TEXTDARK}/>
        </View>
      </View>
    </View>
  );
};

export default LeagueListCard;
