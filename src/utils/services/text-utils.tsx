import React from 'react';
import {Text} from 'react-native';
import Text14 from '../../components/Text/Text14';
import {Colors} from '../colors';

export const applyBoldStyleToPartOfString = text => {
  let numberOfItemsAdded = 0;
  const result = text.sentence.split(/\{\d+\}/);
  text.boldText.forEach((boldText, i) =>
    result.splice(
      ++numberOfItemsAdded + i,
      0,
      <Text style={{fontWeight: 'bold'}}>{boldText}</Text>,
    ),
  );
  return (
    <Text14
      text={result}
      textColor={Colors.TEXTDARK}
      textStyle={{textAlign: 'center'}}
    />
  );
};
