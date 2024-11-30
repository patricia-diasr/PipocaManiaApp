import React, { useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  RefreshControl,  
} from "react-native";
import MovieList from "../components/MovieList";
import useMovieLists from "../hooks/useMovieLists";

function Lists() {
  const { watchlist, myReviews, error, loading, fetchMovieLists } = useMovieLists(); 
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);  
    await fetchMovieLists();  
    setRefreshing(false); 
  };

  if (loading) {
    return (
      <ActivityIndicator style={styles.loading} size="large" color="#f79e44" />
    );
  }

  if (error) {
    return <Text style={styles.warning}>Erro: {error}</Text>;
  }

  if (!watchlist || !myReviews) {
    return <Text style={styles.warning}>Listas não encontradas.</Text>;
  }

  return (
    <ScrollView
      style={styles.lists}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
      }
    >
      <View style={styles.section}>
        <Text style={styles.title}>Minhas Listas</Text>
        {myReviews.length > 0 && (
          <MovieList list={myReviews} title="Minhas Avaliações" />
        )}
        {watchlist.length > 0 && (
          <MovieList list={watchlist} title="Quero Assistir" />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  lists: {
    backgroundColor: "#0c0f0a",
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 84,
    paddingBottom: 70,
    margin: "0 auto",
  },
  title: {
    marginVertical: 16,
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  warning: {
    color: "#fefefe",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
  loading: {
    marginVertical: 20,
  },
});

export default Lists;
