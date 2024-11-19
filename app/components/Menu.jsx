import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Home from "../screens/Home";
import Tickets from "../screens/Tickets";
import Lists from "../screens/Lists";
import Movie from "../screens/Movie";
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

function AdminStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CheckTickets" component={CheckTickets} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Screenings" component={Screenings} />
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
  const [profile, setProfile] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setIsLoggedIn(true);
          const storedProfile = JSON.parse(user).role;  
          setProfile(storedProfile);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.log("Erro ao verificar login:", error);
        setIsLoggedIn(false);
      }
    };

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
          // Set iconName for different tabs
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
            component={HomeStack} // This will correctly show the Home screen in the stack
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
            name="CheckTickets"
            component={AdminStack}
            options={{ tabBarLabel: "Ingressos" }}
          />
          <Tab.Screen
            name="Search"
            component={AdminStack}
            options={{ tabBarLabel: "Buscar" }}
          />
          <Tab.Screen
            name="Screenings"
            component={AdminStack}
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
