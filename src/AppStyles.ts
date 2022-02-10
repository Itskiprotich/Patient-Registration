import { StyleSheet } from 'react-native'; 
import { Colors } from './Colors';

export const AppStyles = StyleSheet.create({
  app: {
    backgroundColor: '#ffffff'
  },
  container: {
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 8,
    paddingRight: 8,
    backgroundColor: '#ffffff'
  },
  innerContainer: {
    marginTop: 15,
    marginBottom: 10,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderColor: Colors.textInputBorder,
    borderRadius: 8,
    padding: 10,
  },
  errorTextInput: {
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 1)',
  },
  errorText: {
    color: 'rgba(255, 0, 0, 1)',
  },
  formGroup: {
    marginBottom: 10,
    marginTop: 10
  },
  formLabel: {
    marginBottom: 5,
  },
  text: {
    fontSize: 20,
    paddingBottom: 5,
  },
  textLabel: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
    color: Colors.text,
  },
  boldText: {
    fontWeight: 'bold'
  },
  blackColor: {
    color: Colors.black
  },
  primaryButton: {
    backgroundColor: Colors.primary,
  },
  flex1: {
    flex: 1,
  },
  imageResizeCenter: {
    resizeMode: 'center',
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowFlex: {
    // flex: 1,
    flexDirection: 'row',
  },
  primaryTint: {
    tintColor: Colors.primary,
  },
  checkImage: {
    width: 32,
    height: 32,
  },
  optionLabel: {
    marginTop: 5,
    alignSelf: 'center',
  },
  vCenter: {
    alignItems: 'center'
  },
  separator : {
    height: 1,
    width: "100%",
    backgroundColor: "#CED0CE"
  },
  alignCenter: {
    //flex: 1,
    alignItems: "center"
  },
  justifyCenter: {
    justifyContent: 'center'
  },
  dateInput: {
    height: 40,
    width: '90%',
    borderColor: Colors.lightGrey,
    justifyContent: 'center',
  },
  redColor1: {
    color: Colors.red1
  },
  whiteColor: {
    color: Colors.white
  },
  italics: {
    fontStyle: 'italic'
  },
  headerButton: {
    marginRight: 10,
    backgroundColor: Colors.white,
    borderRadius: 5
  },
  cancelButton: {
    backgroundColor: Colors.red2
  },
  required: {
    color: Colors.red
  },
  listItem: {
    backgroundColor: Colors.white,
    marginRight: 10,
    marginLeft: 10,
    borderRadius: 10
  },
  listItemHeader: {
    backgroundColor: Colors.blue3,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    paddingTop: 11,
    paddingLeft: 17,
    paddingBottom: 10
  },
  listItemBody: {
    paddingTop: 11,
    paddingBottom: 18,
    paddingLeft: 17,
    paddingRight: 17,
  },
  itemView: {
    paddingTop: 5,
    paddingBottom: 5
  },
  itemLabel: {
    fontFamily: 'Poppins-Regular',
    minWidth: '40%',
    color: Colors.blue2,
    lineHeight: 18,
    fontSize: 14,
    marginRight: 10
  },
  centerText: {
    textAlign: 'center'
  },
  headerRight: {
    marginRight: 10,
    marginLeft: 10
  }
});
