interface Person {
    first_name: string;
    last_name: string;
    dob: string;
    gender: string;
    phonenumber: string;
  }
  
  export interface User extends Person {
    token: string | null;
    id_number: string;
    passport_number: string;
    rememberMe: boolean;
    firstTime: boolean;
    expires?: string;
  }
  
  export interface Dependant extends Person {
    relationship: string;
    nextOfKin: boolean;
    msisdn: string;
    id_number: string;
    date_of_birth?: string;
  }
  
  export const INITIAL_DEPENDANT: Dependant = {
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    phonenumber: '',
    msisdn: '',
    relationship: '',
    nextOfKin: false,
    id_number: '',
  }
  
  export interface Patients extends Person{
    uuid:string;
    city: string | null;
    country: string | null;
    active: boolean;
  }
  export const INITIAL_PATIENT: Patients = {
    uuid: '',
    first_name: '',
    last_name: '',
    dob: '',
    gender: '',
    phonenumber: '',  
    active: true,
    city: '',
    country: '',
  }



  export interface ChangePinParams {
    phonenumber: string;
    id_number: string;
    current_pin: string;
    new_pin: string;
  }
  
  export interface ShareRecorsParams {
    phonenumber: string;
    provider: string;
    scope: string;
  }
  
  export interface DependantUpdate extends Dependant {
    first_name_update: string;
    last_name_update: string;
    gender_update: string;
    relationship_update: string;
    dob_update: string;
  }
  