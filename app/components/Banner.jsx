import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

function Banner({ path_image }) {
  return (
    <ImageBackground
      source={{ uri: `https://image.tmdb.org/t/p/w1280/${path_image}` }}
      style={styles.banner}
    ></ImageBackground>
  );
}

const styles = StyleSheet.create({
  banner: {
    width: "100%",
    height: 300,
    maxHeight: "60%",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundAttachment: "fixed",
    marginTop: 60,
  },
});

export default Banner;
