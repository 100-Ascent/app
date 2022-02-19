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
      <View style={{ paddingTop: 10, paddingLeft: 20 }}>
        <Text18 text={title} textColor={Colors.TEXTDARK} textStyle={FONTS.SEMIBOLD} />
      </View>
      <View style={{paddingTop: 10, paddingBottom: 10, paddingHorizontal: 20}}>
        <Text14 text={description} textColor={Colors.TEXTDARK} />
      </View>
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
    elevation: 1
  }
})
