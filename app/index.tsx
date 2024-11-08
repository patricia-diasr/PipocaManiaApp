import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Menu from "./components/Menu";
import Header from "./components/Header";

export default function Index() {
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        <Header />
        <Menu />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
