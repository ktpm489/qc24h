/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import Drawer  from './src/navigators'
// import webViewComponent from './webViewComponent'
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => Drawer);
