import { getRequestConfig } from './index';
import { Patients } from './../interfaces/user';  
import { CONSTANTS } from '../utils/constants';
 

export const addPatient = (patient: Patients) => {
  const headers = getRequestConfig();
  return fetch(
    `${CONSTANTS.APP_URL}${CONSTANTS.ADD_PATIENT}${patient.puid}`,
    Object.assign({}, headers, {
      method: 'POST',
      body: JSON.stringify(patient),
    }),
  );
};
 
export const getPatients = (phonenumber: string, token: string) => {
 
  const headers = getRequestConfig();
  return fetch(
    `${CONSTANTS.APP_URL}${CONSTANTS.VIEW_PATIENTS}`,
    Object.assign({}, headers, {
      method: 'POST',
      body: JSON.stringify({ phonenumber }),
    }),
  );
};
  
 