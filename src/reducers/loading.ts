import { LOADING } from '../actions/types';
import { LoadingInterface, UserInitLoadingInterface } from './../interfaces/index'; 
  

const INITIAL_STATE: LoadingInterface = {
  loading: false,
  message: '',
  userInit: {
    loadingDependants: false,
    loadingHealthRecords: false,
    loadingProfile: false
  }
};

type userInitValues = 'loadingProfile' | 'loadingDependants' | 'loadingHealthRecords';
export const getLoading = (name: userInitValues, state: UserInitLoadingInterface) => {
  let loading = false;
  const keys: userInitValues[] = ['loadingProfile', 'loadingDependants', 'loadingHealthRecords'];
  const index = keys.indexOf(name);
  keys.forEach((key: userInitValues) => {
    if (key !== name) {
      if (state[key]) {
        loading = true;
      }
    }
  });
  return loading;
};

const loading = (state = INITIAL_STATE, action:any) => {
  const { userInit } = state;
  switch(action.type) {
    case LOADING.SET_LOADING:
      if (action.loading) {
        const newState = {...state};
        if (action.loading.message) {
          newState.message = action.loading.message
        }
        if (action.loading.loading != null) {
          newState.loading = action.loading.loading
        }
        return newState;
      }
      return action.loading;
    case LOADING.LOADING_PROFILE:
      return {...state, userInit: {...state.userInit, loadingProfile: true}};
    case LOADING.LOADED_PROFILE:
      if (userInit) {
        return {...state, userInit: {...state.userInit, loadingProfile: false}};
      }
      return state;
    case LOADING.LOADING_DEPENDANTS:
      return {...state, userInit: {...state.userInit, loadingDependants: true}};
    case LOADING.LOADED_DEPENDANTS:
      if (userInit) { 
        return {...state, userInit: {...state.userInit, loadingDependants: false}};
      }
      return state;
    case LOADING.LOADING_HEALTH_RECORDS:
      return {...state, userInit: {...state.userInit, loadingHealthRecords: true}};
    case LOADING.LOADED_HEALTH_RECORDS:
      if (userInit) { 
        return {...state, userInit: {...state.userInit, loadingHealthRecords: false}};
      }
      return state;
    default:
      return state // The main page is the default page.

  }
}

export default loading
