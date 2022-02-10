import React from 'react';
import {Alert, PermissionsAndroid, SafeAreaView, StatusBar} from 'react-native';
import {Dispatch} from 'redux';
import {connect} from 'react-redux';
import {setAlert, updateNetworkStatus} from './src/actions';
import {AppStyles} from './src/AppStyles';
import {
  LoadingInterface,
  AlertInterface,
  NetworkStatus,
  StateInterface,
} from './src/interfaces';
import {LoginStackParamList} from './src/RouteTypes';
import NetInfo, {NetInfoSubscription} from '@react-native-community/netinfo';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {Colors} from './src/Colors';
import Patient from './src/screens/patients';
import LoadingComponent from './src/common/loanding/LoadingComponent';
import {NewPatient} from './src/screens/patients/addpatient';
import SignupScreen from './src/screens/patients/update';

declare const global: {HermesInternal: null | {}};

const LoginStackNavigator = createStackNavigator<LoginStackParamList>();
const LoginStack = () => {
  return (
    <LoginStackNavigator.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: Colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleAlign: 'center',
      }}>
      <LoginStackNavigator.Screen
        name="Patients"
        options={{
          title: 'Registered Patients',
          headerShown: true,
        }}
        component={Patient}
      />
      <LoginStackNavigator.Screen
        name="NewPatient"
        options={{
          title: 'Add Patient',
          headerShown: true,
        }}
        component={NewPatient}
      />
      <LoginStackNavigator.Screen
        name="Signup"
        options={{
          title: 'Add Patient',
          headerShown: true,
        }}
        component={SignupScreen}
      />
    </LoginStackNavigator.Navigator>
  );
};

interface State {
  loading: LoadingInterface;
}

class App extends React.Component<AppProps, State> {
  private netWorkSubScription: NetInfoSubscription | null = null;
  constructor(props: AppProps) {
    super(props);
    this.state = {
      loading: props.loading,
    };
  }

  public componentDidUpdate(prevProps: AppProps) {
    const {alert} = this.props;
    const prevAlert = prevProps.alert;
    if (alert.visible && prevAlert.visible !== alert.visible) {
      Alert.alert('info', alert.message, [
        {
          text: 'OK',
          onPress: () => this.props.setAlert({visible: false, message: ''}),
        },
      ]);
    }
  }

  private requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  public async componentDidMount() {
    await this.requestCameraPermission();
    this.netWorkSubScription = NetInfo.addEventListener(state => {
      this.props.updateNetworkStatus({
        connected: state.isConnected,
        type: state.type,
      });
    });
  }

  public componentWillUnmount() {
    if (this.netWorkSubScription) {
      this.netWorkSubScription();
    }
  }

  public static getDerivedStateFromProps(props: AppProps, state: State) {
    if (props.loading != state.loading) {
      return {loading: props.loading};
    }
    return null;
  }

  public render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{...AppStyles.flex1, ...AppStyles.app}}>
          <NavigationContainer>
            <LoginStack />
          </NavigationContainer>
          <LoadingComponent loading={this.state.loading} />
        </SafeAreaView>
      </>
    );
  }
}

interface StateProps {
  token: string | null;
  alert: AlertInterface;
  loading: LoadingInterface;
  rememberMe: boolean;
}

interface ActionProps {
  setAlert: (alert: AlertInterface) => void;
  updateNetworkStatus: (status: NetworkStatus) => void;
}

type AppProps = StateProps & ActionProps;

const mapStateToProps = (state: StateInterface): StateProps => {
  const validToken = (date: string | undefined) => {
    if (date && date !== '') {
      if (new Date().getTime() > new Date(date).getTime()) {
        return false;
      }
    }
    return true;
  };
  return {
    token:
      state.user && validToken(state.user.expires) ? state.user.token : null,
    rememberMe: state.user ? state.user.rememberMe : false,
    alert: state.alert,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setAlert: (alert: AlertInterface) => {
      dispatch(setAlert(alert));
    },
    updateNetworkStatus: (status: NetworkStatus) =>
      dispatch(updateNetworkStatus(status)),
    dispatch: dispatch,
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
