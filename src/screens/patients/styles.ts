import { StyleSheet } from 'react-native'; 
import { Colors } from '../../Colors';

export const Style = StyleSheet.create({
  viewContainer: {
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    marginBottom: 5,
    marginTop: 15,
    backgroundColor: Colors.spacingGrey2
  },
  nameLabel: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 27
  },
  searchView: { 
    paddingTop: 15,
    paddingBottom: 5,
    paddingLeft: 13,
    marginBottom: 13,
    marginRight: 13
  },
  title: {
    fontSize: 24,
    lineHeight: 30
  },
  listItem: {
    paddingTop: 11,
    paddingBottom: 18,
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: Colors.white,
    height: 107,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10
  },
  topLabels: {
    flexDirection: 'row', 
  },
  relationship: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: '600',
    color: Colors.textInputBorder
  },
  typeSpacing: { 
  },
  dobLabel: {
    color: Colors.lightGrey2,
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 5
  },
  separator: {
    backgroundColor: Colors.spacingGrey,
    height: 10
  },
  nextOfKin: {
    fontFamily: 'Poppins-Italic',
    fontSize: 12,
    color: Colors.red1,
    marginLeft: 10
  },
  newDependentButton: {
    position: 'absolute',
    bottom:0,
    width: '100%' 
  },
  newDependantContainer: {
    paddingLeft: 22,
    paddingRight: 22
  }
});