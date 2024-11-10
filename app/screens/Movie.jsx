import { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { ScrollView, Text, ActivityIndicator, StyleSheet } from "react-native";

import Submenu from "../components/Submenu";
import Banner from "../components/Banner";

import useMovieDetails from "../hooks/useMovieDetails";
import useMovieScreenings from "../hooks/useMovieScreenings";

import MovieDetail from "./MovieDetail";
import MovieCheckout from "./MovieCheckout";

function Movie() {
  const route = useRoute();
  const { id } = route.params;
  const [activePage, setActivePage] = useState("detail");

  const {
    movieDetails,
    movieCredits,
    movieComments,
    errorMovie,
    loadingMovie,
  } = useMovieDetails(id);
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

      <Submenu setActivePage={setActivePage} />

      {activePage === "detail" ? (
        movieDetails ? (
          <MovieDetail
            movieId={id}
            movieDetails={movieDetails}
            movieCredits={movieCredits}
            movieComments={movieComments}
          />
        ) : (
          <Text style={styles.warning}>Detalhes do filme não disponíveis.</Text>
        )
      ) : (
        <MovieCheckout
          screenings={screenings}
          movieName={movieDetails?.title}
          id={id}
        />
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
    marginVertical: 20,
    fontSize: 16,
  },
});

export default Movie;
