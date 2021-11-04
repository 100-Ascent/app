import React, {useState, useEffect} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  ToastAndroid,
} from 'react-native';

import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';

import Background from '../components/Background/StyledBackground';
import RNLoader from '../components/Loader/RNLoader';

import CalMinStepsCard from '../components/Cards/PostAChallengeCard/CalMinStepsCard';
import DistanceTimeCard from '../components/Cards/PostAChallengeCard/PostChallengeCard_DistanceTimeCard';
import RNSearchablePicker from '../components/SearchablePicker/SearchablePicker';

import StyledButton from '../components/Button/StyledButton';

import {RootNavProp} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';
import AddCommentImageCard from '../components/Cards/PostAChallengeCard/AddCommentImageCard';
import Text12Bold from '../components/Text/Text12Bold';
import Text14 from '../components/Text/Text14';

export type AndroidMode = 'date' | 'time';
interface Props {
  navigation: RootNavProp<'AddActivityScreen'>;
}

const AddActivityScreen: React.FC<Props> = ({navigation}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAllowPost, setDisablePost] = useState(true);
  const [value, setValue] = useState('');
  const [klicks, setKlicks] = useState(0);
  const [dropdownData, setDropdownData] = useState([]);
  const [subscribedChallenge, setSubscribedChallenge] = useState([]);
  const [selectedCid, setSelectedCid] = useState(0);
  const [distanceTimeData, setDistanceTimeData] = useState('');
  const [calminsteps, setCalMinSteps] = useState({
    cal: '',
    min: '',
    steps: '',
  });
  const [comment, setComment] = useState('');
  const [selected, setSelected] = useState({
    icon: ' ',
  });

  const [defaultOption, setDefaultOption] = useState(0);
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);
  const activityData = useSelector(
    (state: AppState) => state.rootStore.activityData.data,
  );

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

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const selectHandler = item => {
    setSelected(item);
    setDefaultOption(item.is_distance ? 0 : 1);
    setValue('');
    setKlicks(0);
  };

  const getDropdownActivities = () => {
    setDropdownData(activityData.activities);
    setSubscribedChallenge(activityData.challenges);
    let item = activityData.activities;
    let index = item.findIndex(item => item.name.includes('Walking'));
    setSelected(item[index]);
    setDefaultOption(item[index].is_distance ? 0 : 1);
    setLoading(false);
  };

  const getSelectedChallenge = idx => {
    setSelectedCid(idx);
    setDisablePost(
      selectedDate === null ||
        selected['id'] === undefined ||
        distanceTimeData.length === 0,
    );
  };

  const getDistanceTimeData = data => {
    setDistanceTimeData(data);
    setDisablePost(
      selectedDate === null ||
        selected['id'] === undefined ||
        data.length === 0,
    );
  };

  const getCalMinStepsData = (text, type) => {
    setCalMinSteps(prevState => ({
      ...prevState,
      [type]: text,
    }));
  };

  const onCommentChange = text => {
    setComment(text);
  };

  const handleSubscribeToAChallenge = () => {
    navigation.navigate('AllChallengesScreen');
  };

  const handlePostData = () => {
    const data = {
      count: parseInt(distanceTimeData),
      activity_id: selected['id'],
      date: moment.utc(selectedDate).format('DD/MM/YYYY'),
      is_distance: defaultOption === 0,
      calories: calminsteps.cal,
      min: calminsteps.min,
      steps: calminsteps.steps,
      comment: comment
    };
    console.log(data);  
    axios
      .post('/api/user/data', data)
      .then(res => { 
        console.log(res);       
        ToastAndroid.show('Added Data successfully!', ToastAndroid.SHORT);
        navigation.navigate('MyProfileScreen');
      })
      .catch(err => {
        console.log('error');
        console.log(err);
      });
  };

  useEffect(() => {
    navigation.setOptions({
      headerTitle: 'Add an activity',
      headerTitleContainerStyle: {alignItems: 'center'},
      headerTitleStyle: {fontFamily: 'Quicksand-Bold'},
      headerRight: () => <View style={{marginLeft: 10}} />,
      headerLeft: () => (
        <View style={{marginLeft: 10}}>
        <Icon
          name="arrow-back"
          type="ionicons"
          size={30}
          onPress={() => navigation.pop()}  />
      </View>
    ),
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
              <RNLoader />
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
                            : moment(date).format('MMM DD, YYYY - hh:mm:ss A')}
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
                      placeholder="Choose an item"
                      defaultValue={
                        dropdownData[
                          dropdownData.findIndex(item =>
                            item.name.includes('Walking'),
                          )
                        ].name
                      }
                      containerStyles={{marginHorizontal: 20}}
                      listStyles={{maxHeight: 120}}
                      inputStyles={{paddingLeft: 15}}
                    />
                  </View>
                </View>
                <View style={{marginTop: 30, marginHorizontal: -20}}>
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
                <View style={{marginTop: 20, marginHorizontal: -20}}>
                  <CalMinStepsCard
                    calminsteps={calminsteps}
                    getCalMinSteps={getCalMinStepsData}
                  />
                </View>
                {/* <View style={{marginTop: 20}}>
                  <SubscribedChallengeListCard
                    challenges={subscribedChallenge}
                    getSelectedChallenge={getSelectedChallenge}
                    handleSubscribeToAChallenge={handleSubscribeToAChallenge}
                  />
                </View> */}
                <View style={{marginTop: 20, marginHorizontal: -20}}>
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
