import React from 'react';
import {connect} from 'react-redux';

import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {LoginStackParamList} from 'src/RouteTypes';
import {Patients} from '../../interfaces/user';
import SignupScreenClass from './class/add';
import {StateInterface} from '../../interfaces';
import {addPatient} from '../../actions/userActions';
type SignupScreenNavigationProp = StackNavigationProp<
  LoginStackParamList,
  'NewPatient'
>;

type SignupScreenRouteProp = RouteProp<LoginStackParamList, 'NewPatient'>;

interface ExternalProps {
  navigation: SignupScreenNavigationProp;
  route: SignupScreenRouteProp;
}

interface StateProps {
  // userInfo: UserInfoInterface | null;
}

interface ActionProps {
  addPatient: (params: Patients) => void;
}

export type SignupScreenProps = StateProps & ActionProps & ExternalProps;

const SignupScreen = (props: SignupScreenProps) => {
  return <SignupScreenClass {...props} />;
};

const mapStateToProps = (state: StateInterface): StateProps => {
  return {};
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateInterface, any, Action>,
): ActionProps => {
  return {
    addPatient: (patient: Patients) => dispatch(addPatient(patient)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupScreen);
