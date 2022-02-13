import {
  DeviceEventEmitter,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {AppState} from '../redux';
import Background from '../components/Background/StyledBackground';
import {Colors} from '../utils/colors';
import { FONTS } from '../utils/constants/fonts';
import Icon from 'react-native-elements/dist/icons/Icon';
import InstitutionCard from '../components/Cards/Institution/InstitutionCard';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import StyledButton from '../components/Button/StyledButton';
import {Text} from 'react-native-elements';
import Text16Normal from '../components/Text/Text16Normal';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { USER_DETAILS_UPDATE } from '../utils/apis/endpoints';
import AsyncStorage from '@react-native-community/async-storage';

interface Props {
  navigation: RootNavProp<'InstitutionScreen'>;
  route : RootNavRouteProps<"InstitutionScreen">;
}

const InstitutionScreen: React.FC<Props> = ({navigation, route}) => {

  const alreadySelectedId = route.params.selectedId;
  const [loading, setLoading] = useState(true);
  const [institution, setInstitution] = useState([]);
  const [allInstitution, setAllInstitution] = useState([]);
  const [selectedId, setCurrentSelectedId] = useState(alreadySelectedId);
  const [query, setQuery] = useState('');

  const contextId = useSelector((state: AppState) => state.rootStore.contextId);

  const callToGetInstitutionList = async () => {
    const headers = {'X-CONTEXT-ID': contextId};
    await axios
      .get('/api/college/list', {headers})
      .then(async res => {

        let data = res.data.data;
        setAllInstitution(data);
        if(data.length %2 != 0 ){
          data.push("");
          setInstitution(data);
        }else {
          setInstitution(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.log('Failed in Institution data api');
        console.log(err);
        setLoading(false);
      });
  };


  const callToSaveInstitution = async (institution) => {
    await axios
      .post(USER_DETAILS_UPDATE, {
        college_id: institution.id
      })
      .then(async res => {
        DeviceEventEmitter.emit("event.testEvent", {institution}); 
        DeviceEventEmitter.removeAllListeners("event.testEvent");
        AsyncStorage.setItem('showIntitutionCard', "false");
        navigation.pop();
      })
      .catch(err => {
        console.log('failed in saving institution data');
        console.log(err);
      });
  }

  const handleSavePress = (institutionId) => {    
    if(allInstitution.length > 0 ){
      const institution = allInstitution.filter(obj => obj.id === institutionId)[0];
      callToSaveInstitution(institution);
    }else{
      DeviceEventEmitter.removeAllListeners("event.testEvent");
      navigation.pop();
    }
   

  }

  const handlePress = (item) => {
    console.log(item.id);
    setCurrentSelectedId(item.id);
    navigation.setOptions({
      headerRight: () => ( <View style={{marginRight: 10}} >
        <StyledButton text='Save' onPress={()=>handleSavePress(item.id)} buttonStyle={{ 
          paddingHorizontal: 13,
          backgroundColor: Colors.POPUP_RED, 
          paddingTop: 4,
          paddingBottom: 7
        }}/>
      </View> ),
    })
  }

  const handleSearch = text => {

    const formattedQuery = text.toLowerCase();
    let filteredData = allInstitution.filter(obj => 
      obj.name.toLowerCase().includes(formattedQuery) || 
      obj.abbr.toLowerCase().includes(formattedQuery) || 
      obj.city.toLowerCase().includes(formattedQuery) );
    
    if(filteredData.length === 0){
      setInstitution([{ }]);
    } else if(filteredData.length %2 != 0 ){
      filteredData.push({ abbr: "-1" });
      setInstitution(filteredData);
    } else {
      setInstitution(filteredData);
    }

    setQuery(text);
  };


  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Select your Institution',
      headerTitleContainerStyle: {alignItems: 'center'},
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerRight: () => ( <View style={{marginRight: 10}} >
        <StyledButton text='Save' disabled={alreadySelectedId === -1 ? true : false } onPress={ 
          alreadySelectedId === -1 ? ()=>{} : ()=>handleSavePress(alreadySelectedId) } 
          buttonStyle={{ 
            paddingHorizontal: 13,
            backgroundColor: alreadySelectedId === -1 ?  Colors.INFO_GREY : Colors.POPUP_RED, 
            paddingTop: 4,
            paddingBottom: 7
          }}/>
      </View> ),
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <Icon
            name="arrow-back"
            type="ionicons"
            size={30}
            onPress={() => navigation.pop()}
            tvParallaxProperties={undefined}
          />
        </View>
      ),
    });

    callToGetInstitutionList();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <>
          {loading ? (
            <RNLoaderSimple />
          ) : (
            <View style={styles.container}>
              <FlatList                
                data={institution}
                renderItem={({item, index}) => {
                  return Object.keys(item).length > 0 ? <InstitutionCard data={item} index={index} handlePress={handlePress} selectedId ={selectedId} /> : 
                  <View style={{ width: '100%' }}>
                    <View style={{ alignItems: 'center', paddingVertical: 20, marginHorizontal: 15 }}>
                        <Text16Normal text={"Oops! This institution doesnt exist!"} textColor={Colors.POPUP_RED} textStyle={FONTS.SEMIBOLD}/>
                    </View>
                  </View>
                }}
                keyExtractor={item => `${item.id}`}
                showsHorizontalScrollIndicator={false}
                numColumns={2}
                ListHeaderComponent={
                  <View style={{  marginHorizontal: 15, marginTop: 10, marginBottom: 15 }}>
                    <TextInput
                          autoCapitalize="none"
                          autoCorrect={false}
                          value={query}
                          onChangeText={queryText => handleSearch(queryText)}
                          placeholder="Search your institution"
                          placeholderTextColor={Colors.BLACK4} 
                          secureTextEntry={false}                                   
                          style={[ FONTS.REGULAR, { 
                            flex:1, 
                            borderWidth: 1, 
                            borderColor: Colors.BLACK3,
                            borderRadius: 10, 
                            paddingHorizontal: 10, 
                            paddingVertical: 5, 
                            color: Colors.TEXTDARK 
                          }]}                     
                          selectionColor={Colors.BLACK3}                                        
                        />   
                    </View>      
                }
                ListFooterComponent={()=>{
                  return <View style={{ padding: 100 }} />
                }}
              />              
            </View>
          )}
        </>
      </Background>
    </SafeAreaView>
  );
};

export default InstitutionScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
  },
});
