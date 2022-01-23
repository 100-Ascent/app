import React from 'react';
import { TextInput, View, TextInputProps } from 'react-native';
import { Colors } from '../../utils/colors';

interface Props {
    placeholderText: string,
    inputProps: TextInputProps,
    containerStyle?: any,
}

const StyledInput: React.FC<Props> = ({ placeholderText, inputProps, containerStyle }) => {
    return <View style={containerStyle}>
        <TextInput 
            style={{                  
                color: Colors.WHITE,
                padding: 5,                
                borderBottomWidth: 1,
                borderBottomColor: Colors.BLACK3,                
            }} 
            placeholder={placeholderText}
            {...inputProps}
        />
    </View>
}

export default StyledInput;