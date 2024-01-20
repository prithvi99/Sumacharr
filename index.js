/**
 * @format
 */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
import React from 'react';
import {AppRegistry, Text} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import store from './store';
import 'react-native-url-polyfill/auto';
import 'react-native-get-random-values';
import './assets/fonts/LibreBaskerville-Regular.ttf';

const Root = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent('Summize_v1', () => Root);
