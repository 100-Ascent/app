import React, {useEffect, useState} from 'react';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {SafeAreaView, ScrollView, StyleSheet, View} from 'react-native';

import { AppState } from '../redux';
import Background from '../components/Background/StyledBackground';
import {Colors} from '../utils/colors';
import DistanceComponent from '../components/DistanceComponent/DistanceComponent';
import Icon from 'react-native-elements/dist/icons/Icon';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import { USER_ACTIVITY_DATA } from '../utils/apis/endpoints';
import axios from 'axios';
import { isIOS } from 'react-native-elements/dist/helpers';
import { useIsFocused } from '@react-navigation/native';
import { useSelector } from 'react-redux';

interface Props {
  navigation: RootNavProp<'DataInListViewScreen'>;
  route: RootNavRouteProps<'DataInListViewScreen'>;
}

const DataInListViewScreen: React.FC<Props> = ({navigation, route}) => {
  //State variables
  const [loading, setLoading] = useState(true);
  const [data, setActivityData] = useState([]);
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const headers = { headers: { 'X-CONTEXT-ID': contextId } };
  const isFocused = useIsFocused();
  
  //Async functions
  const callToGetUserActivityData = async () => {
    await axios
        .get(USER_ACTIVITY_DATA, headers)
        .then(async res => {
            const data = res.data.data;        
            setActivityData(res.data.success ? data : []);         
            setLoading(false);   
        })
        .catch(err => {
            console.log('failed in activity data yohoooooooo');
            console.log(err);
            setLoading(false);
        });
  };

  useEffect(()=>{
    callToGetUserActivityData();
  },[isFocused]);

  //Component functions
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Activity Data',
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerTitleContainerStyle: {alignItems: 'center'},
      headerRight: () => <View style={{marginRight : 10}} />,
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
          <Icon
            name="arrow-back"
            type="ionicons"
            size={30}
            onPress={() => navigation.pop()}
          />
        </View>
      ),
    });
  }, [])

  const handleEditActivity = (data) => {  
    navigation.navigate('EditActivityScreen', { data: data.uad? data.uad : data });
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        { loading? <RNLoaderSimple/> : 
        <ScrollView
          scrollEnabled
          style={{flexGrow: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, paddingHorizontal: 15, marginTop: 10 }}>
            <View style={[{marginHorizontal: 10}, isIOS ? styles.shadow: {}]}>
              <DistanceComponent
                showAllActivities={true}
                distanceData={data} 
                handleEditActivity={handleEditActivity}  
                // callToGetUserActivityData={callToGetUserActivityData}                             
              />
            </View>
          </View>
          <View style={{padding: 70}} />
        </ScrollView> }
      </Background>
    </SafeAreaView>
  );
};

export default DataInListViewScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  }
})
