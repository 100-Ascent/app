import { ACTIVITY_LIST, ADD_ACTIVITY_DATA } from '../utils/apis/endpoints';
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
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import AddCommentImageCard from '../components/Cards/PostAChallengeCard/AddCommentImageCard';
import { AppState } from '../redux';
import Background from '../components/Background/StyledBackground';
import CalMinStepsCard from '../components/Cards/PostAChallengeCard/CalMinStepsCard';
import { Colors } from '../utils/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import DistanceTimeCard from '../components/Cards/PostAChallengeCard/PostChallengeCard_DistanceTimeCard';
import FastImage from 'react-native-fast-image';
import { Icon } from 'react-native-elements/dist/icons/Icon';
import RNLoader from '../components/Loader/RNLoader';
import RNLoaderSimple from '../components/Loader/RNLoaderSimple';
import RNSearchablePicker from '../components/SearchablePicker/SearchablePicker';
import { RootNavProp } from '../routes/RootStackParamList';
import { SetActivitData } from '../redux/action';
import StyledButton from '../components/Button/StyledButton';
import SubscribedChallengeListCard from '../components/Cards/PostAChallengeCard/SubscribedChallengeListCard';
import Text12Bold from '../components/Text/Text12Bold';
import axios from 'axios';
import moment from 'moment';
import { styles } from '../styles/Global/styles';

export type AndroidMode = 'date' | 'time';
interface Props {
  navigation: RootNavProp<'AddActivityScreen'>;
}

const AddActivityScreen: React.FC<Props> = ({navigation}) => {
  
  const activityData = useSelector((state: AppState) => state.rootStore.activityData.data);
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const dispatch = useDispatch();
  const headers = { 'X-CONTEXT-ID': contextId };

  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());

  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);
  
  const [dropdownData, setDropdownData] = useState([]);
  const [selected, setSelected] = useState({
    icon: ' ',
  });
  
  const [defaultOption, setDefaultOption] = useState(0);
  const [value, setValue] = useState('');
  const [distanceTimeData, setDistanceTimeData] = useState('');
  const [klicks, setKlicks] = useState(0);
  
  const [calminsteps, setCalMinSteps] = useState({
    cal: '',
    min: '',
    steps: '',
  });
  
  const [comment, setComment] = useState('');
  
  const [isAllowPost, setDisablePost] = useState(true);
  const [subscribedChallenge, setSubscribedChallenge] = useState([]);

  const getChallengeIdList = (data) => {
    let arr = [];
    for(let idx=0;idx<data.length;idx++){
      arr.push(data[idx]['cid']);
    }
    return arr;
  }

  // API call to update
  const handlePostData = async () => {
    const data = {
      count: parseFloat(distanceTimeData),
      activity_id: selected['id'],
      date: selectedDate.toISOString().substring(0,19) + selectedDate.toISOString().substring(23,24),
      is_distance: defaultOption === 0,
      calories: calminsteps.cal,
      min: defaultOption === 0 ? calminsteps.min : value,
      steps: calminsteps.steps,
      comment: comment,
      challenges: getChallengeIdList(subscribedChallenge.filter(obj=> obj.is_attach ))
    };
    await axios
      .post(ADD_ACTIVITY_DATA, data)
      .then(res => {         
        ToastAndroid.show('Added Data successfully!', ToastAndroid.SHORT);
        navigation.navigate('JourneyScreen');
      })
      .catch(err => {
        console.log('error');
        console.log(err);
      });
  };

  const callToGetChallengeList = async() => {
    await axios
    .get("/api/user/sub/challenges", { headers })
      .then(res => {
        const data = res.data.data;
        setSubscribedChallenge(data);
      })
      .catch(err => {
        console.log('errorasdasdsad');
        console.log(err);
        setLoading(false);
      });

  }


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
    setMode(currentMode);
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
  };

  // Get activity data
  const getDropdownActivities = async() => {
    const headers = { 'X-CONTEXT-ID': contextId };
    setLoading(true);
    await axios
    .get(ACTIVITY_LIST, { headers })
      .then(res => {
        const data = res.data.data;      
        dispatch(SetActivitData({data: data}));
        setDropdownData(data.activities);
        let item = data.activities;
        let index = item.findIndex(item => item.name.includes('Average'));
        setSelected(item[index]);
        setDefaultOption(item[index].is_distance ? 0 : 1);
        callToGetChallengeList();
        setLoading(false);
      })
      .catch(err => {
        console.log('error');
        console.log(err);
      });

    
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

  const handleSubscribeToAChallenge = () => {
    navigation.navigate('AllChallengesScreen');
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

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add an activity',
      headerTitleContainerStyle: {alignItems: 'center'},
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerRight: () => <View style={{marginLeft: 10}} />,
      headerLeft: () => <View style={{marginLeft: 0}}/>
    });
    getDropdownActivities();
  }, []);

  var dateDifference = Math.floor((Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) - Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))/ (1000 * 60 * 60 * 24));
  
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
            ) : (
              <View style={{flex: 1, marginHorizontal: 20}}>
                <View
                  style={{
                    marginVertical: 20,
                    
                  }}>
                  <TouchableOpacity
                    onPress={showDatepicker}
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
                        backgroundColor: Colors.TEXT,
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
                        <Text style={{color: Colors.TEXTDARK, fontWeight: 'normal'}}>
                          {selectedDate === null
                            ? 'Select Date'
                            : moment(date).format('MMM DD, YYYY')}
                        </Text>
                      </View>
                      <View style={{flex: 1, alignItems: 'flex-end'}}>
                        {/* <Icon name="cross" type="entypo" size={20} /> */}
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
                    display={ Platform.OS === "ios" ? "default" : "calendar" }
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
                      placeholder="Choose an item"
                      defaultValue={
                        dropdownData[
                          dropdownData.findIndex(item =>
                            item.name.includes('Average'),
                          )
                        ].name
                      }
                      containerStyles={{marginHorizontal: 20}}
                      listStyles={{maxHeight: 120}}
                      inputStyles={{paddingLeft: 15}}
                    />
                  </View>
                </View>
                <View style={[{marginTop: 30, marginHorizontal: -20}, styles.shadowElevation3]}>
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
                  />
                </View>
                <View style={[{marginTop: 20, marginHorizontal: -20}, styles.shadowElevation3 ]}>
                  <CalMinStepsCard
                    calminsteps={calminsteps}
                    getCalMinSteps={getCalMinStepsData}
                    isDistance={defaultOption===0}
                    value={value}

                  />
                </View>
                <View style={{marginTop: 20}}>
                  <SubscribedChallengeListCard
                    selectedDate={selectedDate}
                    challenges={subscribedChallenge}                    
                    handleSelectedChallenges={handleSelectedChallenges}
                    handleSubscribeToAChallenge={handleSubscribeToAChallenge}
                  />
                </View>
                <View style={[{marginTop: 20, marginHorizontal: -20}, styles.shadowElevation3 ]}>
                  <AddCommentImageCard
                    comment={comment}
                    onCommentChange={onCommentChange}
                  />
                </View>
                <View style={{marginTop: 20, marginHorizontal: 0}}>
                  <StyledButton
                    text="POST"
                    disabled={isAllowPost}
                    onPress={handlePostData}
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

export default AddActivityScreen;
