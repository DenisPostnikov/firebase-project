import React from "react";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default ({ name, size, color, props }) => {
  return (
    <FontAwesome5
      name={name}
      size={size}
      color={color}
      {...props}
    />
  );
}
