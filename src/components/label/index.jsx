import { View, Text } from "react-native";
import React from "react";
import { Fonts } from "../../utils/fonts";
import { Colors } from "../../utils/colors";

const Label = ({ children, color, size, ...rest }) => {
  return (
    <Text
      style={{
        fontFamily: Fonts.REGULAR,
        color: color || Colors.MAIN,
        fontSize: size || 14,
      }}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Label;
