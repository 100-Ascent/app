import React from 'react';
<<<<<<< HEAD
import { TouchableOpacity } from 'react-native';
import { View } from 'react-native';
import { Icon } from 'react-native-elements/dist/icons/Icon';

interface Props {
    sliderDirection: string,
    onPressed: () => void
}

const MapSliderChanger: React.FC<Props> = ({ sliderDirection, onPressed }) => {
    return <TouchableOpacity activeOpacity={0.2} onPress={onPressed}>
    <View style={{               
        paddingHorizontal: 5, 
        height: 400,                 
        zIndex: 10,
        backgroundColor: "rgba(255,255,255,0.1)",
        justifyContent: 'center'
    }}>
        <Icon name={sliderDirection} type="ant-design" color={"white"}/>
    </View>
    </TouchableOpacity>
}

export default MapSliderChanger;
=======
import {TouchableOpacity} from 'react-native';
import {View} from 'react-native';
import {Icon} from 'react-native-elements/dist/icons/Icon';

interface Props {
  sliderDirection: string;
  onPressed: () => void;
}

const MapSliderChanger: React.FC<Props> = ({sliderDirection, onPressed}) => {
  return (
    <TouchableOpacity activeOpacity={0.2} onPress={onPressed}>
      <View
        style={{
          paddingHorizontal: 5,
          height: '100%',
          zIndex: 10,
          //   backgroundColor: 'rgba(0,0,0,0.3)',
          justifyContent: 'center',
        }}>
        <Icon name={sliderDirection} type="ant-design" color={'white'} />
      </View>
    </TouchableOpacity>
  );
};

export default MapSliderChanger;
>>>>>>> 07f66b329214a0c3ad1496e9b1891bf42e51ab99
