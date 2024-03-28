import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// TODO : do not mix require and imports, No unused vars
var SQLite = require('react-native-sqlite-storage');

AppRegistry.registerComponent(appName, () => App);
