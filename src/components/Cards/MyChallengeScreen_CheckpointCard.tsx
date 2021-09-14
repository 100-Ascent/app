import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import Text14 from '../Text/Text14';
import FlagIcon from '../../../assets/icons/flag.svg';
import Text20 from '../Text/Text20';
import {Icon} from 'react-native-elements/dist/icons/Icon';

type ObjectType = {
  description: string;
  distance: number;
  id: string;
  images: string[];
  is_last: boolean;
  lat: string;
  long: string;
  name: string;
  tid: Object[];
};

interface Props {
  onCheckpointPressed: () => void;
  checkpoint: ObjectType;
}

const CheckpointCard: React.FC<Props> = ({checkpoint, onCheckpointPressed}) => {
  console.log(checkpoint);
  return (
    <View style={{flex: 1}}>
      <TouchableOpacity activeOpacity={0.9} onPress={onCheckpointPressed}>
        <View
          style={{alignItems: 'center', elevation: 5, marginHorizontal: 15}}>
          <FastImage
            style={{
              width: '100%',
              height: 300,
              borderRadius: 10,
              position: 'relative',
              opacity: 0.8,
              backgroundColor: Colors.TEXTDARK,
            }}
            source={{
              uri: checkpoint.images[0],
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.cover}
          />

          <View
            style={{
              width: '100%',
              paddingTop: 20,
              position: 'absolute',
              justifyContent: 'flex-end',
              bottom: 0,
              flexDirection: 'row',
              paddingBottom: 10,
              opacity: 1,
            }}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <FlagIcon />
            </View>
            <View style={{flex: 3, paddingTop: 10}}>
              <View style={{justifyContent: 'flex-end'}}>
                <Text14 text="Last Checkpoint" textColor={Colors.WHITE} />
              </View>
              <View style={{justifyContent: 'flex-start', paddingTop: 5}}>
                <Text20 text={checkpoint.name} textColor={Colors.WHITE} />
              </View>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Icon name="chevron-right" size={50} color={Colors.WHITE} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CheckpointCard;
