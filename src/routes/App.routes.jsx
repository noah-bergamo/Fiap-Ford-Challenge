import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { navigationConstants } from "./constants";
import { CategoriesListScreen } from "../screens";
import CategoryDetailScreen from "../screens/categoryDetailsScreen";
import RewardDetailsScreen from "../screens/RewardDetailsScreen";
import Header from "../components/header";

const AppStack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppStack.Navigator
        initialRouteName={navigationConstants.SCREENS.CATEGORIES_LIST}
        screenOptions={{ header: () => <Header /> }}
      >
        <AppStack.Screen
          name={navigationConstants.SCREENS.CATEGORIES_LIST}
          component={CategoriesListScreen}
        />
        <AppStack.Screen
          name={navigationConstants.SCREENS.CATEGORY_DETAILS}
          component={CategoryDetailScreen}
        />
        <AppStack.Screen
          name={navigationConstants.SCREENS.REWARD_DETAILS}
          component={RewardDetailsScreen}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
