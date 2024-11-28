import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";

function Screenings() {
  const handleMovieClick = (movieId) => {};

  const movies = [
    { id: "1022789", poster_path: "/hGTxHEDQBa6AAuGWDrTpbJjEO0w.jpg" },
    { id: "917496", poster_path: "/qhwYf4lHJsUyXFKEUKpt93yttJp.jpg" },
    { id: "587563", poster_path: "/zk2d0w7XrK9xvBtFiERr0HJoGuL.jpg" },
    { id: "698687", poster_path: "/cuFhVLPJ9zC06EMV5XAKNNRJtC4.jpg" },
    { id: "889737", poster_path: "/ud3gcdKienuJcViF2tZrIAbGOW8.jpg" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.screenings}>
        <Text style={styles.title}>Sessões</Text>

        <View style={styles.movieList}>
          {movies.map((movie) => (
            <TouchableOpacity
              key={movie.id}
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
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  screenings: {
    backgroundColor: "#0c0f0a",
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 84,
    paddingBottom: 70,
  },
  title: {
    marginVertical: 16,
    fontSize: 24,
    color: "#fefefe",
    textAlign: "center",
  },
  movieList: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  movie: {
    width: 154,
    height: 231,
    borderRadius: 10,
    overflow: "hidden",
    margin: 8,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  imageBackground: {
    resizeMode: "cover",
  },
});

export default Screenings;
