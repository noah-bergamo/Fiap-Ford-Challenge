import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { navigationConstants } from "./constants";
import SelectUserScreen from "../screens/selectUserScreen";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <AuthStack.Navigator
      initialRouteName={navigationConstants.SCREENS.SELECT_USER}
      screenOptions={{ headerShown: false }}
    >
      <AuthStack.Screen
        name={navigationConstants.SCREENS.SELECT_USER}
        component={SelectUserScreen}
      />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;
