import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { navigationConstants } from "./constants";
import { CategoriesListScreen } from "../screens";
import CategoryDetailScreen from "../screens/categoryDetailsScreen";
import RewardDetailsScreen from "../screens/RewardDetailsScreen";

const CatalogStack = createNativeStackNavigator();

const CatalogNavigator = () => {
  return (
    <CatalogStack.Navigator
      initialRouteName={navigationConstants.SCREENS.CATEGORIES_LIST}
      screenOptions={{ headerShown: false }}
    >
      <CatalogStack.Screen
        name={navigationConstants.SCREENS.CATEGORIES_LIST}
        component={CategoriesListScreen}
      />
      <CatalogStack.Screen
        name={navigationConstants.SCREENS.CATEGORY_DETAILS}
        component={CategoryDetailScreen}
      />
      <CatalogStack.Screen
        name={navigationConstants.SCREENS.REWARD_DETAILS}
        component={RewardDetailsScreen}
      />
    </CatalogStack.Navigator>
  );
};

export default CatalogNavigator;
