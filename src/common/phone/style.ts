import { StyleSheet } from 'react-native';
import { Colors } from '../../Colors';

export const Style = StyleSheet.create({
  label: {
    marginRight: 0
  },
  prefix: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.textInputBorder,
    borderRadius: 8,
    padding: 10,
    borderRightWidth: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    paddingRight: 0
  },
  suffix: {
    borderLeftWidth: 0,
    borderBottomLeftRadius: 0,
    borderTopLeftRadius: 0
  }
});