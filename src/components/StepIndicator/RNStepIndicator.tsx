import React from 'react';
import {View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';
import {Colors} from '../../utils/colors';
import Text16Normal from '../Text/Text16Normal';

interface Props {
  stepCount: number;
  currentStep: number;
}

const RNStepIndicator: React.FC<Props> = ({stepCount, currentStep}) => {
  const stepsArray = Array.from({length: stepCount}, (_, index) => index + 1);
  const step = stepsArray.map((val, idx) => {
    return (
      <View key={idx} style={{flexDirection: 'row'}}>
        <View
          style={{
            borderWidth: 2,
            borderColor:
              currentStep - 1 !== idx
                ? idx === currentStep - 2
                  ? Colors.POPUP_RED
                  : Colors.GREY_LIGHT
                : Colors.POPUP_RED,
            width: 40,
            height: 40,
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {!(currentStep > idx + 1) ? (
            <Text16Normal
              text={val.toString()}
              textColor={
                currentStep - 1 !== idx ? Colors.GREY_LIGHT : Colors.POPUP_RED
              }
            />
          ) : (
            <View
              style={{
                backgroundColor: Colors.POPUP_RED,
                height: 40,
                width: 40,
                borderRadius: 40,
                justifyContent: 'center',
              }}>
              <Icon name="check" color={Colors.TEXT} size={20} />
            </View>
          )}
        </View>
        {idx !== stepCount - 1 ? (
          <View style={{justifyContent: 'center', marginHorizontal: 10}}>
            <View
              style={{
                borderWidth: 2,
                borderColor:
                  idx < currentStep - 1 ? Colors.POPUP_RED : Colors.GREY_LIGHT,
                width: 30,
                borderRadius: 10,
              }}
            />
          </View>
        ) : null}
      </View>
    );
  });

  return (
    <View style={{flexDirection: 'row', justifyContent: 'center'}}>{step}</View>
  );
};

export default RNStepIndicator;
