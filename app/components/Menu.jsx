import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import { useAuth } from "../context/AuthContext";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Lists from "../screens/Lists";
import Movie from "../screens/Movie";
import MovieScreenings from "../screens/MovieScreenings";
import CheckTickets from "../screens/CheckTickets";
import Search from "../screens/Search";
import Screenings from "../screens/Screenings";
import Login from "../screens/Login";
import Signup from "../screens/Signup";

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

function SearchStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SearchScreen" component={Search} />
      <Stack.Screen name="MovieScreenings" component={MovieScreenings} />
    </Stack.Navigator>
  );
}

function CheckTicketsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CheckTicketsScreen" component={CheckTickets} />
    </Stack.Navigator>
  );
}

function ScreeningsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ScreeningsScreen" component={Screenings} />
      <Stack.Screen name="MovieScreenings" component={MovieScreenings} />
    </Stack.Navigator>
  );
}

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

function Menu() {
  const { isLoggedIn, profile, loadUserData } = useAuth();

  useEffect(() => {
    loadUserData();
  }, []);

  if (isLoggedIn === null) {
    return <Text>Carregando...</Text>;
  }

  if (!isLoggedIn) {
    return <AuthStack />;
  }

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Ingressos") iconName = "ticket";
          else if (route.name === "Minhas Listas") iconName = "bookmark";
          else if (route.name === "CheckTickets") iconName = "ticket";
          else if (route.name === "Search") iconName = "search";
          else if (route.name === "Screenings") iconName = "film";

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#f79e44",
        tabBarInactiveTintColor: "#6644b8",
        tabBarStyle: styles.tabBar,
        headerShown: false,
      })}
    >
      {profile === "client" ? (
        <>
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
        </>
      ) : (
        <>
          <Tab.Screen
            name="Search"
            component={SearchStack}
            options={{ tabBarLabel: "Buscar" }}
          />
          <Tab.Screen
            name="CheckTickets"
            component={CheckTicketsStack}
            options={{ tabBarLabel: "Ingressos" }}
          />
          <Tab.Screen
            name="Screenings"
            component={ScreeningsStack}
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
