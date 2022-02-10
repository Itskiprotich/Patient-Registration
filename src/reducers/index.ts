import { StateInterface } from './../interfaces/index';
import { combineReducers } from 'redux'; 
import { Action } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';   
import user from './user';
import alert from './alert';
import loading from './loading';
import patients from './patients';
import networkStatus from './network';
const reducers = combineReducers<StateInterface, Action>({
  user, 
  alert,
  loading, 
  patients,
  networkStatus
});

const rootPersistConfig = {
  key: 'patients',
  storage: AsyncStorage,
  blacklist: ['alert', 'loading']
};

export default persistReducer(rootPersistConfig, reducers);
