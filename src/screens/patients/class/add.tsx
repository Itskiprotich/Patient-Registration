import React from 'react';
import {View, Text, TextInput} from 'react-native';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import Button from '../../../common/button';
import {DateButton} from '../../../common/dateButton';
import PhoneNumberInput from '../../../common/phone';
import RadioButton from '../../../common/radioButton';
import {AppStyles} from '../../../AppStyles';
import {Option} from '../../../interfaces';
import {Patients} from '../../../interfaces/user';
import {SignupScreenProps} from '../update';
import {Style} from './style';

interface Props {
  addPatient: (patient: Patients) => void;
}

interface State {
  patient: Patients;
  genderOptions: Option[];
  validate: boolean;
  activeOptions: Option[];
}

export default class SignupScreenClass extends React.Component<
  SignupScreenProps,
  State
> {
  constructor(props: SignupScreenProps) {
    super(props);
    this.state = {
      patient: {
        first_name: '',
        last_name: '',
        dob: '',
        gender: '',
        phonenumber: '',
        puid: '',
        city: '',
        country: '',
        active: true,
      },
      validate: false,
      genderOptions: [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
      ],
      activeOptions: [
        {label: 'Yes', value: 'true'},
        {label: 'No', value: 'false'},
      ],
    };
  }

  addPatient = () => {
    const {patient} = this.state;
    if (
      patient.first_name === '' ||
      patient.last_name === '' ||
      patient.gender === '' ||
      patient.dob === '' ||
      patient.phonenumber === ''
    ) {
      this.setState({validate: true});
      return false;
    }
    this.props.addPatient(patient);
  };

  handleGenderChange = (checked: boolean, value: string) => {
    if (checked) {
      this.setState((prevState, props) => {
        const newState = {...prevState};
        newState.patient.gender = value;
        return newState;
      });
    } else {
      this.setState((prevState, props) => {
        const newState = {...prevState};
        newState.patient.gender = '';
        return newState;
      });
    }
  };
  handleActiveChange = (checked: boolean, value: string) => {
    if (checked) {
      this.setState((prevState, props) => {
        const newState = {...prevState};
        newState.patient.active = true;
        return newState;
      });
    } else {
      this.setState((prevState, props) => {
        const newState = {...prevState};
        newState.patient.active = false;
        return newState;
      });
    }
  };

  handleFieldChange = (
    name: 'first_name' | 'last_name' | 'phonenumber' | 'country' | 'city',
    value: string,
  ) => {
    this.setState((prevState, props) => {
      const newState = {...prevState};
      newState.patient[name] = value;
      return newState;
    });
  };

  handleDateChange = (value: string | undefined) => {
    this.setState((prevState, props) => {
      const newState = {...prevState};
      if (value) {
        const date = new Date(value);
        const pad = (v: number) => (v < 10 ? `0${v}` : v);
        newState.patient.dob = `${date.getFullYear()}-${pad(
          date.getMonth() + 1,
        )}-${pad(date.getDate())}`;
      } else {
        newState.patient.dob = '';
      }
      return newState;
    });
  };

  public render() {
    const {patient, validate} = this.state;
    const err = patient.first_name === '' ? AppStyles.errorTextInput : {};
    return (
      <KeyboardAwareScrollView
        style={{
          ...AppStyles.container,
          ...Style.container,
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
            onChangeText={text => this.handleFieldChange('first_name', text)}
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
            onChangeText={text => this.handleFieldChange('last_name', text)}
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
            onChange={this.handleDateChange}
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
            onChangeText={text => this.handleFieldChange('phonenumber', text)}
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
            options={this.state.genderOptions}
            value={this.state.patient.gender}
            onChange={this.handleGenderChange}
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
            onChangeText={text => this.handleFieldChange('city', text)}
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
            onChangeText={text => this.handleFieldChange('country', text)}
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
            options={this.state.activeOptions}
            value={this.state.patient.active ? 'true' : 'false'}
            onChange={this.handleActiveChange}
            validate={validate}
            wrapStyle={{...AppStyles.rowFlex, ...AppStyles.flex1}}
          />
        </View>
        <View style={AppStyles.formGroup}>
          <Button label="Create My account" onPress={this.addPatient} />
        </View>
        <View
          style={{
            ...AppStyles.formGroup,
            ...AppStyles.alignCenter,
          }}></View>
      </KeyboardAwareScrollView>
    );
  }
}
