import React, {useEffect, useState} from 'react';
import {FlatList, View, Text, TouchableOpacity, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import {connect} from 'react-redux';
import {LoginStackParamList} from '../../RouteTypes';
import {Patients} from '../../interfaces/user';
import {AppStyles} from '../../AppStyles';
import {Colors} from '../../Colors';
import {StateInterface} from '../../interfaces';
import {Style} from './styles';
import {JSONObjectInterface} from '../../interfaces/json';

import Icon from 'react-native-vector-icons/MaterialIcons';

type HomeScreenNavigationProp = StackNavigationProp<
  LoginStackParamList,
  'Patients'
>;

type HomeScreenRouteProp = RouteProp<LoginStackParamList, 'Patients'>;

interface ExternalProps {
  navigation: HomeScreenNavigationProp;
  route: HomeScreenRouteProp;
}

interface StateProps {
  patients: Patients[];
}

export type PatientsScreenProps = ExternalProps & StateProps;

const Patient = (props: PatientsScreenProps) => {
  const {navigation} = props;
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => <View style={AppStyles.headerButton}></View>,
      headerLeft: undefined,
    });
  }, [navigation]);

  const [searchText, setSearchText] = useState('');
  const [patients, setPatient] = useState(props.patients || []);

  useEffect(() => {
    setPatient(props.patients);
  }, [props.patients]);

  const renderSeparator = () => {
    return <View style={{...AppStyles.separator, ...Style.separator}} />;
  };

  const calculateAge = (dob: string) => {
    const date = new Date(dob);
    if (!(date instanceof Date && !isNaN(date))) {
      return dob;
    }
    return `${Math.floor(
      (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 365),
    )} Years old`;
  };
  const renderItem = ({item}: JSONObjectInterface) => {
    return (
      <TouchableOpacity
        style={Style.listItem}
        onPress={() => {
          console.log(item);
        }}>
        <View style={Style.topLabels}>
          <Text style={{...AppStyles.textLabel, ...Style.nameLabel}}>
            {`${item.first_name} ${item.last_name}`}
          </Text>
          {item.nextOfKin && (
            <Text
              style={{
                ...Style.nameLabel,
                ...Style.nextOfKin,
                ...AppStyles.italics,
                ...AppStyles.redColor1,
              }}>
              (NEXT OF KIN)
            </Text>
          )}
        </View>

        <View style={AppStyles.rowFlex}>
          {item.gender && <Text>Gender</Text>}
          <Text style={{...AppStyles.textLabel, ...Style.dobLabel}}>
            {calculateAge(item.dob || item.date_of_birth)}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if (searchText === '') {
      setPatient(props.patients || []);
    } else {
      const deps = patients.filter(d => {
        return (
          d.first_name.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
          d.last_name.toLowerCase().search(searchText.toLowerCase()) !== -1 ||
          `${d.first_name} ${d.last_name}`
            .toLowerCase()
            .search(searchText.toLowerCase()) !== -1
        );
      });
      setPatient(deps);
    }
  }, [searchText]);

  return (
    <View
      style={{
        ...AppStyles.container,
        ...AppStyles.flex1,
        ...Style.viewContainer,
      }}>
      <View style={Style.searchView}>
        <TextInput
          style={{
            ...AppStyles.textInput,
          }}
          onChangeText={text => setSearchText(text)}
          value={searchText}
          placeholder={'Search by Name'}
        />
      </View>
      {patients.length > 0 ? (
        <FlatList
          data={patients}
          renderItem={renderItem}
          ItemSeparatorComponent={renderSeparator}
          keyExtractor={(item, index) =>
            `dependent-${index}-${item.first_name}-${item.last_name}`
          }
          extraData={patients}
        />
      ) : (
        <View style={AppStyles.alignCenter}>
          <Text>
            {searchText === ''
              ? `No Patients yet, you can add one.`
              : `No results found`}
          </Text>
        </View>
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('Signup')}
        style={{
          borderWidth: 1,
          borderColor: 'rgba(0,0,0,0.2)',
          alignItems: 'center',
          justifyContent: 'center',
          width: 70,
          position: 'absolute',
          bottom: 10,
          right: 10,
          height: 70,
          backgroundColor: Colors.primary,
          borderRadius: 100,
        }}>
        <Icon name={'add'} size={32} color={Colors.white} />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: StateInterface): StateProps => {
  return {
    patients: state.patients,
  };
};

export default connect(mapStateToProps, null)(Patient);
