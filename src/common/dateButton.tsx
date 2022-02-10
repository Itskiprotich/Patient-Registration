import React, {useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AppStyles} from '../AppStyles';
import {Colors} from '../Colors';

interface Props {
  onChange: (date: string | undefined) => void;
  value: string;
  mode: 'date' | 'time';
  validate?: boolean;
  max?: Date;
}
export const DateButton = (props: Props) => {
  const getDate = (date: string) => {
    const dateObj = new Date(date);
    return dateObj;
  };

  const [value, setValue] = useState<Date>(
    props.value ? getDate(props.value) : new Date(),
  );
  const [show, setShow] = useState(false);

  const onValueChange = (event: Event, date?: Date) => {
    setShow(false);
    if (date) {
      setValue(date);
      props.onChange(date.toDateString());
    }
  };

  const clearValue = () => {
    setValue(new Date());
    props.onChange(undefined);
  };

  const label = props.value
    ? props.mode === 'date'
      ? value.toLocaleDateString()
      : value.toLocaleTimeString()
    : 'Select date';
  return (
    <View style={AppStyles.rowFlex}>
      <TouchableOpacity
        onPress={() => setShow(true)}
        style={[AppStyles.rowFlex]}>
        <View
          style={{
            ...AppStyles.textInput,
            ...AppStyles.dateInput,
          }}>
          <Text>{label}</Text>
        </View>
        <Icon name={'date-range'} size={32} color={Colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={clearValue}
        style={{
          ...AppStyles.rowFlex,
        }}>
        {props.value ? (
          <Icon name={'close'} size={32} color={Colors.primary} />
        ) : null}
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          timeZoneOffsetInMinutes={0}
          value={value}
          mode={props.mode}
          maximumDate={props.max}
          display="default"
          onChange={onValueChange}
        />
      )}
    </View>
  );
};
