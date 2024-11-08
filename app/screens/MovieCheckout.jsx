import React from "react";
import { View, Text, StyleSheet } from "react-native";

function MovieCheckout({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Movie Checkout</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
  },
});

export default MovieCheckout;
