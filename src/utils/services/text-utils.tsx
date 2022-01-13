import React from 'react';
import {Text} from 'react-native';
import Text12Normal from '../../components/Text/Text12Normal';
import Text14 from '../../components/Text/Text14';
import {Colors} from '../colors';

export const applyBoldStyleToPartOfString = (text, klicks) => {
  let numberOfItemsAdded = 0;
  const result = text.sentence.split(/\{\d+\}/);
  text.boldText.forEach((boldText, i) =>
    result.splice(
      ++numberOfItemsAdded + i,
      0,
      <Text style={{fontWeight: 'bold', fontSize: 12, color: Colors.INFO_YELLOW}}>{klicks + " " + boldText}</Text>,
    ),
  );
  return (
    <Text12Normal
      text={result}
      textColor={Colors.TEXTDARK}
      textStyle={{textAlign: 'center'}}
    />
  );
};
