import { USER_ACTIONS } from './../actions/types';
import { Patients } from './../interfaces/user'; 
import { AnyAction } from 'redux'; 

const INITIAL_STATE: Patients[]  = [];

const patients = (state: Patients[] = INITIAL_STATE, action: AnyAction,): Patients[] => {
  switch (action.type) {
    case USER_ACTIONS.LOADED_DEPENDENTS:
      return [...action.dependents];
    case USER_ACTIONS.DEPENDENT_DELETED:
      return state.filter(d => d.first_name === action.dependent.first_name && d.last_name === action.dependent.last_name);
    case USER_ACTIONS.DEPENDENT_ADDED:
        return state.concat(action.dependent);
    case USER_ACTIONS.DEPENDENT_UPDATED:
      const { dependent } = action;
      return state.map(dep => {
        if (dep.first_name === dependent.first_name && dep.last_name === dependent.last_name) {
          return {
            ...dep,
            first_name: dependent.first_name_update,
            last_name: dependent.last_name_update,
            gender: dependent.gender_update,
            dob: dependent.dob_update,
            relationship: dependent.relationship_update
          };
        }
        return dep;
      })
    default:
      return state;
  }
};

export default patients;
