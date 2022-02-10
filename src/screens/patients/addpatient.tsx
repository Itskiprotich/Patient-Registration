import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import {ThunkDispatch} from 'redux-thunk';
import {Action} from 'redux';
import {connect} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {INITIAL_PATIENT, Patients} from '../../interfaces/user';
import {LoginStackParamList} from '../../RouteTypes';
import {AppStyles} from '../../AppStyles';
import {StateInterface} from '../../interfaces/';
import {Style} from './styles';
import {addPatient} from '../../actions/userActions';
import {DateButton} from '../../common/dateButton';
import RadioButton from '../../common/radioButton';
import {Colors} from '../../Colors';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PhoneNumberInput from '../../common/phone';
import uuid from 'react-native-uuid';

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
type patientKeys =
  | 'first_name'
  | 'last_name'
  | 'dob'
  | 'gender'
  | 'phonenumber'
  | 'city'
  | 'country'
  | 'active';

export const NewPatient = (props: PatientProps) => {
  const [patient, setPatient] = useState<Patients>(
    props.route.params?.patient || {...INITIAL_PATIENT},
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
            color={Colors.white}
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
  const handleFieldChange = (name: string, value: string) => {
    const dep = {...patient};
    if (name === 'first_name') {
      dep.first_name = value;
      setPatient(dep);
    }
    if (name === 'last_name') {
      dep.last_name = value;
      setPatient(dep);
    }
    if (name === 'phonenumber') {
      dep.phonenumber = value;
      setPatient(dep);
    }
    if (name === 'city') {
      dep.city = value;
      setPatient(dep);
    }
    if (name === 'country') {
      dep.country = value;

      setPatient(dep);
    }
  };

  const addPatient = () => {
    if (
      patient.first_name === '' ||
      patient.last_name === '' ||
      patient.phonenumber === ''
    ) {
      setValidate(true);
      return false;
    }
    //console.log(patient);

    props.addPatient({
      ...patient,
      puid: '12345678900987654321',
      first_name: patient.first_name,
      last_name: patient.last_name,
      dob: patient.dob,
      phonenumber: patient.phonenumber,
      gender: patient.gender,
      city: patient.city,
      country: patient.country,
      active: patient.active,
    });

    // props.navigation.pop();
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
          onChangeText={text => handleFieldChange('first_name', text)}
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
          placeholder="Family Name"
          style={{
            ...AppStyles.textInput,
            ...(patient.last_name === '' && validate
              ? AppStyles.errorTextInput
              : {}),
          }}
          onChangeText={text => handleFieldChange('last_name', text)}
          value={patient.last_name}
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
        <PhoneNumberInput
          onChangeText={text => handleFieldChange('phonenumber', text)}
          value={patient.phonenumber}
          placeholder={'Phone number (+254000000000)'}
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
            ...(patient.city === '' && validate
              ? AppStyles.errorTextInput
              : {}),
          }}
          value={patient.city}
          onChangeText={text => handleFieldChange('city', text)}
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
            ...(patient.country === '' && validate
              ? AppStyles.errorTextInput
              : {}),
          }}
          value={patient.country}
          onChangeText={text => handleFieldChange('country', text)}
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
    addPatient: (patient: Patients) => dispatch(addPatient(patient)),
  };
};

export default connect(null, mapDispatchToProps)(NewPatient);
