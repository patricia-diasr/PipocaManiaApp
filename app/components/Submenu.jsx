import React, { useState } from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";

function Submenu({ setActivePage, routes }) {
  const [activeLink, setActiveLink] = useState(routes[0]?.page || "");

  const handleClick = (page) => {
    setActivePage(page);
    setActiveLink(page);
  };

  return (
    <View style={styles.submenu}>
      <View style={styles.items}>
        {routes.map((route) => (
          <TouchableOpacity
            key={route.page}
            onPress={() => handleClick(route.page)}
            style={[styles.button, activeLink === route.page && styles.active]}
          >
            <Text style={styles.buttonText}>{route.label}</Text>
          </TouchableOpacity>
        ))}
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
