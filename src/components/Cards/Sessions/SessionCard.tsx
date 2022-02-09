import moment from 'moment';
import React, {useCallback} from 'react';
import {Linking, StyleSheet, View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import FastImage from 'react-native-fast-image';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Colors} from '../../../utils/colors';
import {FONTS} from '../../../utils/constants/fonts';
import StyledButton from '../../Button/StyledButton';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';

interface Props {
  session: any;
}

const SessionCard: React.FC<Props> = ({session}) => {
  
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(session.on_click_link);
    if (supported) {
      await Linking.openURL(session.on_click_link);
    } else {
    }
  }, [session.on_click_link]);

  const data = {
    cardTitle: session.title,
    sessionPoster: session.image_link,
    sessionTitle: session.session_title,
    speakerName: session.speaker_name,
    date: moment(new Date(session.date)).format('LL'),
    time: moment(new Date(session.date)).format('LT') + ' IST',
    buttonText: session.button_text,
    linkUrl: session.on_click_link,
  };

  return (
    <View style={styles.cardStyle}>
      <TouchableOpacity activeOpacity={0.9} onPress={handlePress}>
        <View style={styles.cardTitle}>
          <Text16Normal text={data.cardTitle} textColor={Colors.TEXTDARK} />
        </View>
        <View style={styles.sessionPoster}>
          <FastImage
            style={{
              width: '100%',
              height: 180,
              borderRadius: 10,
            }}
            source={{
              uri: data.sessionPoster,
              priority: FastImage.priority.high,
            }}
            resizeMode={FastImage.resizeMode.stretch}
          />
        </View>
        <View style={styles.sessionTitle}>
          <Text14
            text={data.sessionTitle}
            textColor={Colors.TEXTDARK}
            textStyle={FONTS.SEMIBOLD}
          />
        </View>
        {data.speakerName.length > 0 ? (
          <View style={styles.speaker}>
            <Text14
              text={'Speaker: '}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.REGULAR}
            />
            <Text14
              text={data.speakerName}
              textColor={Colors.TEXTDARK}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
        ) : null}
        <View style={styles.dateTime}>
          <View style={styles.rowFlexOne}>
            <Icon name="calendar" type="ant-design" size={20} />
            <Text14
              text={data.date}
              textColor={Colors.TEXTDARK}
              containerStyle={{paddingLeft: 5}}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
          <View style={styles.rowFlexOne}>
            <Icon name="time" type="ionicon" size={20} />
            <Text14
              text={data.time}
              textColor={Colors.TEXTDARK}
              containerStyle={{paddingLeft: 5}}
              textStyle={FONTS.SEMIBOLD}
            />
          </View>
        </View>
        <View style={styles.button}>
          <StyledButton
            text={data.buttonText}
            onPress={() => {}}
            textStyle={Colors.TEXT}
            buttonStyle={{backgroundColor: Colors.POPUP_RED}}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default SessionCard;

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: Colors.TEXT,
    paddingHorizontal: 15,
    paddingBottom: 10,
    borderRadius: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardTitle: {
    marginVertical: 15,
  },
  sessionPoster: {alignItems: 'center', justifyContent: 'center'},
  sessionTitle: {marginTop: 10},
  speaker: {flexDirection: 'row', marginVertical: 5},
  dateTime: {flexDirection: 'row', marginVertical: 5},
  button: {marginVertical: 10},
  rowFlexOne: {flexDirection: 'row', flex: 1, justifyContent: 'center'},
});
