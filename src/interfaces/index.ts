import { Patients, User } from './user';


export interface AlertInterface {
    message: string,
    visible: boolean;
  } 
  export interface LoadingInterface {
    loading: boolean;
    message: string;
    userInit?: UserInitLoadingInterface;
  }
  
  export interface UserInitLoadingInterface {
    loadingProfile: boolean;
    loadingDependants: boolean;
    loadingHealthRecords: boolean;
  }
  export interface NetworkStatus {
    connected: boolean;
    type: string;
  }


export interface StateInterface { 
  networkStatus: NetworkStatus;
  patients: Patients[];
  user: User;
  alert: AlertInterface;
  loading: LoadingInterface;
}