import { StyleSheet, View } from 'react-native';

import CityCarousal from '../../Carousals/CityCarousal';
import { Colors } from '../../../utils/colors';
import DoubleDistanceIcon from '../../../../assets/icons/double-distance-icon.svg';
import { FONTS } from '../../../utils/constants/fonts';
import MileStoneIcon from '../../../../assets/icons/milestone-icon.svg';
import React from 'react'
import Text14 from '../../Text/Text14';
import Text20 from '../../Text/Text20';
import Text28 from '../../Text/Text28';

interface Props{
    cities: any;
    distance: string;
    milestones: string;
}

const ChallengeDistanceMilestoneCity: React.FC<Props> = ({ cities, distance, milestones  }) => {

//State variables

//Async functions

//Component functions

return <View>
    <View style={{ flexDirection: 'row', marginTop: 15 }}>
          <View style={styles.challengeData}>
              <View style={{justifyContent: "center"}}>
                <MileStoneIcon />
              </View>
              <Text28
                text={milestones}
                textStyle={FONTS.SEMIBOLD}
                containerStyle={{ marginLeft: 10 }}
              />
              <Text14
                text={'Milestones'} 
                textColor={Colors.TEXTDARK} 
                containerStyle={{ marginLeft: 5, justifyContent: "flex-end", paddingBottom: 3 }}
              />
          </View>
          <View style={styles.challengeData}>
              <View style={{justifyContent: "center"}}>
                <DoubleDistanceIcon />
              </View>
              <Text28
                text={distance}
                textStyle={FONTS.SEMIBOLD}
                containerStyle={{ marginLeft: 10 }}
              />
              <Text14
                text={'km'} 
                textColor={Colors.TEXTDARK} 
                containerStyle={{ marginLeft: 5, justifyContent: "flex-end", paddingBottom: 3 }}
              />
          </View>
        </View>

        <View style={{ marginVertical: 15 }}>
            <Text20
              text={'Cities you will explore'}
              textColor={Colors.TEXTDARK}
              textStyle={[{ paddingLeft: 15, paddingBottom: 10 }, FONTS.SEMIBOLD]}
            />
            <CityCarousal data={cities} onPress={() => {}} />
        </View>
</View>;
}

export default ChallengeDistanceMilestoneCity;


const styles = StyleSheet.create({
    challengeData: {
      width: "50%", 
      flexDirection: 'row', 
      paddingLeft: 20
    }
  })