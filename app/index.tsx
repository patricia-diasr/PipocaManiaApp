import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import Menu from "./components/Menu";
import Header from "./components/Header";

export default function Index() {
  return (
    <>
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
