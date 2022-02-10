import { SET_ALERT } from './../actions/types';
import { AlertInterface } from 'src/interfaces';
 

const INITIAL_STATE: AlertInterface= {
  message: '',
  visible: false,
}

const alert = (state = INITIAL_STATE, action:any) => {
  switch(action.type) {
    case SET_ALERT:
      return Object.assign({}, state, action.alert);
    default:
      return state // The current status
  }
}

export default alert
