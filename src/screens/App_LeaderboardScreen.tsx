import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, TextInput, View } from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import { useSelector, useStore } from 'react-redux';
import NotesCard from '../components/Cards/FitnessCards/NotesCard';
import LeagueListCard from '../components/Cards/Leaderboard/LeagueListCard';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import SimpleDropdown from '../components/SearchablePicker/SimpleDropdown';
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
const [loading, setLoading] = useState(true);
const [ currentSwitch, setCurrentSwitch ] = useState(0);
const [expandedRowIndex, setExpandedRowIndex] = useState(-1);
const [isExpanded, setIsExpanded] = useState(false);
const [isFetching, setFetching] = useState(false); 
const [leaderboardData, setLeaderboardData] = useState([]);
const [leagueData, setLeagueData] = useState([]);
const [allTimeData, setAllTimeLeaderboardData] = useState([]);
const [weeklyData, setWeeklyLeaderboardData] = useState([]);
const [rulesData, setRulesData] = useState([]);
const [query, setQuery] = useState('');
const [fullData, setFullData] = useState([]);

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
        const data = res.data.data;
        setLeaderboardData(data);
        setLeagueData(res.data['league-data'])
        callToGetRules();
        callToGetWeeklyData(data[0]['id']);
      })
      .catch(err => {
        console.log('failed in Streakkk data yohoooooooo');
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
      const data = res.data.data;
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
        const data = res.data.data;
        setAllTimeLeaderboardData(data);
        setFullData(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('failed in Streakkk data yohoooooooo');
        console.log(err);
        setLoading(false);
      });
}

useEffect(()=>{
  setLoading(true);
  callToGetLeaderboards();
},[]);

const handleSearch = text => {
  const formattedQuery = text.toLowerCase();
  const filteredData = fullData.filter(obj => obj.username.includes(formattedQuery) )
  setAllTimeLeaderboardData(filteredData);
  setQuery(text);
};

//Component functions
const handleSelectOption = (id) => {
  callToGetAllTimeData(id);
}

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

return loading || leaderboardData.length === 0 ? <RNLoaderSimple/> :
  <FlatList
      data={currentSwitch === 0 ? weeklyData : currentSwitch === 1 ? allTimeData : rulesData}
      keyExtractor={( item, index ) => 'key'+index}
      onRefresh={() => onRefresh()}
      refreshing={isFetching}
      renderItem={({ item, index })=>{
          return <View style={{ flex: 1 }}>
              { currentSwitch === 0 ? <ClickableTableRow item={item} rank={index+1} handlePress={()=>{
                  setExpandedRowIndex(index)
                  setIsExpanded(!isExpanded)
              }} expandedRowIndex={expandedRowIndex} isExpanded={isExpanded}/> : 
                  currentSwitch === 1 ? <TableRow item={item} rank={index+1}/> : index === 0 ? <NotesCard showHeader={false} notes={rulesData} /> : null }
        </View>;        
    }}
    ListHeaderComponent={
        <View>
            <View style={{ padding: 10 }}/>
            <SimpleDropdown data={leaderboardData} handleSelect={handleSelectOption} />
            <LeagueListCard data={leagueData} />
            <View style={{ marginHorizontal: 50, marginTop: 10 }}>
              {applyBoldStyleToPartOfString(info)}
            </View>
            <View style={{ marginHorizontal: 50, marginTop: 5 }}>
              <Text16Normal
                text={"6d 19h 26m"} 
                textColor={Colors.POPUP_RED}
                textStyle={[{ textAlign: 'center' }, FONTS.SEMIBOLD]}
              />
            </View>
            <View style={{ padding: 10 }} />
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
}

export default LeaderboardScreen;