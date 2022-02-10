import { Colors } from '../../Colors';
 
import { StyleSheet } from 'react-native'; 

export const Style = StyleSheet.create({
  button: {
    borderRadius: 26,
    backgroundColor: Colors.primary,
    alignItems: "center",
    paddingTop: 16,
    paddingBottom: 17,
    paddingLeft: 10,
    paddingRight: 10, 
  },
  text: {
    color: Colors.white,
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 27
  }
});