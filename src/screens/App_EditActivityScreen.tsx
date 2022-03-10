import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';

import AddCommentImageCard from '../components/Cards/PostAChallengeCard/AddCommentImageCard';
import {AppState} from '../redux';
import Background from '../components/Background/StyledBackground';
import CalMinStepsCard from '../components/Cards/PostAChallengeCard/CalMinStepsCard';
import {Colors} from '../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import DistanceTimeCard from '../components/Cards/PostAChallengeCard/PostChallengeCard_DistanceTimeCard';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import RNSearchablePicker from '../components/SearchablePicker/SearchablePicker';
import { STREAM } from '../utils/constants/constants';
import StyledButton from '../components/Button/StyledButton';
import SubscribedChallengeListCard from '../components/Cards/PostAChallengeCard/SubscribedChallengeListCard';
import Text12Bold from '../components/Text/Text12Bold';
import {UPDATE_ACTIVITY_DATA} from '../utils/apis/endpoints';
import axios from 'axios';
import { isIOS } from 'react-native-elements/dist/helpers';
import moment from 'moment';
import {useSelector} from 'react-redux';

export type AndroidMode = 'date' | 'time';
interface Props {
  navigation: RootNavProp<'EditActivityScreen'>;
  route: RootNavRouteProps<'EditActivityScreen'>;
}


const EditActivityScreen: React.FC<Props> = ({navigation, route}) => {
  
  const routeData = route.params.data;
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const headers = { 'X-CONTEXT-ID': contextId };
  const [subscribedChallenge, setSubscribedChallenge] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const callToGetChallengeList = async() => {
    await axios
    .get("/api/user/data/" + routeData?.id, { headers })
      .then(res => {
        const data = res.data.data;
        setSubscribedChallenge(data);
        setLoading(false);
      })
      .catch(err => {
        console.log('error');
        console.log(err);
        setLoading(false);
      });

  }

  const isEditable = routeData.stream.toLowerCase() === STREAM.MANUAL.toLowerCase();
  const routeDate = new Date(routeData.date);

  const activityData = useSelector((state: AppState) => state.rootStore.activityData.data);
  const [show, setShow] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date(routeDate.getFullYear(), routeDate.getMonth(), routeDate.getDate(), routeDate.getHours(), routeDate.getMinutes(), routeDate.getSeconds() ));
  const [date, setDate] = useState(new Date(routeDate.getFullYear(), routeDate.getMonth(), routeDate.getDate(), routeDate.getHours(), routeDate.getMinutes(), routeDate.getSeconds() ));
  
  const [dropdownData, setDropdownData] = useState([]);
  const selectedActivity = activityData.activities.filter(obj => obj.id === (routeData.activity? routeData.activity.id : routeData.activity_id) )[0];
  const [selected, setSelected] = useState(selectedActivity);
  
  const [defaultOption, setDefaultOption] = useState(routeData.is_distance ? 0 : 1);
  const [value, setValue] = useState(routeData.raw_data);
  const [distanceTimeData, setDistanceTimeData] = useState(routeData.raw_data);
  const [klicks, setKlicks] = useState(routeData.klicks);
  
  const [calminsteps, setCalMinSteps] = useState({
      cal: routeData.calories,
      min: routeData.min,
      steps: routeData.steps,
    });
    
  const [comment, setComment] = useState(routeData.comment);
  const [isAllowPost, setDisablePost] = useState(false);

  const getChallengeIdList = (data) => {
    let arr = [];
    for(let idx=0;idx<data.length;idx++){
      arr.push(data[idx]['cid']);
    }
    return arr;
  }

  // API call to update
  const handleUpdateData = async () => {
    const timeNow = new Date(
      parseInt(selectedDate.toISOString().substring(0,4)), 
      parseInt(selectedDate.toISOString().substring(5,7))-1, parseInt(selectedDate.toISOString().substring(8,10)), 
      new Date().getHours(), 
      new Date().getMinutes(), 
      new Date().getSeconds());
     
      const data = {
        activity_id: selected.id,
        date: selectedDate.toISOString().substring(0,10) + "T" + timeNow.toISOString().substring(11,19) + "Z",
        count: parseFloat(distanceTimeData),
        is_distance: defaultOption === 0,
        calories: calminsteps.cal,
        min: defaultOption === 0 ? calminsteps.min : value,
        steps: calminsteps.steps,
        comment: comment,
        challenges: getChallengeIdList(subscribedChallenge.filter(obj=> obj.is_attach ))
      };
   
    await axios
      .put( UPDATE_ACTIVITY_DATA + route.params.data.id, data)
      .then(res => {
        ToastAndroid.show('Updated activity data',ToastAndroid.SHORT);
        navigation.pop();
      })
      .catch(err => {
        console.log('error');
        console.log(err);
      });
  };


  // Handle change of date
  const onChange = (event, selectedDateValue) => {
    const currentDate = selectedDateValue;
    setShow(Platform.OS === 'ios');
    if (currentDate !== undefined) {
      setDate(currentDate);
      setSelectedDate(currentDate);
      setDisablePost(
        currentDate === null ||
          selected['id'] === undefined ||
          distanceTimeData.length === 0,
      );
    }
  };

  // Set mode of dateTimePicker
  const showMode = currentMode => {
    setShow(true);
  };

  // Open date picker
  const showDatepicker = () => {
    showMode('date');
  };

  // Handle Activity Change
  const selectHandler = item => {
    setSelected(item);
    setDefaultOption(item.is_distance ? 0 : 1);
    setValue('');
    setKlicks(0);
    setDisablePost(true);
  };

  // Get distance time data
  const getDistanceTimeData = data => {
    setDistanceTimeData(data);
    setDisablePost(
      selectedDate === null ||
        selected['id'] === undefined ||
        data.length === 0,
    );
  };

  // Calories, minutes, steps data
  const getCalMinStepsData = (text, type) => {
    setCalMinSteps(prevState => ({
      ...prevState,
      [type]: text,
    }));
  };

  // Comment data
  const onCommentChange = text => {
    setComment(text);
  };

  // Get activity data
  const getDropdownActivities = () => {
    setDropdownData(activityData.activities);
  };

  const checkPostButtonState = () => {
    setDisablePost(
      selectedDate === null ||
        selected['id'] === undefined ||
        distanceTimeData.length === 0,
    );
  };

  const handleSelectedChallenges = (idx) => {  
    let challenges = [...subscribedChallenge];
    let data = { ...challenges[idx] };
    data.is_attach = !data.is_attach;
    challenges[idx] = data;
    checkPostButtonState();
    setSubscribedChallenge(challenges);    
  }

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Edit Activity',
      headerTitleContainerStyle: {alignItems: 'center'},
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
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
    getDropdownActivities();
    callToGetChallengeList();
  }, []);

  // Date difference for showing alert
  var dateDifference = Math.floor(
    (Date.UTC(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate(),
    ) -
      Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())) /
      (1000 * 60 * 60 * 24),
  );
  
  return (
    <View style={{flex: 1}}>
      <Background startColor={Colors.WHITE} endColor={Colors.WHITE}>
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
          keyboardVerticalOffset={Platform.OS == 'ios' ? 0 : 55}
          enabled={Platform.OS === 'ios' ? true : false}
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
          <ScrollView
            style={{flex: 1}}
            contentContainerStyle={{flexGrow: 1}}
            keyboardShouldPersistTaps="handled">
            {loading && dropdownData.length === 0 ? (
              <RNLoaderSimple />
            ) : subscribedChallenge.length === 0 ? <RNLoaderSimple /> : (
              <View style={{flex: 1, marginHorizontal: 20}}>
                <View
                  style={{
                    marginVertical: 20,
                  }}>
                  <TouchableOpacity
                    onPress={showDatepicker}
                    disabled={!isEditable}
                    activeOpacity={1}
                    style={{
                      backgroundColor: Colors.TEXT,
                      borderWidth: 0,
                      borderRadius: 10,
                    }}>
                    <View
                      style={{
                        padding: 10,
                        borderRadius: 10,
                        borderColor: Colors.TRANSPARENT,
                        backgroundColor: isEditable ? Colors.TEXT : Colors.BLACK5,
                        shadowColor: Colors.BLACK1,
                        shadowOffset: {
                          width: 0,
                          height: 1,
                        },
                        shadowOpacity: 0.22,
                        shadowRadius: 2.22,
                        elevation: 3,
                        flexDirection: 'row',
                      }}>
                      <View style={{flex: 5}}>
                        <Text
                          style={{
                            color: isEditable ? Colors.TEXTDARK : Colors.BLACK6,
                            fontWeight: 'normal',
                          }}>
                          {selectedDate === null
                            ? 'Select Date'
                            : moment(date).format('MMM DD, YYYY')}
                        </Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'center'}}>
                        <Icon
                          name="calendar-today"
                          type="MaterialIcons"
                          size={20}
                          color={Colors.ORANGE}
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                {dateDifference < 2 ? (
                  <View />
                ) : (
                  <View
                    style={{
                      backgroundColor: '#F9EEA0',
                      borderRadius: 10,
                      width: '100%',
                      marginBottom: 20,
                      marginTop: -10,
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'flex-start',
                      paddingVertical: 7,
                      paddingHorizontal: 15,
                      shadowColor: Colors.BLACK1,
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,
                      elevation: 3,
                    }}>
                    <Icon
                      name="warning"
                      size={14}
                      color={Colors.ORANGE}
                      style={{marginRight: 10}}
                    />
                    <View>
                      <Text12Bold
                        text="Note: This activity won't be considered in streak calculations. However, it'll be considered while calculating your general statistics."
                        textColor={Colors.TEXTDARK}
                        textStyle={{textDecorationLine: 'none'}}
                      />
                    </View>
                  </View>
                )}

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="calendar"
                    onChange={onChange}
                    minimumDate={
                      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                    }
                    maximumDate={new Date()}
                  />
                )}

                <View
                  style={{flexDirection: 'row', width: '100%', marginTop: 10}}>
                  <View
                    style={{
                      width: '30%',
                      alignItems: 'flex-end',
                    }}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 80,
                        padding: 10,
                      }}>
                      <FastImage
                        style={{width: 70, height: 70, borderRadius: 30}}
                        source={{
                          uri: selected.icon,
                          priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                  <View style={{width: '75%', marginTop: 10}}>
                    <RNSearchablePicker
                      onSelect={selectHandler}
                      data={dropdownData}
                      disabled={!isEditable}
                      placeholder="Choose an item"
                      defaultValue={
                        dropdownData[
                          dropdownData.findIndex(item =>
                            item.name.includes(selected.name),
                          )
                        ].name
                      }
                      containerStyles={{marginHorizontal: 20}}
                      listStyles={{maxHeight: 120}}
                      inputStyles={{
                        paddingLeft: 15, 
                        backgroundColor: isEditable ? Colors.TEXT : Colors.GREY_LIGHT,
                        color: isEditable ? Colors.TEXTDARK : Colors.BLACK6 
                      }}
                    />
                  </View>
                </View>
                <View style={[{marginTop: 30, marginHorizontal: -20}, isIOS? styles.shadow : {} ]}>
                  <DistanceTimeCard
                    defaultOption={defaultOption}
                    selectedItem={selected}
                    toggleHandler={() => {
                       setDefaultOption(1 - defaultOption);
                    }}
                    getData={getDistanceTimeData}
                    value={value}
                    setValue={setValue}
                    klicks={klicks}
                    setKlicks={setKlicks}
                    disabled = {!isEditable}                    
                  />
                </View>
                <View style={[{marginTop: 20, marginHorizontal: -20}, isIOS? styles.shadow : {} ]}>
                  <CalMinStepsCard
                    calminsteps={calminsteps}
                    getCalMinSteps={getCalMinStepsData}
                    isDistance={defaultOption===0}
                    value={value}
                    disabled={!isEditable}
                  />
                </View>
                <View style={{marginTop: 20}}>
                  <SubscribedChallengeListCard
                    selectedDate = {selectedDate}
                    challenges={subscribedChallenge}
                    handleSelectedChallenges={handleSelectedChallenges}
                    handleSubscribeToAChallenge={()=>navigation.navigate('JourneyScreen')}
                  />
                </View>

                <View style={[{marginTop: 20, marginHorizontal: -20}, isIOS? styles.shadow : {} ]}>
                  <AddCommentImageCard
                    comment={comment}
                    onCommentChange={onCommentChange}
                  />
                </View>
                <View style={{marginTop: 20, marginHorizontal: 0}}>
                  <StyledButton
                    text="POST"
                    disabled={isAllowPost}
                    onPress={handleUpdateData}
                  />
                </View>
              </View>
            )}
            <View style={{padding: 70}} />
          </ScrollView>
        </KeyboardAvoidingView>
      </Background>
    </View>
  );
};

export default EditActivityScreen;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
  }
})


