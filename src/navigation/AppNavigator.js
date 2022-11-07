import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from "../screens/HomeScreen";
import AddCardScreen from "../screens/AddCardScreen";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator initialRouteName="Home">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Add card" component={AddCardScreen} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
