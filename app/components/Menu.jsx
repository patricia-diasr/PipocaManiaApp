import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import HomeScreen from "../screens/HomeScreen";
import TicketsScreen from "../screens/TicketsScreen";
import ListsScreen from "../screens/ListsScreen";
import SearchScreen from "../screens/SearchScreen";
import CheckTicketScreen from "../screens/CheckTicketScreen";
import ScreeningsScreen from "../screens/ScreeningsScreen";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();

function Menu() {
  const userRole = "client";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (route.name === "Ingressos") {
            iconName = "ticket";
          } else if (route.name === "Minhas Listas") {
            iconName = "bookmark";
          } else if (route.name === "Buscar") {
            iconName = "search";
          } else if (route.name === "Sessões") {
            iconName = "videocam";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f79e44",
        tabBarInactiveTintColor: "#6644b8",
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      {userRole === "client" && (
        <>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ tabBarLabel: "Home" }}
          />
          <Tab.Screen
            name="Ingressos"
            component={TicketsScreen}
            options={{ tabBarLabel: "Ingressos" }}
          />
          <Tab.Screen
            name="Minhas Listas"
            component={ListsScreen}
            options={{ tabBarLabel: "Minhas Listas" }}
          />
        </>
      )}
      {userRole === "admin" && (
        <>
          <Tab.Screen
            name="Buscar"
            component={SearchScreen}
            options={{ tabBarLabel: "Buscar" }}
          />
          <Tab.Screen
            name="Ingressos"
            component={CheckTicketScreen}
            options={{ tabBarLabel: "Ingressos" }}
          />
          <Tab.Screen
            name="Sessões"
            component={ScreeningsScreen}
            options={{ tabBarLabel: "Sessões" }}
          />
        </>
      )}
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "#0c0f0a",
    borderTopWidth: 2,
    borderTopColor: "#6644b8",
    height: 63,
    position: "absolute",
  },
});

export default Menu;
