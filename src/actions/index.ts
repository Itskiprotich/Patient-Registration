 import { Action } from 'redux';
import { ThunkDispatch } from 'redux-thunk';  
import { StateInterface, LoadingInterface, AlertInterface, NetworkStatus } from 'src/interfaces';
import { LOADING, NETWORK_ACTIONS, SET_ALERT } from './types';

export type ThunkDispatchAction = ThunkDispatch<StateInterface, any, Action>;

export const setLoading = (loading: LoadingInterface) => (
  { type: LOADING.SET_LOADING, loading }
);

export const setAlert = (alert: AlertInterface) => (
  { type: SET_ALERT, alert }
);

export const isOnline = (state: StateInterface) => {
  return state.networkStatus.connected === true;
};
export const updateNetworkStatus = (status: NetworkStatus) => ({
    type: NETWORK_ACTIONS.UPDATE, status
  });
  