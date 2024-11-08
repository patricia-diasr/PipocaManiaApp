import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function MovieList({ title, list }) {
  const navigation = useNavigation();

  const handleMovieClick = (movieId) => {
    navigation.navigate("Movie", { id: movieId });
  };

  return (
    <View style={styles.movieList}>
      <View style={styles.line}>
        <Text style={styles.title}>{title}</Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.movies}
      >
        {list.map((movie, index) => (
          <TouchableOpacity
            key={index}
            style={styles.movie}
            onPress={() => handleMovieClick(movie.id)}
          >
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w200${movie.poster_path}`,
              }}
              style={styles.image}
              imageStyle={styles.imageBackground}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  movieList: {
    flexDirection: "column",
    marginVertical: 20,
    marginLeft: 10,
  },
  line: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#fefefe",
  },
  movies: {
    flexDirection: "row",
    gap: 8,
    maxWidth: "100%",
  },
  movie: {
    width: 154,
    height: 231,
    borderRadius: 10,
    overflow: "hidden",
    marginRight: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    resizeMode: "cover",
  },
});

export default MovieList;
