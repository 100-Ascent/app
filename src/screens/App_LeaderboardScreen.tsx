import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import { useSelector } from 'react-redux';
import LeagueListCard from '../components/Cards/Leaderboard/LeagueListCard';
import CustomSwitchComponent from '../components/SwitchComponent/SwitchComponent';
import ClickableTableRow from '../components/TableRow/ClickableTableRow';
import TableRow from '../components/TableRow/TableRow';
import Text16Normal from '../components/Text/Text16Normal';
import { AppState } from '../redux';
import {RootNavProp} from '../routes/RootStackParamList';
import { Colors } from '../utils/colors';
import { FONTS } from '../utils/constants/fonts';
import { applyBoldStyleToPartOfString } from '../utils/services/text-utils';

interface Props{
navigation:RootNavProp<'LeaderboardScreen'>;
}

const info = {
  sentence: 'Maximum of {0} can be added per day in this league',
  boldText: ['12 manual Klicks']
};

const LeaderboardScreen: React.FC<Props> = ({navigation}) => {

//State variables
const data = [{
  rank : 1,
  icon: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
  username: "HungryShark_99",
  xp: 530,
  lp: 123,
  isDecreased: true,  
},{
  rank : 2,
  icon: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
  username: "kshatrad_",
  xp: 530,
  lp: 35,
  isDecreased: false, 
},{
  rank : 3,
  icon: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
  username: "normie",
  xp: 530,
  lp: 21,
  isDecreased: false, 
},{
  rank : 4,
  icon: "https://preview.keenthemes.com/metronic-v4/theme/assets/pages/media/profile/profile_user.jpg",
  username: "Kitkat_22343",
  xp: 530,
  lp: 23,
  isDecreased: true, 
},];

const options = ["Weekly", "All Time", "Rules"];
const [ currentSwitch, setCurrentSwitch ] = useState(0);
const [expandedRowIndex, setExpandedRowIndex] = useState(-1);
const [isExpanded, setIsExpanded] = useState(false);
const [isFetching, setFetching] = useState(false); 
//Async functions
const contextId = useSelector((state: AppState) => state.rootStore.contextId);

const onRefresh = () => {

}

const callToGetLeaderboards = async () => { 
 await axios
      .get("/api/leader/boards" , {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data;
        console.log(data);
      })
      .catch(err => {
        console.log('failed in Streakkk data yohoooooooo');
        console.log(err);
      });
}

const callToGetAllTimeData = async () => {
  await axios
      .get("/api/leader/boards/all_time/" + "fe45ec6a-7083-11ec-90d6-0242ac120003", {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data;
        console.log(data);
      })
      .catch(err => {
        console.log('failed in Streakkk data yohoooooooo');
        console.log(err);
      });
}

useEffect(()=>{
  callToGetLeaderboards();
  callToGetAllTimeData();
},[]);

//Component functions

navigation.setOptions({
    headerTitle: 'Leaderboard',
    headerTitleContainerStyle: {alignItems: 'center'},
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerRight: () => <View style={{marginLeft: 0}} />,
    headerLeft: () => (
      <View style={{marginLeft: 10}}>
        <Icon
          name="arrow-back"
          type="ionicons"
          size={30}
          onPress={() => navigation.navigate('MyProfileScreen')}
        />
      </View>
    ),
  });

return <FlatList
    data={data}
    keyExtractor={( item, index ) => 'key'+index}
    onRefresh={() => onRefresh()}
    refreshing={isFetching}
    renderItem={({ item, index })=>{
        return <View style={{flex: 1}}>
            { currentSwitch === 0 ? <ClickableTableRow item={item} handlePress={()=>{
                setExpandedRowIndex(index)
                setIsExpanded(!isExpanded)
              }} expandedRowIndex={expandedRowIndex} isExpanded={isExpanded}/> : 
               currentSwitch === 1 ? <TableRow item={item}/> : null }
        </View>;        
    }}
    ListHeaderComponent={
        <View>
            <LeagueListCard />
            <View style={{ marginHorizontal: 50 }}>
              {applyBoldStyleToPartOfString(info)}
            </View>
            <View style={{ marginHorizontal: 50, marginTop: 5 }}>
              <Text16Normal
                text={"6d 19h 26m"} 
                textColor={Colors.POPUP_RED}
                textStyle={[{ textAlign: 'center' }, FONTS.SEMIBOLD]}
              />
            </View>
            <CustomSwitchComponent options={options} current={currentSwitch} handleSwitch={(idx)=> setCurrentSwitch(idx) } />
            <View style={{ marginTop: 10, borderWidth: 1, borderColor: Colors.BLACK3 }} />
        </View>
    }
/>;
}

export default LeaderboardScreen;