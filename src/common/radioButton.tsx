import React from 'react';
import {View, ViewStyle} from 'react-native';
import {Option} from '../interfaces';
import {CheckInput} from './checkInput';

interface Props {
  options: Option[];
  onChange: (checked: boolean, value: string) => void;
  value: string;
  validate?: boolean;
  wrapStyle?: ViewStyle;
}

export default function RadioButton(props: Props) {
  const radioButtons = props.options.map(option => {
    return (
      <CheckInput
        key={`option-${option.value}`}
        label={option.label}
        inputType="radio"
        checked={props.value === option.value}
        handleChange={checked => props.onChange(checked, option.value)}
        hasError={props.validate && !props.value ? true : false}
      />
    );
  });
  return <View style={props.wrapStyle}>{radioButtons}</View>;
}
