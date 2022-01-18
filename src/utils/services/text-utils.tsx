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

export const applyBoldToRules= (text) => {
  let numberOfItemsAdded = 0;
  const result = text.sentence.split(/\{\d+\}/);
  text.boldText.forEach((boldText, i) =>
    result.splice(
      ++numberOfItemsAdded + i,
      0,
      <Text style={{fontWeight: 'bold', fontSize: 14, color: Colors.TEXTDARK}}>{boldText}</Text>,
    ),
  );
  return (
    <Text14
      text={result}
      textColor={Colors.TEXTDARK}
    />
  );
};

export const compare = ( a, b ) => {
  return a<b ? -1 : a>b ? 1: 0;
}

export const truncate = (input) => input.length > 30 ? `${input.substring(0, 13)}...` : input;

