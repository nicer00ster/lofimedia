/** @format */
import { AppRegistry } from 'react-native';
import { Sentry, SentryLog } from 'react-native-sentry';

import App from './src/App';
import { name as appName } from './app.json';
import bgMessaging from './src/config/bgMessaging';

Sentry.config('https://505330cfbb8e48a4968e191268304db7@sentry.io/1273002', {
  logLevel: SentryLog.Verbose,
}).install();

AppRegistry.registerComponent(appName, () => App);
AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging);
