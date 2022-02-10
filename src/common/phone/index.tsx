import React, {useEffect, useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import {AppStyles} from '../../AppStyles';
import {Style} from './style';

interface Props {
  onChangeText: (text: string) => void;
  placeholder: string;
  value: string;
}

export default function PhoneNumberInput(props: Props) {
  const getValue = (text: string) => {
    return text.substring(4);
  };

  const [value, setValue] = useState(getValue(props.value));

  useEffect(() => {
    setValue(getValue(props.value));
  }, [props.value]);

  const handleValueChange = (text: string) => {
    props.onChangeText(`+254${text}`);
  };

  return (
    <View style={{...AppStyles.rowFlex, ...AppStyles.alignCenter}}>
      <Text style={{...Style.label, ...Style.prefix}}>+254</Text>
      <TextInput
        placeholder="xxx xxx xxx"
        style={{...AppStyles.textInput, ...AppStyles.flex1, ...Style.suffix}}
        onChangeText={handleValueChange}
        value={value}
        keyboardType="phone-pad"
      />
    </View>
  );
}
