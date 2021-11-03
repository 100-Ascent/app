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

const DistanceCard = ({
  data,
  editPressed,
  handleDelete,
}) => {

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
          title: '100Ascent',
          message: '100Ascent travel your way to fitness',
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

  const selectedActivity = activityData.activities.filter( obj => obj.id === data.activity_id)[0];

  return (
    <View style={{ flex: 1, borderRadius: 10 }}>
      <ViewShot
        style={{backgroundColor: Colors.TEXT, borderRadius: 10 }}
        ref={ref}
        options={{format: 'jpg', quality: 0.9}}>
        <View
          style={{
            flex: 1,
            borderRadius: 10,
            backgroundColor: Colors.TEXT,
            paddingHorizontal: 30,
            paddingVertical: 20,
            elevation: 2,
          }}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>
              <View
                style={{
                  justifyContent: 'center',
                  alignContent: 'center',
                }}>
                <View
                  style={{
                    borderRadius: 80,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <FastImage
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 80,
                      borderWidth: 2,
                      borderColor: Colors.POPUP_GREY,
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
            <View style={{flex: 3, paddingLeft: 10}}>
              <View style={{flex: 1, flexDirection: 'row', paddingLeft: 20}}>
                <View style={{justifyContent: 'center'}}>
                  <Text28
                    text={data.klicks + ' '}
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
              <View
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
              </View>
              <View style={{flex: 1, alignItems: 'flex-end'}}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => onShare()}>
                  <Icon name="share" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
          <View style={{padding: 15}} />
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
              <FitnessCard isGoogleFit={false} />
              <View style={{flex: 1}} />
            </View>
          </View>          
          <View
            style={{
              flex: 1,
              marginHorizontal: 10,
              marginVertical: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            {/* {mask ? null : (
              <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  disabled={current === 0}
                  onPress={onLeftPress}>
                  <View style={{justifyContent: 'center'}}>
                    <Icon
                      name="chevron-thin-left"
                      type="entypo"
                      color={current === 0 ? Colors.BLACK5 : '#333333'}
                    />
                  </View>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: 10,
                  }}>
                  <Text16Normal
                    text={current + 1}
                    textColor={Colors.TEXTDARK}
                  />
                  <Text16Normal text={'/'} textColor={Colors.TEXTDARK} />
                  <Text16Normal text={total} textColor={Colors.TEXTDARK} />
                </View>
                <TouchableOpacity
                  disabled={current === total - 1}
                  onPress={onRightPress}>
                  <View style={{justifyContent: 'center'}}>
                    <Icon
                      name="chevron-thin-right"
                      type="entypo"
                      color={current === total - 1 ? Colors.BLACK5 : '#333333'}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            )} */}
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
