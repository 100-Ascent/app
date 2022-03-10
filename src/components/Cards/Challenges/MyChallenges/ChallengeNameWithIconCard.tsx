import React, { FC, useState } from 'react';
import {TouchableOpacity, View} from 'react-native';

import {Colors} from '../../../../utils/colors';
import FastImage from 'react-native-fast-image';
import RewardsPopUp from '../../../PopUps/RewardsPopUp';
import Text16Underline from '../../../Text/Text16Underline';
import Text28 from '../../../Text/Text28';

interface Props {
  name: string;
  icon: any;
  image?:any;
  onViewDetailsPressed?: ()=>void,
  showViewDetails?: boolean;
}

const ChallengeNameWithIconCard: FC<Props> = ({name, icon, onViewDetailsPressed, showViewDetails = true, image}) => {

  const [showPopUp, setShowPopUp] = useState(false);
  const handlePress = () => {
    setShowPopUp(true);
  }
  return (
    <View style={{ marginHorizontal: 20, marginTop: 10, flexDirection: 'row'}}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={handlePress}>
          <View style={{ borderWidth: 3, borderRadius: 100, padding: 3 }}>
            <FastImage
              style={{width: 100, height: 100, borderRadius: 100}}
              source={{
                uri: icon,
                priority: FastImage.priority.high,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{flex: 3, marginLeft: 20}}>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <Text28 text={name} textColor={Colors.TEXTDARK} />
        </View>
        <View style={{flex: 1, justifyContent: 'center'}}>
          <TouchableOpacity onPress={onViewDetailsPressed}>
          { showViewDetails ? <Text16Underline text="View Details" textColor={Colors.INFO_GREY} />: null}
          </TouchableOpacity>
        </View> 
      </View>
      <RewardsPopUp data={image} visible={showPopUp} onClose={()=> setShowPopUp(false)}  />
    </View>
  );
};

export default ChallengeNameWithIconCard;
