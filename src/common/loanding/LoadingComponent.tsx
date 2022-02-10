import React from 'react';
import {
  Modal,
  Text,
  View,
  Button,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {LoadingInterface} from '../../interfaces';
import {AppStyles} from '../../AppStyles';

interface Props {
  loading: LoadingInterface;
}

export default function LoadingComponent(props: Props) {
  const {loading} = props;
  return (
    <Modal animationType="slide" transparent={true} visible={loading.loading}>
      <View style={ModalStyle.centeredView}>
        <View style={ModalStyle.modalView}>
          <View style={AppStyles.formGroup}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>{loading.message ? loading.message : 'Loadings...'}</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const ModalStyle = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    //alignItems: "center",
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  footerButtonView: {
    flexDirection: 'row-reverse',
  },
});
