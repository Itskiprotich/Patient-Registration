import React from 'react';
import {Text, TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import {AppStyles} from '../../AppStyles';
import {Style} from './styles';

interface Props {
  label: string;
  onPress: () => void;
  style?: ViewStyle;
  textSyle?: TextStyle;
}

export default function Button(props: Props) {
  return (
    <TouchableOpacity
      style={{...Style.button, ...props.style}}
      onPress={props.onPress}>
      <Text style={{...AppStyles.textLabel, ...Style.text, ...props.textSyle}}>
        {props.label}
      </Text>
    </TouchableOpacity>
  );
}
