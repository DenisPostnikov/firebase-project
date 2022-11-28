import React from 'react';
import { View, StyleSheet, TextInput } from "react-native";

import colors from '../../config/color';

const FormInput = ({ width = '100%', ...otherProps }) => {
  return (
    <View style={[styles.container, { width }]}>
      <TextInput
        style={styles.text}
        {...otherProps}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: colors.light,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.lightGray
  },
  text: {
    flex: 1,
  }
})

export default FormInput;
