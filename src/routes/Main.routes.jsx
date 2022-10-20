import React from "react";
import { navigationConstants } from "./constants";
import Header from "../components/header";
import CatalogNavigator from "./Catalog.routes";
import HistoryNavigator from "./History.routes";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Colors } from "../utils/colors";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from "react-native";
import Title from "../components/title";

const TabBar = createBottomTabNavigator();
const MainNavigator = () => {
  return (
    <TabBar.Navigator
      initialRouteName={navigationConstants.STACKS.CATALOG}
      screenOptions={{ header: () => <Header /> }}
    >
      <TabBar.Screen
        name={navigationConstants.STACKS.CATALOG}
        component={CatalogNavigator}
        options={{
          title: "Resgatar",
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
          tabBarActiveTintColor: Colors.MAIN,
          tabBarLabel: ({ focused, color, position }) => (
            <Title color={color}>Resgatar</Title>
          ),
        }}
      />
      <TabBar.Screen
        name={navigationConstants.STACKS.HISTORY}
        component={HistoryNavigator}
        options={{
          title: "Meus cupons",
          tabBarIconStyle: { display: "none" },
          tabBarLabelPosition: "beside-icon",
          tabBarActiveTintColor: Colors.MAIN,
          tabBarLabel: ({ focused, color, position }) => (
            <Title color={color}>Meus Cupons</Title>
          ),
        }}
      />
    </TabBar.Navigator>
  );
};
export default MainNavigator;
