import React, {useEffect} from 'react';
import {SafeAreaView, ScrollView, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import Background from '../components/Background/StyledBackground';
import DistanceComponent from '../components/DistanceComponent/DistanceComponent';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

interface Props {
  navigation: RootNavProp<'DataInListViewScreen'>;
  route: RootNavRouteProps<'DataInListViewScreen'>;
}

const DataInListViewScreen: React.FC<Props> = ({navigation, route}) => {
  //State variables
  const data = route.params.data;

  //Async functions

  //Component functions
  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'All Activity Data',
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerTitleContainerStyle: {alignItems: 'center'},
      headerRight: () => <View style={{marginLeft: 10}} />,
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
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <ScrollView
          scrollEnabled
          style={{flexGrow: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={{flex: 1, paddingHorizontal: 15}}>
            <View style={{marginHorizontal: 10}}>
              <DistanceComponent
                showAllActivities={true}
                distanceData={data}
                setRefreshing={() => {}}
                setActivityData={() => {}}
                setLoading={() => {}}
                setStreak={undefined}
                setIsToday={undefined}
              />
            </View>
          </View>
          <View style={{padding: 50}} />
        </ScrollView>
      </Background>
    </SafeAreaView>
  );
};

export default DataInListViewScreen;
