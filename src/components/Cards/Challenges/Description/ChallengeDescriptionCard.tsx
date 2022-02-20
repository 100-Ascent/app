import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../../../utils/colors';
import { FONTS } from '../../../../utils/constants/fonts';
import Text14 from '../../../Text/Text14';
import Text20 from '../../../Text/Text20';

const ChallengeDescriptionCard = ({description}) => {
  const [pressed, setPressed] = useState(0);

  const handleExpand = () => {
    const tab = 1 - pressed;
    setPressed(tab);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={handleExpand}>
      <View style={styles.header}>
        <Text20 text="Description" textColor={Colors.TEXTDARK}  textStyle={FONTS.SEMIBOLD} />
        <View style={styles.iconContainer}>
          {pressed === 0 ? <Icon
              style={{marginTop: 'auto', marginLeft: 'auto'}}
              type="material"
              name="expand-more"             
            /> : <Icon
              style={{marginTop: 'auto', marginLeft: 'auto'}}
              type="material"
              name="expand-less"              
            />}
        </View>
      </View>

      <Text14 
        text={description} 
        textColor={Colors.TEXTDARK} 
        containerStyle={ pressed === 0 ? styles.textContainer : styles.expandedTextContainer} 
      />

      </TouchableOpacity>
    </View>
  );
};

export default ChallengeDescriptionCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.TEXT,
    marginHorizontal: 20,
    borderRadius: 10,
    elevation: 1,
  },
  header: {
    paddingTop: 10, 
    paddingLeft: 20, 
    flexDirection: 'row'
  },
  iconContainer: {
    marginLeft: 'auto', 
    paddingRight: 20
  },
  textContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 20,
    height: 130,
  },
  expandedTextContainer: {
    paddingTop: 10, 
    paddingBottom: 30, 
    paddingHorizontal: 20
  }
})
