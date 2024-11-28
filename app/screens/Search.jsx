import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import useSearchMovies from "../hooks/useSearchMovies";

function Search() {
  const [query, setQuery] = useState("");
  const { movies, error, loading } = useSearchMovies(query);

  const navigation = useNavigation();

  const handleMovieClick = (movieId) => {};

  const handleInputChange = (text) => {
    setQuery(text);
  };

  const handleSearch = () => {
    if (query.trim() === "") return;
  };

  if (loading) {
    return <Text style={styles.warning}>Carregando...</Text>;
  }

  if (error) {
    return <Text style={styles.warning}>Erro: {error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.search}>
        <Text style={styles.title}>Buscar</Text>

        <TextInput
          style={styles.input}
          placeholder="Pesquise filmes"
          value={query}
          onChangeText={handleInputChange}
          onSubmitEditing={handleSearch}
        />

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
  search: {
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
  input: {
    height: 40,
    backgroundColor: "#fefefe",
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 8,
    marginBottom: 20,
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
  warning: {
    textAlign: "center",
    marginVertical: 70,
    fontSize: 16,
  },
});

export default Search;
