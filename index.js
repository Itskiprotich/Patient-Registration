import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import React, {Component} from 'react';
import App from './App';
import {name as appName} from './app.json';
import {configureStore} from './src/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
const configuredStore = configureStore({});

export default class ConnectedApp extends Component {
  render() {
    return (
      <Provider store={configuredStore.store}>
        <PersistGate persistor={configuredStore.persistedStore}>
          <App />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent(appName, () => ConnectedApp);
