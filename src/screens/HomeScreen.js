import React from "react";
import { Button, View } from "react-native";

import Screen from "../components/Screen";

const HomeScreen = ({ navigation }) => {
  return (
    <Screen>
      <Button
        onPress={() => navigation.navigate('Add card')}
        title="Go to notifications"
      />
    </Screen>
  );
}

export default HomeScreen;
