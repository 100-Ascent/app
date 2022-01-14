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
const [rulesData, setRulesData] = useState([]);
const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);
const [timer, setTimer] = useState("");
const [leagueEndTime, setLeagueEndTime] = useState("");
const isFocused = useIsFocused();

//Async functions
const contextId = useSelector((state: AppState) => state.rootStore.contextId);
const user = useSelector((state: AppState) => state.rootStore.user);
// const myStatsInAllTime = allTimeData.find(obj=>obj.username.includes(user['username']));
// const myRank =  allTimeData.findIndex( obj=> obj.username === user['username']);

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
          let defaultLB = data.filter(obj=> obj.default)
          setSelectedLeaderboard(defaultLB[0]);
          setLeagueData(res.data['league-data']);
          callToGetRules();
          callToGetWeeklyData(data[0]['id']);
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

const callToGetWeeklyData = async (id: any = leaderboardData[0]['id']) => {
  await axios
    .get("/api/leader/boards/weekly/" + id  , {
      headers: {
        'X-CONTEXT-ID': contextId,
      },
    })
    .then(async res => {
      let data = res.data.data; 
      setLeagueEndTime(res.data.league_end_time);
      setWeeklyLeaderboardData(data);
      callToGetAllTimeData(id);
    })
    .catch(err => {
      console.log('failed in Rules api data yohoooooooo');
      console.log(err);
      setLoading(false);
    });
}

const callToGetAllTimeData = async (id: any = leaderboardData[0]['id']) => {
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
        setLoading(false);
        setLeaderboardLoading(false);
      })
      .catch(err => {
        console.log('failed in all time data yohoooooooo');
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
  const filteredData = fullData.filter(obj => obj.username.includes(formattedQuery) 
  || obj.name.toLowerCase().includes(formattedQuery) 
  )
  setAllTimeLeaderboardData(filteredData);
  setQuery(text);
};

//Component functions
const handleSelectOption = async (val) => {
  setSelectedLeaderboard(val);
  setLeaderboardLoading(true);
  if(val.default){
    await callToGetAllTimeData(val.id);
  }else{
    // Call to new api to get all data
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
    setTimer("The league is over")
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

  
return loading || leaderboardData?.length === 0 ? <RNLoaderSimple/> : <>
  <FlatList
      data={currentSwitch === 0 ? weeklyData : currentSwitch === 1 ? allTimeData : rulesData}
      keyExtractor={( item, index ) => 'key'+index}
      onRefresh={() => onRefresh()}
      refreshing={isFetching}
      keyboardShouldPersistTaps={"handled"}
      renderItem={({ item, index })=>{
          return  currentSwitch === 0 && weeklyData.length === 0 && index === 0 ? 
            <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 50, paddingHorizontal: 10 }}>
              <EmptyState />
              <Text16Bold text={'Your league will start soon!'} textColor={Colors.TEXTDARK} textStyle={{marginTop: -30}} />
              <Text12Bold 
                text={"You'll be automatically added to the leaderboard cohort from next week. Prep yourself up 💪"} 
                textColor={'grey'}  
                textStyle={{ textAlign: 'center'}}
              />
            </View> : 
            isLeaderboardLoading ? index === 0 ? <View style={{marginTop: 30}}><RNLoaderSimple/></View> : null :     
            <View>
                <View style={{ flex: 1 }}>
                    { currentSwitch === 0 ? <ClickableTableRow item={item} username={user['username']} rank={index+1} handlePress={()=>{ setExpandedRowIndex(index); setIsExpanded(!isExpanded)}} expandedRowIndex={expandedRowIndex} isExpanded={isExpanded}/> 
                    : currentSwitch === 1 ? <TableRow item={item} rank={index+1}/> 
                    : index === 0 ? <NotesCard showHeader={false} notes={rulesData} hasNumericBullets={true} /> : null }
                </View>          
                  { currentSwitch === 0 ?  index === 9 && leagueData['league-index'] < leagueData["all-leagues"].length ? 
                    <PromotedSeparator league={leagueData["all-leagues"][leagueData['league-index']+1]} /> 
                    : index === 24 && leagueData['league-index'] !== 0  ? <DemotedSeparator league={leagueData["all-leagues"][leagueData['league-index']-1]} /> : null : null } 
            </View>      
    }}    
    ListFooterComponent={<View style={{ padding: 40 }}/>}
    ListHeaderComponent={
        <View>   
          <TouchableWithoutFeedback onPress={() => console.log('Pressed!')}>
            <View>
              <LeagueListCard data={leagueData} />
              <View style={{ marginHorizontal: 50, marginTop: 10 }}>
                {applyBoldStyleToPartOfString(info, 4*(leagueData['league-index']+1))}
              </View>
              <View style={{ marginHorizontal: 40, marginTop: 5 }}>
                <Text16Normal
                  text={timer} 
                  textColor={Colors.POPUP_RED}
                  textStyle={[{ textAlign: 'center' }, FONTS.SEMIBOLD]}
                />
              </View>
              <View style={{ padding: 10 }}/> 
              <SimpleDropdown data={leaderboardData} selected={selectedLeaderboard} handleSelect={handleSelectOption} />
              <View style={{ padding: 10 }} />
            </View>
            </TouchableWithoutFeedback>        
            <CustomSwitchComponent options={options} current={currentSwitch} handleSwitch={(idx)=> setCurrentSwitch(idx) } />
            <View style={{ marginTop: 10, borderWidth: 1, borderColor: Colors.BLACK3 }} />
            { currentSwitch === 1 ? 
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
{/* { currentSwitch === 1 && myStatsInAllTime !== undefined ?  <View style={{position: 'absolute', bottom: 0}}>
    <TableRow item={myStatsInAllTime} rank={(myRank+1)} tableRowStyle={{ backgroundColor: Colors.CURRENT }} isFixedRow={true}/>
</View> : null } */}
</>
}

export default LeaderboardScreen;