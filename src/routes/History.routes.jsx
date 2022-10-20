import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { navigationConstants } from "./constants";
import HistoryScreen from "../screens/historyScreen";

const HistoryStack = createNativeStackNavigator();

const HistoryNavigator = () => {
  return (
    <HistoryStack.Navigator
      initialRouteName={navigationConstants.SCREENS.REWARDS_HISTORY}
      screenOptions={{ headerShown: false }}
    >
      <HistoryStack.Screen
        name={navigationConstants.SCREENS.REWARDS_HISTORY}
        component={HistoryScreen}
      />
    </HistoryStack.Navigator>
  );
};

export default HistoryNavigator;
