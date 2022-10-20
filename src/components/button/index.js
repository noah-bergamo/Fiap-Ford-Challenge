import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Colors } from "../../utils/colors";
import { Fonts } from "../../utils/fonts";

const Button = ({ label, onPress, style, inverse, disabled, ...rest }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        {
          backgroundColor: inverse ? disabled ? `${Colors.MAIN}80`:Colors.MAIN : Colors.WHITE,
          height: 56,
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
        },
        style,
      ]}
      {...rest}
    >
      <Text
        style={{
          fontSize: 16,
          fontFamily: Fonts.BOLD,
          color: inverse ? Colors.WHITE : Colors.MAIN,
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
