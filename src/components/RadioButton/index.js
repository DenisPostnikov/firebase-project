import React, { useState } from 'react';
import { View, Text, Pressable, StyleSheet } from 'react-native';

import colors from '../../config/color';

const RadioButton = ({ data, defaultValue, onSelect }) => {
  const [option, setOption] = useState(defaultValue);

  const onPress = (item) => {
    setOption(item.value);
    onSelect(item.value);
  }

  return (
    <View style={styles.wrap}>
      {data.map((item) => {
        return (
          <Pressable
            key={item.id}
            onPress={() => onPress(item)}
            style={[
              styles.item,
              option === item.value ? styles.selected : styles.unselected
            ]}
          >
            <Text>{item.value}</Text>
          </Pressable>
        )
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
  },
  selected: {
    borderColor: colors.secondary,
  },
  unselected: {
    borderColor: colors.lightGray,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
})

export default RadioButton;
