import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import colors from '../config/color';

import HomeScreen from "../screens/HomeScreen";
import ConverterScreen from "../screens/ConverterScreen";

const Drawer = createDrawerNavigator();

const AppNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveBackgroundColor: colors.secondary,
        drawerLabelStyle: {
          fontSize: 16,
          color: colors.dark
        },
        drawerStyle: {
          backgroundColor: colors.primary,
        },
        headerStyle: {
          backgroundColor: colors.secondary,
        },
        headerTintColor: colors.white,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="Current converter" component={ConverterScreen} />
    </Drawer.Navigator>
  );
}

export default AppNavigator;
