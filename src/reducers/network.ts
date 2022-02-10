import { NetworkStatus } from 'src/interfaces';
import { NETWORK_ACTIONS } from './../actions/types'; 
 
import { AnyAction } from 'redux'; 

const INITIAL_STATE: NetworkStatus = { connected: true, type: '' };

const networkStatus = (state: NetworkStatus = INITIAL_STATE, action: AnyAction): NetworkStatus => {
  switch (action.type) {
    case NETWORK_ACTIONS.UPDATE:
      if (action.status) {
        return action.status;
      }
      return state;
    default:
      return state;
  }
};

export default networkStatus;
