import React from "react";
import { Button, View } from "react-native";

import Screen from "../components/Screen";
import Icon from '../components/Icon'

const HomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <Button
        onPress={() => navigation.navigate('Add card')}
        title="Go to notifications"
      />
      <Icon
        name={'comments'}
        color={'red'}
        size={30}
      />
    </Screen>
  );
}

export default HomeScreen;
