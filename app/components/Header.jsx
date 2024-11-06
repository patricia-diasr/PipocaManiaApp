import React from "react";
import { View, Image, StyleSheet } from "react-native";

function Header() {
  return (
    <View style={styles.header}>
      <Image source={require("../assets/logo.png")} style={styles.logo} />
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
