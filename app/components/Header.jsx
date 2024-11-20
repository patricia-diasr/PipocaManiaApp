import React from "react";
import { View, Image, StyleSheet, TouchableOpacity, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { logout } from "../services/authenticationService";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

function Header() {
  const navigation = useNavigation();
  const { loadUserData, isLoggedIn } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert("Logout", "Logout realizado com sucesso!");
      loadUserData();
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.header}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
      {isLoggedIn && (
        <TouchableOpacity onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#17082a",
    paddingHorizontal: 15,
    paddingTop: 10,
    zIndex: 10,
  },
  logo: {
    width: 150,
    height: 50,
  },
});

export default Header;
