import * as React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'mobx-react';
import { NavigationContainer } from '@react-navigation/native';

import rootStore from './src/stores/index';
import AppNavigator from "./src/navigation/AppNavigator";

export default function App() {
  return (
    <Provider {...rootStore}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </Provider>
  );
}
