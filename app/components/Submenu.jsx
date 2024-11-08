import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

function Submenu({ setActivePage }) {
  const [activeLink, setActiveLink] = useState("detail");

  const handleClick = (page) => {
    setActivePage(page);
    setActiveLink(page);
  };

  return (
    <View style={styles.submenu}>
      <View style={styles.items}>
        <TouchableOpacity
          onPress={() => handleClick("detail")}
          style={[styles.button, activeLink === "detail" && styles.active]}
        >
          <Text style={styles.buttonText}>Sobre o filme</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleClick("checkout")}
          style={[styles.button, activeLink === "checkout" && styles.active]}
        >
          <Text style={styles.buttonText}>Assistir</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  submenu: {
    paddingHorizontal: 16,
    marginHorizontal: "auto",
    position: "absolute",
    top: 362,
    zIndex: 10,
    backgroundColor: "#0c0f0a",
    width: "100%",
  },
  items: {
    flexDirection: "row",
    width: "100%", 
  },
  button: {
    fontSize: 18,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    borderBottomWidth: 2,
    borderBottomColor: "#d9d9d9",
    flex: 1, 
    alignItems: "center", 
  },
  buttonText: {
    color: "#fefefe",
  },
  active: {
    borderBottomWidth: 2,
    borderBottomColor: "#f79e44",
  },
});

export default Submenu;
