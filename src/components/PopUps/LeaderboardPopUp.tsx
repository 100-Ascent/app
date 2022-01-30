import React from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View} from 'react-native';
import { Button } from 'react-native-elements/dist/buttons/Button';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image';
import {Colors} from '../../utils/colors';
import { ProfileInputFieldTypes } from '../../utils/constants/constants';
import {FONTS} from '../../utils/constants/fonts';
import ProfileInput from '../Input/ProfileInput';
import Text10 from '../Text/Text10';
import Text12Normal from '../Text/Text12Normal';
import Text14 from '../Text/Text14';
import Text16Normal from '../Text/Text16Normal';
import Text16Underline from '../Text/Text16Underline';
import Text18 from '../Text/Text18';
import Text20 from '../Text/Text20';
import Text24 from '../Text/Text24';

interface Props {
  visible: boolean;
  onCancel: () => void;
  currentData: object;
  selectedLeaderboard:any;
  userData: object;
  leagueData: any;
  weeklyData:any;
  allTimeData:any;
}

const LeaderboardPopUp: React.FC<Props> = ({
  visible,
  onCancel,
  currentData,
  selectedLeaderboard,
  userData,
  leagueData,
  weeklyData,
  allTimeData
}) => {

  //Async functions
  //Component functions

  return (
    <Modal
      animationType="fade"
      style={{margin: 20}}
      visible={visible}
      onRequestClose={onCancel}
      transparent>
      <View style={styles.container}>
        <View style={styles.visiblePopup}>          
          <View style={styles.contentContainer}>
            <View style={styles.content}>
              <View style={{backgroundColor: '#f8f8f8', width: '100%', paddingTop: 30, borderRadius: 20 }}>
                <Text18
                    text='Your Leaderboard Stats'
                    textColor={Colors.BLACK1}
                    textStyle={[FONTS.BOLD, { textAlign: 'center' }]}
                    containerStyle={[styles.centeredText, { marginBottom: 15, paddingHorizontal: 10}]}
                  />     
              </View>
              <View style={[styles.heading]}>
                <View style={[styles.flexRow, { marginVertical: 10 }]}>
                  <View style={styles.image}>
                    <FastImage
                      style={{
                        width: 80,
                        height: 80,
                        borderRadius: 50,
                        borderWidth: 1,
                        backgroundColor: Colors.WHITE,
                      }}
                      source={{
                        uri: weeklyData[0]['image_id'],
                        priority: FastImage.priority.high,
                      }}
                      resizeMode={FastImage.resizeMode.cover}
                    />
                  </View>
                  <View style={[styles.flexColumnWidth60, { paddingLeft: 20, paddingRight: 5 }]}>
                    <View style={[styles.flexRow, { marginTop: 5 } ]}>
                      <Text style={{fontSize: 16}}>🧑</Text>
                      <Text16Normal
                        text={userData['first_name'] + ' ' + userData['last_name']}
                        textColor={Colors.TEXTDARK}
                        textStyle={FONTS.SEMIBOLD} 
                        containerStyle={{ paddingLeft: 5 }}
                      />
                    </View>
                    <View style={[styles.flexRow, { marginTop: 10 }]}>
                      <Text style={{fontSize: 14}}>🆔</Text>
                      <Text14
                        text={userData['username']}
                        textColor={Colors.TEXTDARK}
                        textStyle={FONTS.SEMIBOLD}
                        containerStyle={{ paddingLeft: 10 }}
                      />
                    </View>
                    <View style={[styles.flexRow, { marginTop: 10 }]}>
                      <View style={{ justifyContent: 'center' }}>
                        <FastImage
                          style={{
                            width: 16,
                            height: 16,
                            borderRadius: 50,
                            
                          }}
                          source={{
                            uri: leagueData['league_images'][leagueData['league_index']],
                            priority: FastImage.priority.high,
                          }}
                          resizeMode={FastImage.resizeMode.cover}
                        />
                      </View>
                      <Text14
                        text={ leagueData['all_leagues'][leagueData['league_index']] + " League"}
                        textColor={Colors.TEXTDARK}
                        textStyle={FONTS.SEMIBOLD}
                        containerStyle={{ paddingLeft: 10}}
                      />
                    </View>                                                    
                  </View>
                </View>
              </View>
              
              {/* <View style={styles.separator} /> */}

              <View style={styles.body}>                        
                <Text18
                  text={selectedLeaderboard.name}
                  textColor={Colors.RED}
                  textStyle={[FONTS.BOLD, { textAlign: 'center' }]}
                  containerStyle={[styles.centeredText, { marginBottom: 10, paddingHorizontal: 10 }]}
                />
                
                <View style={{ paddingBottom: 10 }}>
                <View style={[styles.flexRow]}>
                  <View style={styles.flexColumnWidth50}>
                    <View style={{paddingTop: 7}} />
                    <Text12Normal
                      text={'Weekly Rank'}
                      textColor={Colors.TEXTDARK}
                      containerStyle={styles.infoHeader}
                    />
                    <Text16Normal
                      text={'# ' + weeklyData[0]['rank'].toString()}
                      textColor={Colors.POPUP_RED}
                      textStyle={FONTS.SEMIBOLD}
                      containerStyle={[styles.infoBody]}
                    />
                  </View>
                  <View style={styles.flexColumnWidth50}>
                    <View style={{paddingTop: 7}} />
                    <Text12Normal
                      text={'All Time Rank'}
                      textColor={Colors.TEXTDARK}
                      containerStyle={styles.infoHeader}
                    />
                    <Text16Normal
                      text={'# ' + allTimeData[0]['rank'].toString() }
                      textColor={Colors.POPUP_RED}
                      textStyle={FONTS.SEMIBOLD}
                      containerStyle={[styles.infoBody]}
                    />
                  </View>
                </View>
                <View style={[styles.flexRow, {marginTop: 10}]}>
                  <View style={styles.flexColumnWidth50}>
                  <View style={{paddingTop: 7}} />
                    <Text12Normal
                      text={'League Points (LP)'}
                      textColor={Colors.TEXTDARK}
                      containerStyle={styles.infoHeader}
                    />
                    <Text16Normal
                      text={weeklyData[0]['lp']}
                      textColor={Colors.TEXTDARK}
                      textStyle={FONTS.SEMIBOLD}
                      containerStyle={[styles.infoBody]}
                    />
                  </View>
                  <View style={styles.flexColumnWidth50}>
                    <View style={{paddingTop: 7}} />
                    <Text12Normal
                      text={'Experience Points (XP)'}
                      textColor={Colors.TEXTDARK}
                      containerStyle={styles.infoHeader}
                    />
                    <View style={[styles.flexRow, { justifyContent: 'center' }]}>
                      <Text16Normal
                        text={allTimeData[0]['global_points']}
                        textColor={Colors.TEXTDARK}
                        textStyle={FONTS.SEMIBOLD}
                        containerStyle={[styles.infoBody]}
                      />
                      {weeklyData[0]['lp'] !== 0 ?
                        <Text10
                          text={' +' + weeklyData[0]['lp']}
                          textColor={Colors.GREEN}
                          textStyle={FONTS.SEMIBOLD}
                          containerStyle={{ justifyContent: 'center', marginTop: 1 }}
                        /> : null}
                    </View>
                  </View>
                </View>
                </View>

              </View>
              <View style={[styles.footer, {marginTop: -10}]}>
                <TouchableOpacity onPress={onCancel}>
                  <Text16Normal text='Close' textColor={Colors.DARK_LINEARGRADIENT1} />
                </TouchableOpacity>                
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center'

  },
  visiblePopup: {
    backgroundColor: '#fff',
    width: '85%',
    borderRadius: 20,
    elevation: 5,
    paddingBottom: 20
  },
  contentContainer: {
    zIndex: 10,
    width: '100%',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  content: { alignItems: 'center', width: '100%'},
  // heading: {marginTop: -35, flexDirection: 'row'},
  heading: { marginTop: 0, flexDirection: 'row', backgroundColor: '#f8f8f8', paddingBottom: 20 },
  image: {flexDirection: 'column', marginLeft: 30, borderWidth: 3, borderRadius: 100, padding: 4, borderColor: Colors.RED  },
  separator: {
    borderWidth: 1,
    borderRadius: 5,
    borderStyle: 'dashed',
    width: '20%',
    borderColor: "#444",
    marginVertical: 10,
  },
  body: { width: '100%', alignItems: 'center', marginVertical: 10 },
  footer: {marginVertical: 10},
  centeredText: {alignItems: 'center'},
  infoHeader: {alignItems: 'center' },
  infoBody: {alignItems: 'center' },
  flexRow: {flexDirection: 'row', width: '100%'},
  flexColumnWidth50: {flexDirection: 'column', width: '50%',},
  flexColumnWidth60: {flexDirection: 'column', width: '60%',},
});
export default LeaderboardPopUp;
