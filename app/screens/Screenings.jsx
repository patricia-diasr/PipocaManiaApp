import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAllMovieScreenings } from "../services/screeningsService";

function Screenings() {
  const navigation = useNavigation();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleMovieClick = (movieId) => {
    navigation.navigate("MovieScreenings", { id: movieId });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await getAllMovieScreenings();
        setMovies(moviesData);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <Text style={styles.loading}>Carregando filmes...</Text>;
  }

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
  loading: {
    color: "#fefefe",
    textAlign: "center",
    fontSize: 18,
    marginTop: 20,
  },
});

export default Screenings;
