import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Lists from "../screens/Lists";
import Movie from "../screens/Movie";
import { StyleSheet } from "react-native";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={Home} />
      <Stack.Screen name="Movie" component={Movie} />
    </Stack.Navigator>
  );
}

function TicketsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="TicketsScreen" component={Tickets} />
      <Stack.Screen name="Movie" component={Movie} />
    </Stack.Navigator>
  );
}

function ListsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ListsScreen" component={Lists} />
      <Stack.Screen name="Movie" component={Movie} />
    </Stack.Navigator>
  );
}

function Menu() {
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
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f79e44",
        tabBarInactiveTintColor: "#6644b8",
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="Ingressos"
        component={TicketsStack}
        options={{ tabBarLabel: "Ingressos" }}
      />
      <Tab.Screen
        name="Minhas Listas"
        component={ListsStack}
        options={{ tabBarLabel: "Minhas Listas" }}
      />
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
