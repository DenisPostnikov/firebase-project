import React from 'react';
import { StyleSheet, Text } from "react-native";

import colors from '../../config/color';

function ErrorMessage({ error, visible }) {
  if (!visible || !error) return null;

  return (
    <Text style={styles.error}>{error}</Text>
  )
}

const styles = StyleSheet.create({
  error: {
    marginTop: 10,
    fontSize: 13,
    color: colors.danger
  }
})

export default ErrorMessage;
