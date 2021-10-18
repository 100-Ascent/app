import React, {useState} from 'react';
import {View} from 'react-native';

import Icon from 'react-native-elements/dist/icons/Icon';

import {Colors} from '../../../utils/colors';
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';

const ChallengeDescriptionCard = ({description}) => {
  const [pressed, setPressed] = useState(0);

  const handleExpand = () => {
    const tab = 1 - pressed;
    setPressed(tab);
  };

  return (
    <View
      style={{
        backgroundColor: Colors.TEXT,
        marginHorizontal: 20,
        borderRadius: 10,
        elevation: 1,
      }}>
      <View style={{paddingTop: 10, paddingLeft: 20, flexDirection: 'row'}}>
        <Text20 text="Description" textColor={Colors.TEXTDARK} />
        <View style={{marginLeft: 'auto', paddingRight: 20}}>
          {pressed === 0 ? (
            <Icon
              style={{ marginTop: 'auto', marginLeft: 'auto' }}
              type="material"
              name="expand-more"
              onPress={handleExpand} tvParallaxProperties={undefined}            />
          ) : (
            <Icon
                style={{ marginTop: 'auto', marginLeft: 'auto' }}
                type="material"
                name="expand-less"
                onPress={handleExpand} tvParallaxProperties={undefined}            />
          )}
        </View>
      </View>
      {pressed === 0 ? (
        <View
          style={{
            paddingTop: 10,
            paddingBottom: 10,
            paddingHorizontal: 20,
            height: 130,
          }}>
          <Text14 text={description} textColor={Colors.TEXTDARK} />
        </View>
      ) : (
        <View
          style={{paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20}}>
          <Text14 text={description} textColor={Colors.TEXTDARK} />
        </View>
      )}
    </View>
  );
};

export default ChallengeDescriptionCard;
