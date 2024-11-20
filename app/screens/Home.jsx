import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl
} from "react-native";
import Banner from "../components/Banner";
import MovieList from "../components/MovieList";
import useMovieSugestions from "../hooks/useMovieSugestions";

function Home() {
  const { upcomingMovies, error, loading, fetchMovieDetails } = useMovieSugestions(); 
  const [refreshing, setRefreshing] = useState(false); 


  const showingNow = [
    { id: "1022789", poster_path: "/hGTxHEDQBa6AAuGWDrTpbJjEO0w.jpg" },
    { id: "917496", poster_path: "/qhwYf4lHJsUyXFKEUKpt93yttJp.jpg" },
    { id: "587563", poster_path: "/zk2d0w7XrK9xvBtFiERr0HJoGuL.jpg" },
    { id: "698687", poster_path: "/cuFhVLPJ9zC06EMV5XAKNNRJtC4.jpg" },
    { id: "889737", poster_path: "/ud3gcdKienuJcViF2tZrIAbGOW8.jpg" },
  ];
  
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
      <Banner path_image="p5ozvmdgsmbWe0H8Xk7Rc8SCwAB.jpg" />
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
