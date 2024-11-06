import React from "react";
import { View, StyleSheet } from "react-native";
import Banner from "../components/Banner";

function HomeScreen() {
  return (
    <View style={styles.container}>
      <Banner path_image="p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});

export default HomeScreen;
