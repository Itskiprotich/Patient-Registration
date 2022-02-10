import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {INITIAL_DEPENDANT, Patients} from '../../interfaces/user';
import {LoginStackParamList} from '../../RouteTypes';
import {AppStyles} from '../../AppStyles';
import {StateInterface} from '../../interfaces/';
import {Style} from './styles';
import {addPatient} from '../../actions/userActions';
import {DateButton} from '../../common/dateButton';
import RadioButton from '../../common/radioButton';
import {Colors} from '../../Colors';

import Icon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<
  LoginStackParamList,
  'NewPatient'
>;

type HomeScreenRouteProp = RouteProp<LoginStackParamList, 'NewPatient'>;

interface ExternalProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface ActionProps {
  addPatient: (patient: Patients) => void;
}
interface StateProps {
  first_name: string;
  last_name: string;
  dob: string;
  gender: string;
  phonenumber: string;
  city: string;
  country: string;
  active: boolean;
}

type PatientProps = ExternalProps & ActionProps & StateProps;

type radioTypes = 'gender' | 'active';

const genderOptions = [
  {label: 'Male', value: 'male'},
  {label: 'Female', value: 'female'},
];

const activeOptions = [
  {label: 'Active', value: 'true'},
  {label: 'In Active', value: 'false'},
];

export const NewPatient = (props: PatientProps) => {
  const [patient, setPatient] = useState<Patients>(
    props.route.params?.patient || {...INITIAL_DEPENDANT},
  );
  const [validate, setValidate] = useState(false);

  const {navigation, route} = props;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Add Patient',
      headerLeft: undefined,
      headerRight: () => (
        <View style={AppStyles.headerButton}>
          <Icon
            onPress={() => addPatient()}
            name="save"
            color={Colors.green}
            size={28}
          />
        </View>
      ),
    });
  }, [navigation]);

  const handleGenderRadioChange = (
    checked: boolean,
    value: string,
    name: radioTypes,
  ) => {
    const dep = {...patient};
    if (checked) {
      dep.gender = value;
    } else {
      dep.gender = value;
    }
    setPatient(dep);
  };
  const handleActiveRadioChange = (
    checked: boolean,
    value: string,
    name: radioTypes,
  ) => {
    const dep = {...patient};
    if (checked) {
      dep.active = true;
    } else {
      dep.active = false;
    }
    setPatient(dep);
  };

  const handleDateChange = (value: string | undefined) => {
    const dep = {...patient};
    if (value) {
      const date = new Date(value);
      const pad = (v: number) => (v < 10 ? `0${v}` : v);
      dep.dob = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
        date.getDate(),
      )}`;
    } else {
      dep.dob = '';
    }
    setPatient(dep);
  };

  const addPatient = () => {
    if (
      patient.first_name === '' ||
      patient.last_name === '' ||
      patient.gender === '' ||
      patient.phonenumber !== ''
    ) {
      setValidate(true);
      return false;
    }
    props.addPatient({
      ...patient,
      phonenumber: patient.phonenumber,
      first_name: patient.first_name,
      last_name: patient.last_name,
    });
    props.navigation.pop();
  };

  return (
    <KeyboardAwareScrollView
      style={{
        ...AppStyles.container,
        ...Style.newDependantContainer,
      }}>
      <View style={AppStyles.formGroup}>
        <Text
          style={{
            ...AppStyles.textLabel,
            ...AppStyles.formLabel,
          }}>
          Given Name <Text style={AppStyles.required}>*</Text>
        </Text>
        <TextInput
          placeholder="First Name"
          style={{
            ...AppStyles.textInput,
            ...(patient.first_name === '' && validate
              ? AppStyles.errorTextInput
              : {}),
          }}
          value={patient.first_name}
        />
      </View>
      <View style={AppStyles.formGroup}>
        <Text
          style={{
            ...AppStyles.textLabel,
            ...AppStyles.formLabel,
          }}>
          Family Name <Text style={AppStyles.required}>*</Text>
        </Text>
        <TextInput
          placeholder="First Name"
          style={{
            ...AppStyles.textInput,
            ...(patient.first_name === '' && validate
              ? AppStyles.errorTextInput
              : {}),
          }}
          value={patient.first_name}
        />
      </View>
      <View style={AppStyles.formGroup}>
        <Text
          style={{
            ...AppStyles.textLabel,
            ...AppStyles.formLabel,
          }}>
          Date of birth <Text style={AppStyles.required}>*</Text>
        </Text>
        <DateButton
          value={patient.dob}
          mode="date"
          max={new Date()}
          onChange={handleDateChange}
          validate={validate}
        />
      </View>
      <View style={AppStyles.formGroup}>
        <Text
          style={{
            ...AppStyles.textLabel,
            ...AppStyles.formLabel,
          }}>
          Phone Number <Text style={AppStyles.required}>*</Text>
        </Text>
        <TextInput
          placeholder={'Phone number (+254000000000)'}
          style={{
            ...AppStyles.textInput,
            ...(patient.phonenumber === '' && validate
              ? AppStyles.errorTextInput
              : {}),
          }}
          value={patient.phonenumber}
        />
      </View>
      <View style={AppStyles.formGroup}>
        <Text
          style={{
            ...AppStyles.textLabel,
            ...AppStyles.formLabel,
          }}>
          Gender <Text style={AppStyles.required}>*</Text>
        </Text>
        <RadioButton
          options={genderOptions}
          value={patient.gender}
          onChange={(checked, value) =>
            handleGenderRadioChange(checked, value, 'gender')
          }
          validate={validate}
          wrapStyle={{...AppStyles.rowFlex, ...AppStyles.flex1}}
        />
      </View>

      <View style={AppStyles.formGroup}>
        <Text
          style={{
            ...AppStyles.textLabel,
            ...AppStyles.formLabel,
          }}>
          City
        </Text>
        <TextInput
          placeholder="Enter City"
          style={{
            ...AppStyles.textInput,
            ...(patient.first_name === '' && validate
              ? AppStyles.errorTextInput
              : {}),
          }}
          value={patient.first_name}
        />
      </View>
      <View style={AppStyles.formGroup}>
        <Text
          style={{
            ...AppStyles.textLabel,
            ...AppStyles.formLabel,
          }}>
          Country
        </Text>
        <TextInput
          placeholder="Enter Country"
          style={{
            ...AppStyles.textInput,
            ...(patient.first_name === '' && validate
              ? AppStyles.errorTextInput
              : {}),
          }}
          value={patient.first_name}
        />
      </View>
      <View style={AppStyles.formGroup}>
        <Text
          style={{
            ...AppStyles.textLabel,
            ...AppStyles.formLabel,
          }}>
          Active? <Text style={AppStyles.required}>*</Text>
        </Text>
        <RadioButton
          options={activeOptions}
          value={patient.active ? 'true' : 'false'}
          onChange={(checked, value) =>
            handleActiveRadioChange(checked, value, 'active')
          }
          validate={validate}
          wrapStyle={{...AppStyles.rowFlex, ...AppStyles.flex1}}
        />
      </View>
    </KeyboardAwareScrollView>
  );
};

const mapDispatchToProps = (
  dispatch: ThunkDispatch<StateInterface, any, Action>,
): ActionProps => {
  return {
    addPatient: (dependent: Patients) => dispatch(addPatient(dependent)),
  };
};

export default connect(null, mapDispatchToProps)(NewPatient);
