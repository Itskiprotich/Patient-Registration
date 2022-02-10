import { PROFILE_ACTIONS, USER_ACTIONS } from './../actions/types';
import { User } from './../interfaces/user';
  
import { AnyAction } from 'redux';

const INITIAL_STATE: User = {
  first_name: '',
  last_name: '',
  dob: '',
  gender: '',
  phonenumber: '',
  id_number: '',
  passport_number: '',
  token: null,
  rememberMe: false,
  firstTime: true,
  expires: ''
};

const user = (
  state: User = INITIAL_STATE,
  action: AnyAction,
): User => {
  switch (action.type) {
    case USER_ACTIONS.LOGIN_SUCCESS:
      return { ...action.user, firstTime: false };
    case USER_ACTIONS.CLEAR_SESSION:
      if (state.token && !state.rememberMe) {
        return { ...state, ...{ token: null } };
      } else if (state.token && state.rememberMe) {
        return { ...state, ...{ token: null } };
      }
      return state;
    case PROFILE_ACTIONS.UPDATED:
      return {
        ...state,
        first_name: action.user.first_name,
        last_name: action.user.last_name,
        phonenumber: action.user.phonenumber,
        dob: action.user.dob,
        gender: action.user.gender
      }
    default:
      return state;
  }
};

export default user;
