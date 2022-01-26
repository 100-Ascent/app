import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, TextInput, TouchableWithoutFeedback, View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import { useSelector, useStore } from 'react-redux';
import NotesCard from '../components/Cards/FitnessCards/NotesCard';
import LeagueListCard from '../components/Cards/Leaderboard/LeagueListCard';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import SimpleDropdown from '../components/SearchablePicker/SimpleDropdown';
import CustomSwitchComponent from '../components/SwitchComponent/SwitchComponent';
import ClickableTableRow from '../components/TableRow/ClickableTableRow';
import DemotedSeparator from '../components/TableRow/DemotedSeparator';
import PromotedSeparator from '../components/TableRow/PromotedSeparator';
import TableRow from '../components/TableRow/TableRow';
import Text16Normal from '../components/Text/Text16Normal';
import { AppState } from '../redux';
import {RootNavProp} from '../routes/RootStackParamList';
import { Colors } from '../utils/colors';
import { FONTS } from '../utils/constants/fonts';
import { applyBoldStyleToPartOfString } from '../utils/services/text-utils';
import EmptyState from '../../assets/icons/empty_state.svg';
import Text12Bold from '../components/Text/Text12Bold';
import Text16Bold from '../components/Text/Text16Bold';
import { useIsFocused } from '@react-navigation/native';
import Text14 from '../components/Text/Text14';

interface Props{
navigation:RootNavProp<'LeaderboardScreen'>;
}

const info = {
  sentence: 'Maximum of {0} can be added per day in this league',
  boldText: ['Manual Klicks']
};

const LeaderboardScreen: React.FC<Props> = ({navigation}) => {

const options = ["Weekly", "All Time", "Rules"];
const [loading, setLoading] = useState(true);
const [isLeaderboardLoading,setLeaderboardLoading] = useState(true);

const [ currentSwitch, setCurrentSwitch ] = useState(0);
const [expandedRowIndex, setExpandedRowIndex] = useState(-1);
const [isExpanded, setIsExpanded] = useState(false);
const [isFetching, setFetching] = useState(false); 
const [leaderboardData, setLeaderboardData] = useState([]);
const [selectedLeaderboard, setSelectedLeaderboard] = useState({});
const [leagueData, setLeagueData] = useState([]);
const [allTimeData, setAllTimeLeaderboardData] = useState([]);
const [weeklyData, setWeeklyLeaderboardData] = useState([]);
const [fullWeeklyData, setFullWeeklyData] = useState([]);
const [activeDays, setActiveDays] = useState(0);
const [rulesData, setRulesData] = useState([]);
const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);
const [timer, setTimer] = useState("");
const [leagueEndTime, setLeagueEndTime] = useState("");
const isFocused = useIsFocused();
const [lastLeagueRank, setLastLeagueRank ] = useState("0");
const [ currentData, setCurrentUserData ] = useState({ myStatsInAllTime: {}, myRank: 0});
const [showNotInLeaderboard,setShowNotInLeaderboard ] = useState(false);
//Async functions
const contextId = useSelector((state: AppState) => state.rootStore.contextId);
const user = useSelector((state: AppState) => state.rootStore.user);


const onRefresh = async () => {
  setFetching(true);
  setLeaderboardLoading(true);
  await callToGetLeaderboards();
  setFetching(false);
}

const callToGetLeaderboards = async () => { 
 await axios
      .get("/api/leader/boards" , {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data.data;
        if(res.data.success){
          setLeaderboardData(data);    
          console.log(res.data);   
          let defaultLB = data.filter(obj=> obj.default)
          setSelectedLeaderboard(defaultLB[0]);
          setLeagueData(res.data['league-data']);
          setLastLeagueRank(res.data['league-data']['last_league_rank'].toString())
          callToGetRules();
          callToGetWeeklyData(defaultLB[0]['id']);
        }else{
          console.log("Success false in leaderboard data")
        }
        
      })
      .catch(err => {
        console.log('failed in leadferboard data yohoooooooo');
        console.log(err);
        setLoading(false);
      });
}

const callToGetRules = async () => { 
  await axios
       .get("/api/leader/boards/rules" , {
         headers: {
           'X-CONTEXT-ID': contextId,
         },
       })
       .then(async res => {
         const data = res.data.rules;
         setRulesData(data);      
       })
       .catch(err => {
         console.log('failed in Rules api data yohoooooooo');
         console.log(err);
         setLoading(false);
       });
 }

const callToGetWeeklyData = async (id: any) => {
  await axios
    .get("/api/leader/boards/weekly/" + id  , {
      headers: {
        'X-CONTEXT-ID': contextId,
      },
    })
    .then(async res => {
      let data = res.data.data; 
      if(res.data.success){
        console.log(res.data);
        setLeagueEndTime(res.data.league_end_time);
        setWeeklyLeaderboardData(data);
        setFullWeeklyData(data);
        setActiveDays(res.data.active_days);
        callToGetAllTimeData(id);
      }else{
        console.log("hi I am here")
        setWeeklyLeaderboardData([""]);
        setShowNotInLeaderboard(true);
        callToGetAllTimeData(id);
      }
      
      // success false
    })
    .catch(err => {
      console.log('failed in Rules api data yohoooooooo');
      console.log(err);
      setLoading(false);
    });
}

const setWeeklyCustomLeaderBoardData = (data) => {
  data.sort((a,b) => (a.lp > b.lp) ? -1 : ((b.lp > a.lp) ? 1 : 0))
  setWeeklyLeaderboardData(data);
}

const callToGetAllTimeData = async (id: any = leaderboardData[0]['id']) => {
  console.log(id);
  await axios
      .get("/api/leader/boards/all_time/" + id, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        let data = res.data.data;    
        setAllTimeLeaderboardData(data);
        setFullData(data);
        const myStatsInAllTime = res.data.data.find(obj=>obj.username.includes(user['username']));
        const myRank =  res.data.data.findIndex( obj=> obj.username === user['username']);
        setCurrentUserData({
          myStatsInAllTime, myRank
        })
        setLoading(false);
        setLeaderboardLoading(false);
      })
      .catch(err => {
        console.log('failed in all time data yohoooooooo');
        console.log(err);
        setLoading(false);
      });
}

const callToGetCustomLeaderboardsData = async (id: any) => {
  setLeaderboardLoading(true);
  await axios
       .get("/api/custom/leaderboard/" + id , {
         headers: {
           'X-CONTEXT-ID': contextId,
         },
       })
       .then(async res => {
         const data = res.data;   
         console.log(res.data);
         setAllTimeLeaderboardData(res.data.data);
         setActiveDays(res.data.active_days);
         setLeagueEndTime(res.data.league_end_time)
         setWeeklyCustomLeaderBoardData(res.data.data); 
         setLeaderboardLoading(false);
       })
       .catch(err => {
         console.log('failed in custom leaderboard api data yohoooooooo');
         console.log(err);
         setLoading(false);
       });
}


useEffect(()=>{
  setLoading(true);
  callToGetLeaderboards();
},[isFocused]);

const handleSearch = text => {
  const formattedQuery = text.toLowerCase();
  const filteredData = currentSwitch === 0 ?  fullWeeklyData.filter(obj => obj.username.includes(formattedQuery) 
  || obj.name.toLowerCase().includes(formattedQuery)) : fullData.filter(obj => obj.username.includes(formattedQuery) 
  || obj.name.toLowerCase().includes(formattedQuery) 
  )

  if(currentSwitch===0){
    setWeeklyLeaderboardData(filteredData)
  }else{
    setAllTimeLeaderboardData(filteredData);
  }
  
  setQuery(text);
};

//Component functions
const handleSelectOption = async (val) => {
  setSelectedLeaderboard(val);
  setLeaderboardLoading(true);
  if(val.default){
      await callToGetWeeklyData(val.id);
    }else{
      await callToGetCustomLeaderboardsData(val.id);
  }
  
  setLeaderboardLoading(false);
}

const getDateTimeString = () => {
  const end = new Date(leagueEndTime).getTime();
  const now = new Date(new Date().toISOString()).getTime();
  var one_day=1000*60*60*24;
  let milliseconds = end-now;
  if(milliseconds>= 0){
    let minutes = Math.floor(((milliseconds / (1000*60)) % 60));
    let hours = Math.floor(((milliseconds / (1000*60*60)) % 24));
    let days = Math.floor(milliseconds/one_day);
    setTimer(days + "d " +  hours + "h " + minutes + "m");
  }else{
    setTimer("")
  }
  
}

useEffect(()=>{
  getDateTimeString();
});

navigation.setOptions({
    headerTitle: 'Leaderboard',
    headerTitleContainerStyle: {alignItems: 'center'},
    headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
    headerRight: () => <View style={{marginLeft: 0}} />,        
  });

return loading || leaderboardData?.length === 0 ? <RNLoaderSimple/> : <>
  <LeagueListCard data={leagueData} />
  <FlatList
      data={currentSwitch === 0 ? weeklyData : currentSwitch === 1 ? allTimeData : rulesData}
      keyExtractor={( item, index ) => 'key'+index}
      onRefresh={() => onRefresh()}
      refreshing={isFetching}
      keyboardShouldPersistTaps={"handled"}
      renderItem={({ item, index })=>{
          return  currentSwitch === 0 && weeklyData[0] === "" && index === 0 ? 
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 50, paddingHorizontal: 10 }}>  
              <View style={{padding: 40}} />            
              <Text16Bold text={'Your league will start soon!'} textColor={Colors.TEXTDARK} textStyle={{marginTop: -30}} />
              <View style={{ paddingHorizontal: 15 }}>
              <Text12Bold 
                text={"You'll be automatically added to the leaderboard cohort on coming Sunday. Prep yourself up 💪"} 
                textColor={'grey'}  
                textStyle={{ textAlign: 'center'}}
              />
              <EmptyState />
              </View>
            </View> : 
            isLeaderboardLoading ? index === 0 ? <View style={{marginTop: 30}}><RNLoaderSimple/></View> : null :     
            <View>
                <View style={{ flex: 1 }}>
                    { currentSwitch === 0 ? <ClickableTableRow activeDays={activeDays} item={item} username={user['username']} rank={index+1} handlePress={()=>{ setExpandedRowIndex(index); setIsExpanded(!isExpanded)}} expandedRowIndex={expandedRowIndex} isExpanded={isExpanded}/> 
                    : currentSwitch === 1 ? <TableRow item={item} rank={index+1}/> 
                    : index === 0 ? <NotesCard showHeader={false} notes={rulesData} hasNumericBullets={true} /> : null }
                </View>          
                  { currentSwitch === 0 ? !selectedLeaderboard['default'] ? null : index === 9 && leagueData['league_index'] < leagueData["all_leagues"].length ? 
                    <PromotedSeparator league={leagueData["all_leagues"][leagueData['league_index']+1]} /> 
                    : index === 24 && leagueData['league_index'] !== 0  ? <DemotedSeparator league={leagueData["all_leagues"][leagueData['league_index']-1]} /> : null : null } 
            </View>      
    }}    
    ListFooterComponent={<View style={{ padding: 40 }}/>}
    ListHeaderComponent={
        <View>   
          <TouchableWithoutFeedback onPress={() => console.log('Pressed!')}>
            <View>
              
              <View style={{ marginHorizontal: 50, marginTop: 10 }}>
                {applyBoldStyleToPartOfString(info, 4*(leagueData['league_index']+1))}
              </View>
              
              { timer.length === 0 ? null : <View style={{ marginHorizontal: 40, marginTop: 5 }}>
                <Text16Normal
                  text={timer} 
                  textColor={Colors.POPUP_RED}
                  textStyle={[{ textAlign: 'center' }, FONTS.SEMIBOLD]}
                />
              </View>}
              { selectedLeaderboard['default'] ? <View style={{ marginHorizontal: 40, marginTop: 5, flexDirection: 'row', justifyContent: 'center' }}>
                <Text14
                  text={"Your last week's rank was "} 
                  textColor={Colors.TEXTDARK}
                  textStyle={[{ textAlign: 'center' }]}
                />
                <Text14
                  text={lastLeagueRank === "0" ? "-" : "#" +lastLeagueRank} 
                  textColor={Colors.TEXTDARK}
                  textStyle={[{ textAlign: 'center' }, FONTS.SEMIBOLD]}
                />
              </View> : null }
              <View style={{ padding: 10 }}/> 
              <SimpleDropdown data={leaderboardData} selected={selectedLeaderboard} handleSelect={handleSelectOption} />
              <View style={{ padding: 10 }} />
            </View>
            </TouchableWithoutFeedback>        
            <CustomSwitchComponent options={options} current={currentSwitch} handleSwitch={(idx)=> { setQuery(""); setCurrentSwitch(idx)} } />
            <View style={{ marginTop: 10, borderWidth: 1, borderColor: Colors.BLACK3 }} />
            { currentSwitch === 1 || (currentSwitch === 0 && !selectedLeaderboard['name'].toLowerCase().includes("global") ) ? 
              <View style={{ 
                marginHorizontal: 20, 
                borderRadius: 10, 
                marginVertical: 10, 
                elevation: 1, 
                flexDirection: 'row', 
                backgroundColor: Colors.TEXT, 
                alignItems: 'center' 
                }}>
                <View style={{ paddingLeft: 10}}>
                  <Icon name="search" type="ionicon" color={Colors.BLACK4}  />
                </View> 
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  clearButtonMode="always"
                  value={query}
                  onChangeText={queryText => handleSearch(queryText)}
                  placeholder="Type name / username"
                  placeholderTextColor={Colors.BLACK4} 
                  secureTextEntry={false}                                   
                  style={[ FONTS.REGULAR, { flex:1, borderRadius: 10, paddingHorizontal: 10, color: Colors.TEXTDARK }]}                                    
                />
                </View> 
                  : null }
        </View>
    }
/>
{ isLeaderboardLoading ? null : currentSwitch === 1 && currentData.myStatsInAllTime !== {} ?  <View style={{position: 'absolute', bottom: 0 }}>
    <TableRow item={currentData.myStatsInAllTime} rank={(currentData.myRank+1)} tableRowStyle={{ backgroundColor: Colors.CURRENT, elevation: 1 }} isFixedRow={true}/>
</View> : null }
</>
}

export default LeaderboardScreen;