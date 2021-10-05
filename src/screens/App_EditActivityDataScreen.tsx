import React, {useState, useEffect} from 'react';
import {
  View,
  Platform,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  Text,
} from 'react-native';

import axios from 'axios';
import DateTimePicker from '@react-native-community/datetimepicker';
import FastImage from 'react-native-fast-image';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import moment from 'moment';
import {useSelector} from 'react-redux';
import {AppState} from '../redux';

import AddCommentImageCard from '../components/Cards/PostAChallengeCard/AddCommentImageCard';
import Background from '../components/Background/StyledBackground';
import CalMinStepsCard from '../components/Cards/PostAChallengeCard/CalMinStepsCard';
import DistanceTimeCard from '../components/Cards/PostAChallengeCard/PostChallengeCard_DistanceTimeCard';
import RNSearchablePicker from '../components/SearchablePicker/SearchablePicker';
import RNLoader from '../components/Loader/RNLoader';
import SubscribedChallengeListCard from '../components/Cards/PostAChallengeCard/SubscribedChallengeListCard';
import StyledButton from '../components/Button/StyledButton';
import Text16Normal from '../components/Text/Text16Normal';

import {RootNavProp, RootNavRouteProps} from '../routes/RootStackParamList';
import {Colors} from '../utils/colors';

export type AndroidMode = 'date' | 'time';
interface Props {
  navigation: RootNavProp<'EditActivityDataScreen'>;
  route: RootNavRouteProps<'MyChallengeScreen'>;
}

export const EditActivityDataScreen: React.FC<Props> = ({
  navigation,
  route,
}) => {
  const routeData = route.params.data;

  const [selectedDate, setSelectedDate] = useState(
    routeData ? routeData.date : routeData,
  );
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState<AndroidMode>('date');
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isAllowPost, setDisablePost] = useState(true);
  const [value, setValue] = useState(routeData ? routeData.data : '');
  const [klicks, setKlicks] = useState(0);
  const [dropdownData, setDropdownData] = useState([]);
  const [subscribedChallenge, setSubscribedChallenge] = useState([]);
  const [selectedCid, setSelectedCid] = useState(0);
  const [distanceTimeData, setDistanceTimeData] = useState('');
  const [calminsteps, setCalMinSteps] = useState({
    cal: routeData ? routeData.calorie : '',
    min: routeData ? routeData.min : '',
    steps: routeData ? routeData.steps : '',
  });
  const [comment, setComment] = useState(routeData ? routeData.comment : '');
  const [selected, setSelected] = useState({
    icon: ' ',
  });

  const [defaultOption, setDefaultOption] = useState(
    routeData ? (routeData.activity.is_distance ? 0 : 1) : 0,
  );
  const contextId = useSelector((state: AppState) => state.rootStore.contextId);

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
    axios
      .get('/api/activities', {
        headers: {
          'X-CONTEXT-ID': contextId,
        },
      })
      .then(res => {
        setDropdownData(res.data.data.activities);
        setSubscribedChallenge(res.data.data.challenges);
        const item = res.data.data.activities[0];
        setSelected(item);
        setDefaultOption(item.is_distance ? 0 : 1);
        setLoading(false);
      })
      .catch(err => {
        console.log('error');
        console.log(err);
        setLoading(false);
      });
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

  const handleUpdateData = () => {
    const data = {
      data: distanceTimeData,
      activity: selected['id'],
      date: moment.utc(selectedDate).format('YYYY-MM-DD'),
      is_distance: defaultOption === 0,
      calorie: calminsteps.cal,
      min: calminsteps.min,
      steps: calminsteps.steps,
      comment: comment,
    };
    console.log(data);
    // const cid = subscribedChallenge[selectedCid].cid;
    // axios
    //   .post('/api/post/data/' + cid, data)
    //   .then(res => {
    //     navigation.navigate('AllChallengesScreen');
    //   })
    //   .catch(err => {
    //     console.log('error');
    //     console.log(err);
    //   });
  };

  useEffect(() => {
    getDropdownActivities();
  }, []);

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
              <View style={{flex: 1}}>
                <View
                  style={{
                    marginVertical: 10,
                    marginHorizontal: 20,
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
                        <Text style={{color: Colors.TEXTDARK}}>
                          {selectedDate === null
                            ? 'Select Date'
                            : moment(date).format('DD-MM-YYYY')}
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
                        />
                      </View>
                    </View>
                  </TouchableOpacity>
                </View>

                {show && (
                  <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={'date'}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                    minimumDate={
                      new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000)
                    }
                    maximumDate={new Date()}
                  />
                )}
                <View
                  style={{flexDirection: 'row', width: '100%', marginTop: 20}}>
                  <View
                    style={{
                      width: '30%',
                      alignItems: 'flex-end',
                    }}>
                    <View
                      style={{
                        borderWidth: 2,
                        borderRadius: 80,
                        padding: 3,
                      }}>
                      <FastImage
                        style={{width: 80, height: 80, borderRadius: 80}}
                        source={{
                          uri: routeData
                            ? routeData.activity.icon
                            : selected.icon,
                          priority: FastImage.priority.high,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                      />
                    </View>
                  </View>
                  <View style={{width: '70%', marginTop: 10}}>
                    <RNSearchablePicker
                      onSelect={selectHandler}
                      data={dropdownData}
                      placeholder="Choose an item"
                      defaultValue={
                        routeData
                          ? dropdownData[
                              dropdownData.findIndex(item =>
                                item.name.includes(routeData.activity.name),
                              )
                            ].name
                          : dropdownData[
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
                <View style={{marginTop: 30}}>
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
                <View style={{marginTop: 20}}>
                  <CalMinStepsCard
                    calminsteps={calminsteps}
                    getCalMinSteps={getCalMinStepsData}
                  />
                </View>
                <View style={{marginTop: 20}}>
                  <SubscribedChallengeListCard
                    challenges={subscribedChallenge}
                    getSelectedChallenge={getSelectedChallenge}
                    handleSubscribeToAChallenge={handleSubscribeToAChallenge}
                  />
                </View>
                <View style={{marginTop: 20}}>
                  <AddCommentImageCard
                    comment={comment}
                    onCommentChange={onCommentChange}
                  />
                </View>
                <View style={{marginTop: 20, marginHorizontal: 20}}>
                  <StyledButton
                    text="UPDATE"
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
