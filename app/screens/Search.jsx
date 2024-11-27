import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  FlatList,
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
    return <Text style={styles.loading}>Carregando...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>Erro: {error}</Text>;
  }

  return (
    <View style={styles.search}>
      <Text style={styles.title}>Buscar</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquise filmes"
        value={query}
        onChangeText={handleInputChange}
        onSubmitEditing={handleSearch}
      />

      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.movie}
            onPress={() => handleMovieClick(item.id)}
          >
            <ImageBackground
              source={{
                uri: `https://image.tmdb.org/t/p/w200${item.poster_path}`,
              }}
              style={styles.image}
              imageStyle={styles.imageBackground}
            />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.movieList}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
  movieList: {
    alignItems: "center",
  },
  loading: {
    fontSize: 18,
    textAlign: "center",
  },
  error: {
    fontSize: 18,
    textAlign: "center",
    color: "red",
  },
});

export default Search;
