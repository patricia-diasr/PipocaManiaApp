import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, ActivityIndicator, StyleSheet } from "react-native";

import Submenu from "../components/Submenu";
import Banner from "../components/Banner";

import useMovieDetails from "../hooks/useMovieDetails";
import useMovieScreenings from "../hooks/useMovieScreenings";

import ListScreenings from "./ListScreenings";
import NewScreenings from "./NewScreening";

function MovieScreenings() {
  const route = useRoute();
  const { id } = route.params;
  const [activePage, setActivePage] = useState("list");
  const routes = [
    { page: "list", label: "Sessões" },
    { page: "add", label: "Adicionar" },
  ];

  const { movieDetails, errorMovie, loadingMovie } = useMovieDetails(id);
  const { screenings, errorScreening, loadingScreening } =
    useMovieScreenings(id);

  if (loadingMovie || loadingScreening) {
    return (
      <ActivityIndicator size="large" color="#0000ff" style={styles.center} />
    );
  }

  if (errorMovie || errorScreening) {
    return <Text style={styles.warning}>Erro carregando informações</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      {movieDetails?.backdrop_path && (
        <Banner path_image={movieDetails.backdrop_path} />
      )}

      <Submenu setActivePage={setActivePage} routes={routes} />

      {activePage === "list" ? (
        movieDetails && screenings ? (
          <ListScreenings movieId={id} screenings={screenings} />
        ) : (
          <Text style={styles.warning}>
            Não há sessões disponíveis para esse filme.
          </Text>
        )
      ) : (
        <NewScreenings movieId={id} />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f0a",
  },
  warning: {
    color: "#fefefe",
    textAlign: "center",
    marginTop: 80,
    fontSize: 16,
  },
});

export default MovieScreenings;
