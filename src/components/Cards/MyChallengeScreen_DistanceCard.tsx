import React, {useState} from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Colors} from '../../utils/colors';
import FastImage from 'react-native-fast-image';
import Text28 from '../Text/Text28';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import CalorieCard from '../DistanceComponent/CalorieCard';
import TimeCard from '../DistanceComponent/TimeCard';
import FootCard from '../DistanceComponent/FootCard';
import DistanceTotalCard from '../DistanceComponent/DistanceTotalCard';
import FitnessCard from '../DistanceComponent/FitnessCard';
import Text16Normal from '../Text/Text16Normal';
import KlicksTooltip from '../Tooltip/KlicksTooltip';
import Text14 from '../Text/Text14';
import CustomPopUp from '../PopUps/CustomPopUp';
import RNFS from 'react-native-fs';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';
import { useSelector } from 'react-redux';
import { AppState } from '../../redux';
import DeleteModalIcon from '../../../assets/modal-icons/delete-modal-icon.svg';
import CommentCard from '../DistanceComponent/CommentCard';
import DateCard from '../DistanceComponent/DateCard';


interface Props {
  data: any;
  editPressed: (value)=>void
  handleDelete: (value)=>void
  showAllActivities?: boolean
}
const DistanceCard: React.FC<Props> = ({
  data,
  editPressed,
  handleDelete,
  showAllActivities
}) => {

  data = data.uad;
  const ref = React.useRef<ViewShot | null>(null);
  const [visible, setVisible] = useState(false);
  const [toDeleteId, setToDeleteId ] = useState(0);
  const [mask, setMask] = useState(false);
  const activityData = useSelector(
    (state: AppState) => state.rootStore.activityData.data,
  );
  
  const handleOk = () => {
    handleDelete(toDeleteId);
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  
  const onShare = () => {
    setMask(true);
    const temp = setTimeout(captureScreenshot, 500);
  };

  const captureScreenshot = () => {
    ref.current.capture().then(uri => {
      RNFS.readFile(uri, 'base64').then(res => {
        let urlString = 'data:image/jpeg;base64,' + res;
        let options = {
          title: '100 Ascent',
          message: 'Hi, checkout my recent activity on 100 Ascent app (https://100ascent.com)',
          url: urlString,
          type: 'image/jpeg',
        };
        Share.open(options)
          .then(res => {
            setMask(false);
          })
          .catch(err => {
            setMask(false);
          });
      });
    });
  };

  const selectedActivity = activityData.activities.filter( obj => obj.id === data.activity.id)[0];
  return (
    <View style={{ flex: 1, borderRadius: 10, marginHorizontal: 20, marginTop: 5 }}>
      <ViewShot
        style={{backgroundColor: Colors.TEXT, borderRadius: 10 }}
        ref={ref}
        options={{format: 'jpg', quality: 0.9}}>
        <View
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: Colors.TEXT,
            paddingHorizontal: 20,
            paddingVertical: 20,
            elevation: 2,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 2}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 40,
                    width: 80,
                    height: 80,
                    padding: 15,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 2,
                    borderColor: Colors.POPUP_GREY,
                  }}>
                  <FastImage
                    style={{
                      width: 65,
                      height: 65,
                      borderRadius: 25,
                    }}
                    source={{
                      uri: selectedActivity.icon,
                      priority: FastImage.priority.high,
                    }}
                    resizeMode={FastImage.resizeMode.cover}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 5, paddingLeft: 10}}>
              <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20}}>
                <View style={{justifyContent: 'center'}}>
                  <Text28
                    text={data.klicks.toFixed(2) + ' '}
                    textColor={Colors.YELLOW}
                  />
                </View>
                <View style={{justifyContent: 'center', marginTop: 7}}>
                  <Text16Normal text="Klicks" textColor={Colors.POPUP_RED} />
                </View>
                <View
                  style={{
                    justifyContent: 'center',
                    marginTop: 10,
                    marginLeft: 5,
                  }}>
                  <KlicksTooltip color={Colors.TEXTDARK} />
                </View>
              </View>
              <View style={{flex: 1, paddingLeft: 20}}>
                <View style={{justifyContent: 'center'}}>
                  <Text14
                    textStyle={{fontWeight: 'bold'}}
                    text={selectedActivity.name}
                    textColor={Colors.TEXTDARK}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 1}}>
              {/* <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-end',
                }}>
                <View style={{}}>
                  <Icon
                    name="edit"
                    type="material-icons"
                    onPress={editPressed}
                  />
                </View>
                <View style={{}}>
                  <TouchableOpacity>
                    <Icon
                      name="delete"
                      type="MaterialIcons"
                      color={'#AF3F34'}
                      onPress={() => {
                        setToDeleteId(data.id);
                        setVisible(true)
                      }}
                    />
                  </TouchableOpacity>
                </View>
              </View> */}
              { mask ? null : <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onShare()}>
                  <Icon name="share" color={Colors.POPUP_GREY} size={24} />
                </TouchableOpacity>
              </View>}
            </View>
          </View>
          <View style={{padding: 5}} />
          <View style={{flex: 1, marginHorizontal: 10, marginVertical: 7}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              {showAllActivities ? null : <DateCard date={data.date} stream={data.stream} /> }
            </View>
          </View>
          <View style={{flex: 1, marginHorizontal: 10, marginVertical: 7}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <CalorieCard calorie={data.calories} />
              <TimeCard time={data.min} />
            </View>
          </View>
          <View style={{flex: 1, marginHorizontal: 10, marginVertical: 7}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <FootCard steps={data.steps} />
              <DistanceTotalCard
                data={data.raw_data}
                isDistance={data.is_distance}
              />
            </View>
          </View>
          <View style={{flex: 1, marginHorizontal: 10, marginVertical: 7}}>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <FitnessCard stream={data.stream} />

            </View>
          </View> 
          <View style={{flex: 1, marginHorizontal: 10, marginVertical: 10, marginBottom: -5, marginRight: -5, flexDirection: 'row'}}>
            <View style={{flex: 7, flexDirection: 'row'}}>
              <CommentCard comment={data.comment} />
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              { mask ? null : <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                  }}>
                  <View style={{marginRight: 10}}>
                    <Icon
                      name="edit"
                      type="material-icons"
                      onPress={()=> editPressed(data.id)}
                      size={24}
                      color={Colors.POPUP_GREY}
                    />
                  </View>
                  <View style={{}}>
                    <TouchableOpacity>
                      <Icon
                        name="delete"
                        type="MaterialIcons"
                        color={Colors.POPUP_GREY}
                        size={24}
                        onPress={() => {
                          console.log(data);
                          setToDeleteId(data.id);
                          setVisible(true)
                        }}
                      />
                    </TouchableOpacity>
                  </View>
                </View>}
            </View>
          </View>                   
        </View>
      </ViewShot>
      <CustomPopUp
        visible={visible}
        onOk={handleOk}
        isCancelable={true}
        onCancel={handleCancel}
        oKText={'Delete'}
        cancelText={'Cancel'}
        header={'Confirm Delete'}
        description={'Do you really want to delete?'} 
        icon={<DeleteModalIcon/>} 
        />
    </View>
  );
};

export default DistanceCard;
