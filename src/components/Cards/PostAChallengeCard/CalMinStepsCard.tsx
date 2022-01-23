import React from 'react';
import {TextInput, View} from 'react-native';
import {Colors} from '../../../utils/colors';
import CaloriesIcon from '../../../../assets/icons/CalMinStepsIcon/calorie.svg';
import DistanceIcon from '../../../../assets/icons/CalMinStepsIcon/time.svg';
import StepsIcon from '../../../../assets/icons/CalMinStepsIcon/foot.svg';
import Text14 from '../../Text/Text14';
import Text16Normal from '../../Text/Text16Normal';
import { Tooltip } from 'react-native-elements/dist/tooltip/Tooltip';

interface Props {
  calminsteps: any, getCalMinSteps: any, isDistance: any, value: any, disabled?: any
}
const CalMinStepsCard :React.FC<Props> = ({calminsteps, getCalMinSteps, isDistance, value, disabled}) => {
  return (
    <View
      style={{
        marginHorizontal: 20,
        backgroundColor: Colors.TEXT,
        borderRadius: 10,
        elevation: 3,
      }}>
      <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
        <View style={{paddingTop: 5, paddingRight: 10, marginBottom: 10}}>
          <Text14 text={'*optional'} textColor={Colors.BLACK4} />
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
          {inputCard('cal', <CaloriesIcon />, calminsteps.cal, getCalMinSteps, isDistance, value, disabled)}
          {inputCard('min', <DistanceIcon />, calminsteps.min, getCalMinSteps, isDistance, value, disabled)}
          {inputCard('steps', <StepsIcon />, calminsteps.steps, getCalMinSteps, isDistance, value, disabled)}
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
  isDistance : boolean,
  value: any,
  disabled: boolean
) => {
  return (
    <View style={{flex: 1, flexDirection: 'row', marginHorizontal: 3}}>
      <View
        style={{
          flex: 3,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        {icon}
      </View>
      <View
        style={{
          flex: 5,
          borderWidth: 1,
          borderRadius: 10,
          borderColor: !disabled ? '#777' : '#ccc',
          backgroundColor : !disabled ? Colors.TEXT : Colors.GREY_LIGHT
        }}>
          { !(type==='min' && !isDistance) ? 
            <TextInput
                editable={!disabled}
                keyboardType="numeric"
                maxLength={6}
                value={ type==='min' && !isDistance ? value.toString() : calminsteps}
                onChangeText={text => getCalMinSteps(text, type)}
                placeholder={type}
                placeholderTextColor={Colors.BLACK3}
                style={{
                  paddingVertical: 5,
                  color: !disabled ? Colors.TEXTDARK : Colors.BLACK6,
                  fontSize: 16,
                  textAlign: 'center',
                  fontFamily: 'Quicksand-Regular'
                }}
            /> : <View style={{ flex: 1, justifyContent: 'center' }}> 
                    <Tooltip
                        popover={
                          <Text14
                            text={
                              'Enter the message here. Cannot be edited'
                            }
                            textColor={Colors.TEXTDARK}
                          />
                        }
                        width={250}
                        height={80}
                        backgroundColor={"#DFDFDF"}
                        pointerColor={"#DFDFDF"}
                        containerStyle={{elevation: 3, paddingHorizontal:10, marginLeft: 50}}
                        overlayColor={Colors.TRANSPARENT}
                        ModalComponent={undefined}
                        toggleOnPress={undefined}
                        toggleAction={undefined}
                        onOpen={undefined}
                        withPointer={false}
                        onClose={undefined}
                        withOverlay={undefined}
                        highlightColor={undefined}
                        skipAndroidStatusBar={true}
                        closeOnlyOnBackdropPress={false}>
                        <View style={{ flex: 1 , justifyContent: 'center', alignItems: 'center' }}> 
                            <Text16Normal text={value} textColor={Colors.TEXTDARK} />
                      </View>
                    </Tooltip>
               </View>
          }
        
      </View>
    </View>
  );
};
