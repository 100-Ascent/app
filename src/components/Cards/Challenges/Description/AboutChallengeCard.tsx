import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../../utils/colors';
import { FONTS } from '../../../../utils/constants/fonts';
import Text14 from '../../../Text/Text14';
import Text18 from '../../../Text/Text18';

interface Props {
  title: string;
  description: string;
}

const AboutChallengeCard: React.FC<Props> = ({title, description}) => {
  return (
    <View style={styles.container}>
      <Text18 text={title} textColor={Colors.TEXTDARK} textStyle={FONTS.SEMIBOLD} containerStyle={styles.header} />
      <Text14 text={description} textColor={Colors.TEXTDARK} containerStyle={styles.description} />
    </View>
  );
};

export default AboutChallengeCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.TEXT,
    marginHorizontal: 20,
    paddingBottom: 10,
    borderRadius: 10,
    elevation: 3,
  },
  header: { 
    paddingTop: 20, 
    paddingLeft: 20 
  },
  description: {
    paddingTop: 10, 
    paddingBottom: 10, 
    paddingHorizontal: 20
  }

})
