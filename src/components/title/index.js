import { Text } from "react-native";
import React from "react";
import { Fonts } from "../../utils/fonts";
import { Colors } from "../../utils/colors";

const Title = ({ children, size, color, medium, style, ...rest }) => {
  return (
    <Text
      style={[
        {
          fontFamily: medium ? Fonts.MEDIUM : Fonts.BOLD,
          fontSize: size || 16,
          color: color || Colors.MAIN,
        },
        style,
      ]}
      {...rest}
    >
      {children}
    </Text>
  );
};

export default Title;
