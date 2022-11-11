import React from 'react';
import { View, StyleSheet, SafeAreaView } from "react-native";

import colors from '../../config/color';

function Screen({ children, style }) {
  return (
    <SafeAreaView style={[styles.screen, style]}>
      <View style={[styles.view, style]}>{children}</View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.primary
  },
  view: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 25,
  }
})

export default Screen;
