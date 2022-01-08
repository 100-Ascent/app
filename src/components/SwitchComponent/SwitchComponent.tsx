import React from 'react';
import {View} from 'react-native';
import {Colors} from '../../utils/colors';
import { FONTS } from '../../utils/constants/fonts';
import StyledButton from '../Button/StyledButton';

interface Props {
  options: any;
  current: any;
  handleSwitch: any;
}

const CustomSwitchComponent: React.FC<Props> = ({options, current, handleSwitch}) => {
  //State variables

  //Async functions

  //Component functions

  return (
    <View style={{flexDirection: 'row'}}>
      {options.map((val, idx) => {
        return (
          <View style={{flex: 1, justifyContent: 'center'}}>
            {/* <View>
              <Text16Normal text={val} textColor={Colors.TEXTDARK} />
            </View> */}
            <StyledButton
              text={val}
              onPress={()=>handleSwitch(idx)}
              buttonStyle={{
                marginVertical: 5,
                marginHorizontal: 20,
                backgroundColor: current === idx ? Colors.POPUP_RED : Colors.TRANSPARENT,
              }}
              textStyle={[{
                color: current === idx ? Colors.WHITE : Colors.TEXTDARK,               
              }, FONTS.SEMIBOLD]}
            />
          </View>
        );
      })}
    </View>
  );
};

export default CustomSwitchComponent;
