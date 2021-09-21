<<<<<<< HEAD
import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';

const ChallengeDescriptionCard = ({description}) => {
=======
import React, { useState } from 'react';
import { Icon } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';

const ChallengeDescriptionCard = ({ description }) => {
  const [pressed, setPressed] = useState(0);

  const handleExpand = () => {
    const tab = 1 - pressed;
    setPressed(tab);
  }
>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
  return (
    <View
      style={{
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 1,
<<<<<<< HEAD
      }}>
      <View style={{paddingTop: 10, paddingLeft: 20}}>
        <Text20 text="Description" textColor={Colors.TEXTDARK} />
      </View>
      <View style={{paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20}}>
        <Text14 text={description} textColor={Colors.TEXTDARK} />
      </View>
=======

      }}>
      <View style={{ paddingTop: 10, paddingLeft: 20, flexDirection: 'row' }}>
        <Text20 text="Description" textColor={Colors.TEXTDARK} />
        <View style={{ marginLeft: 'auto', paddingRight: 20 }}>
          <Icon style={{ marginTop: 'auto', marginLeft: 'auto' }} type="material" name="expand-more" onPress={handleExpand}></Icon>
        </View>

      </View>
      {pressed === 0 ? (
        <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20, height: 130 }}>
          <Text14 text={description} textColor={Colors.TEXTDARK} />
        </View>
      ) : (
        <View style={{ paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20 }}>
          <Text14 text={description} textColor={Colors.TEXTDARK} />
        </View>
      )}

>>>>>>> 4c1567f4d5d598f304006891a5626a5201cd6661
    </View>
  );
};

export default ChallengeDescriptionCard;
