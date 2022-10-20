import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthNavigator from "./Auth.routes";
import MainNavigator from "./Main.routes";

const AppNavigator = () => {
  const userState = useSelector((state) => state.user);

  return (
    <NavigationContainer>
      {userState.user ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
