import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from "react-native";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import useMovieSugestions from "../hooks/useMovieSugestions";

function Home() {
  const { upcomingMovies, showingNow, error, loading, fetchMovieDetails } =
    useMovieSugestions();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchMovieDetails();
    setRefreshing(false);
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.warning} size="large" color="#f79e44" />
    );
  }

  if (error) {
    return <Text style={styles.warning}>Erro: {error}</Text>;
  }

  if (!upcomingMovies) {
    return (
      <Text style={styles.warning}>Próximos lançamentos não encontrados.</Text>
    );
  }

  return (
    <ScrollView
      style={styles.home}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Banner path_image="/uKb22E0nlzr914bA9KyA5CVCOlV.jpg" />
      <View style={styles.section}>
        <MovieList list={showingNow} title="Em Cartaz" />
        <MovieList list={upcomingMovies} title="Próximos Lançamentos" />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  home: {
    backgroundColor: "#0c0f0a",
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 70,
  },
  warning: {
    color: "#fefefe",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
});

export default Home;
