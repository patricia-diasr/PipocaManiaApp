import React from "react";
import { ScrollView, StyleSheet, StatusBar, Platform } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import Menu from "./components/Menu";
import Header from "./components/Header";

export default function Index() {
  return (
    <>
      <StatusBar
        barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        backgroundColor={Platform.OS === "android" ? "#17082a" : "transparent"}
        translucent={Platform.OS === "android"}
      />
      <AuthProvider>
        <ScrollView contentContainerStyle={styles.container}>
          <Header />
          <Menu />
        </ScrollView>
      </AuthProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
