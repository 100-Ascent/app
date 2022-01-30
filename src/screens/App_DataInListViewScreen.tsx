import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import { useSelector } from 'react-redux';
import Background from '../components/Background/StyledBackground';
import DistanceComponent from '../components/DistanceComponent/DistanceComponent';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import { AppState } from '../redux';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import { USER_ACTIVITY_DATA } from '../utils/apis/endpoints';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'DataInListViewScreen'>;
  route: RootNavRouteProps<'DataInListViewScreen'>;
}

const DataInListViewScreen: React.FC<Props> = ({navigation, route}) => {
  //State variables
  const [loading, setLoading] = useState(true);
  const [data, setActivityData] = useState([]);
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  
  //Async functions
  const callToGetUserActivityData = async () => {
    setLoading(true);
    await axios
      .get(USER_ACTIVITY_DATA, {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(async res => {
        const data = res.data.data;
        if (res.data.success) {          
          setActivityData(data);
          setLoading(false);
        } else {
          setActivityData([]);
          setLoading(false);
        }
      })
      .catch(err => {
        console.log('failed in activity data yohoooooooo');
        console.log(err);
      });
  };

  useEffect(()=>{
    callToGetUserActivityData();
  },[]);

  //Component functions
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Activity Data',
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerTitleContainerStyle: {alignItems: 'center'},
      headerRight: () => <View style={{marginLeft: 10}} />,
    });
  }, [])

  const handleEditActivity = (data) => {  
    navigation.replace('EditActivityScreen', { data });
  }
  
  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        { loading? <RNLoaderSimple/> : 
        <ScrollView
          scrollEnabled
          style={{flexGrow: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, paddingHorizontal: 15}}>
            <View style={{marginHorizontal: 10}}>
              <DistanceComponent
                showAllActivities={true}
                distanceData={data} 
                handleEditActivity={handleEditActivity}  
                callToGetUserActivityData={callToGetUserActivityData}                             
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
