import { StateInterface } from './../interfaces/index';
import * as UserAPI from '../api/userApi'; 
import { isOnline, ThunkDispatchAction } from './index';  
import { setLoading, setAlert} from './index';  

const offLineMsg = 'You are offline, connect to the internet first';
import { Patients } from './../interfaces/user';
import { USER_ACTIONS } from './types';

export const patientAdded = (patient: Patients) => (
    { type : USER_ACTIONS.PATIENT_ADDED, patient }
  );

export const addPatient = (patient: Patients) => {
    return (dispatch: ThunkDispatchAction, getState: () => StateInterface) => {
      if (!isOnline(getState())) {
        dispatch(setAlert({
          visible: true,
          message: offLineMsg
        }));
        return;
      }
      dispatch(setLoading({ loading: true, message: 'adding dependant...'}));
      const { user } = getState();
      if (user.token) {
        const addPatientPromise = UserAPI.addPatient(patient, user.token);
        addPatientPromise.then(response => response.json()).then(json => {
          dispatch(setLoading({ loading: false, message: ''}));
          dispatch(setAlert({ visible: true, message: json.message }));
          if (json.status !== 'Failure') {
            dispatch(patientAdded(patient));
          }
        })
      }
    }
  }