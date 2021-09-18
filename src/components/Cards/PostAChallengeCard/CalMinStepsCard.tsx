import React from 'react';
import {TextInput, View} from 'react-native';
import {Colors} from '../../../utils/colors';
import Text16Normal from '../../Text/Text16Normal';
import CaloriesIcon from '../../../../assets/icons/CalMinStepsIcon/calorie.svg';
import DistanceIcon from '../../../../assets/icons/CalMinStepsIcon/time.svg';
import StepsIcon from '../../../../assets/icons/CalMinStepsIcon/foot.svg';

const CalMinStepsCard = ({calminsteps, getCalMinSteps}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: Colors.TEXT,
        borderRadius: 10,
        elevation: 3,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <View style={{paddingTop: 5, paddingRight: 10}}>
          <Text16Normal text={'*optional'} textColor={Colors.BLACK4} />
        </View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            marginRight: 10,
            marginTop: 10,
            paddingBottom: 15,
          }}>
          {inputCard('cal', <CaloriesIcon />, calminsteps.cal, getCalMinSteps)}
          {inputCard('min', <DistanceIcon />, calminsteps.time, getCalMinSteps)}
          {inputCard('steps', <StepsIcon />, calminsteps.steps, getCalMinSteps)}
        </View>
      </View>
    </View>
  );
};

export default CalMinStepsCard;

const inputCard = (
  type: string,
  icon: boolean | JSX.Element,
  calminsteps: any,
  getCalMinSteps: (arg0: string, arg1: string) => void,
) => {
  return (
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {icon}
      </View>
      <View
        style={{
          flex: 2,
          borderWidth: 1,
          borderRadius: 10,
        }}>
        <TextInput
          keyboardType="numeric"
          maxLength={6}
          value={calminsteps}
          onChangeText={text => getCalMinSteps(text, type)}
          placeholder={type}
          placeholderTextColor={Colors.BLACK3}
          style={{
            paddingVertical: 5,
            color: Colors.TEXTDARK,
            fontSize: 16,
            textAlign: 'center',
          }}
        />
      </View>
    </View>
  );
};
