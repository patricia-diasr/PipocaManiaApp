import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Stars from "react-native-stars";
import Ionicons from "react-native-vector-icons/Ionicons";
import useGetMovieComment from "../hooks/useGetMovieComment";
import useNewReview from "../hooks/useNewReview";
import {
  searchWatchList,
  addMovieWatchList,
  removeMovieWatchList,
} from "../services/listService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function MovieDetail({ movieId, movieDetails, movieCredits, movieComments }) {
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  const { review: myReview, error, loading } = useGetMovieComment(movieId);
  const { submitReview, loadingComment, errorComment, success } =
    useNewReview();

  const [newReview, setNewReview] = useState({
    stars: 0,
    comment: "",
  });

  useEffect(() => {
    checkWatchlist();
  }, [movieId]);

  if (loading) {
    return <Text style={styles.warning}>Carregando avaliações...</Text>;
  }

  if (error) {
    return <Text style={styles.warning}>Erro ao carregar avaliações.</Text>;
  }

  if (!movieDetails) {
    return (
      <Text style={styles.warning}>Detalhes do filme não disponíveis.</Text>
    );
  }

  function ratingChanged(newRating) {
    setNewReview({ ...newReview, stars: newRating });
    setIsModalVisible(true);
  }

  async function checkWatchlist() {
    try {
      const inWatchlist = await searchWatchList(movieId);
      setIsInWatchlist(!!inWatchlist);
    } catch (error) {
      console.error("Erro ao verificar a lista de watchlist:", error);
    }
  }

  async function toggleWatchlist() {
    try {
      if (isInWatchlist) {
        await removeMovieWatchList(movieId);
        setIsInWatchlist(false);
      } else {
        await addMovieWatchList({
          id: movieId,
          poster_path: movieDetails.poster_path,
        });
        setIsInWatchlist(true);
      }
    } catch (error) {
      console.error("Erro ao atualizar a lista de watchlist:", error);
    }
  }

  const closeModal = () => setIsModalVisible(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const user = JSON.parse(await AsyncStorage.getItem("user"));

    try {
      const comment = {
        stars: newReview.stars,
        name: user.name,
        comment: newReview.comment,
      };

      const review = {
        id: movieId,
        poster_path: movieDetails.poster_path,
        stars: newReview.stars,
        comment: movieDetails.comment,
      };

      await submitReview(movieId, comment, review);
      closeModal();
      setNewReview({ stars: 0, comment: "" });
      navigation.navigate("Movie", { id: movieId });
    } catch (error) {
      console.error("Erro ao enviar avaliação:", error);
    }
  }

  const formatCurrency = (amount) => {
    const currencySymbol = "US$";
    if (amount >= 1_000_000_000) {
      return `${currencySymbol}${(amount / 1_000_000_000).toFixed(1)}B`;
    } else if (amount >= 1_000_000) {
      return `${currencySymbol}${(amount / 1_000_000).toFixed(1)}M`;
    } else if (amount >= 1_000) {
      return `${currencySymbol}${(amount / 1_000).toFixed(1)}K`;
    } else {
      return `${currencySymbol}${amount.toLocaleString()}`;
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("pt-BR", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
    }).format(date);
  }

  function formatRuntime(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  }

  function formatVote(vote) {
    const votePorcent = Math.floor(vote * 10);
    return `${votePorcent}%`;
  }

  const crewMap = new Map();
  movieCredits?.crew?.forEach((member) => {
    if (["Director", "Characters", "Writer"].includes(member.job)) {
      if (crewMap.has(member.name)) {
        crewMap.get(member.name).push(member.job);
      } else {
        crewMap.set(member.name, [member.job]);
      }
    }
  });

  const filmCreators = Array.from(crewMap, ([name, jobs]) => ({ name, jobs }));

  return (
    <ScrollView contentContainerStyle={styles.movieDetail}>
      <View style={styles.options}>
        <Stars
          default={myReview?.stars || 0}
          count={5}
          update={ratingChanged}
          fullStar={<Ionicons name="star" size={35} color="#ffd700" />}
          emptyStar={<Ionicons name="star-outline" size={35} color="#ffd700" />}
        />
        <TouchableOpacity onPress={toggleWatchlist}>
          <Ionicons
            name={isInWatchlist ? "bookmark" : "bookmark-outline"}
            size={35}
            color={isInWatchlist ? "#f79e44" : "#fefefe"}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.description}>
        <Text style={styles.title}>{movieDetails.title}</Text>
        <Text style={styles.synopsisLabel}>Sinopse</Text>
        <Text style={styles.synopsisText}>{movieDetails.overview}</Text>
      </View>

      <View style={styles.filmCreators}>
        {filmCreators.map((member, index) => (
          <View key={index} style={styles.filmCreator}>
            <Text style={styles.name}>{member.name}</Text>
            <Text style={styles.job}>{member.jobs.join(", ")}</Text>
          </View>
        ))}
      </View>

      <View style={styles.infoBox}>
        <View style={styles.infoLine}>
          <Ionicons name="star" size={25} color="#f79e44" />
          <Text style={styles.infoLineText}>
            <Text style={styles.strong}>Avaliação:</Text>{" "}
            {formatVote(movieDetails.vote_average)}
          </Text>
        </View>

        <View style={styles.infoLine}>
          <Ionicons name="time" size={25} color="#f79e44" />
          <Text style={styles.infoLineText}>
            <Text style={styles.strong}>Duração:</Text>{" "}
            {formatRuntime(movieDetails.runtime)}
          </Text>
        </View>

        <View style={styles.infoLine}>
          <Ionicons name="calendar" size={25} color="#f79e44" />
          <Text style={styles.infoLineText}>
            <Text style={styles.strong}>Lançamento:</Text>{" "}
            {formatDate(movieDetails.release_date)}
          </Text>
        </View>

        <View style={styles.infoLine}>
          <Ionicons name="cash" size={25} color="#f79e44" />
          <Text style={styles.infoLineText}>
            <Text style={styles.strong}>Orçamento:</Text>{" "}
            {formatCurrency(movieDetails.budget)}
          </Text>
        </View>

        <View style={styles.infoLine}>
          <Ionicons name="bar-chart" size={25} color="#f79e44" />
          <Text style={styles.infoLineText}>
            <Text style={styles.strong}>Receita:</Text>{" "}
            {formatCurrency(movieDetails.revenue)}
          </Text>
        </View>
      </View>

      <View style={styles.cast}>
        {movieCredits?.cast?.slice(0, 6).map((item, index) => (
          <View key={index} style={styles.person}>
            <Image
              source={{
                uri: `https://image.tmdb.org/t/p/w185${item.profile_path}`,
              }}
              style={styles.castImage}
            />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.jobCast}>{item.character}</Text>
          </View>
        ))}
      </View>

      <View style={styles.comments}>
        {movieComments.map((item, index) => (
          <View key={index} style={styles.comment}>
            <View style={styles.commentHeader}>
              <Text style={styles.commentName}>{item.name}</Text>
              <Stars
                default={item.stars}
                count={5}
                disabled={true}
                fullStar={<Ionicons name="star" size={25} color="#ffd700" />}
                emptyStar={
                  <Ionicons name="star-outline" size={25} color="#ffd700" />
                }
              />
            </View>
            <Text style={styles.commentDescription}>{item.comment}</Text>
          </View>
        ))}
      </View>

      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          onRequestClose={closeModal}
          transparent={true}
          animationType="fade"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Stars
                default={newReview?.stars || 0}
                count={5}
                update={(rating) =>
                  setNewReview({ ...newReview, stars: rating })
                }
                fullStar={<Ionicons name="star" size={35} color="#ffd700" />}
                emptyStar={
                  <Ionicons name="star-outline" size={35} color="#ffd700" />
                }
              />
              <Text style={styles.modalTitle}>Minha Avaliação</Text>
              <TextInput
                value={newReview.comment}
                onChangeText={(text) =>
                  setNewReview({ ...newReview, comment: text })
                }
                placeholder="Escreva sua avaliação aqui..."
                style={styles.textArea}
                multiline={true}
                numberOfLines={4}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity
                  style={[styles.button, styles.cancelButton]}
                  onPress={closeModal}
                >
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.button,
                    loadingComment && styles.buttonDisabled,
                  ]}
                  onPress={handleSubmit}
                  disabled={loadingComment}
                >
                  {loadingComment ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Salvar</Text>
                  )}
                </TouchableOpacity>
              </View>
              {errorComment && (
                <Text style={styles.warning}>{errorComment}</Text>
              )}
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  movieDetail: {
    padding: 16,
    flexGrow: 1,
    paddingBottom: 60,
  },
  options: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 60,
    marginBottom: 25,
  },
  description: {
    borderRadius: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fefefe",
    marginBottom: 20,
  },
  synopsisLabel: {
    fontSize: 18,
    color: "#fefefe",
    fontWeight: "bold",
    marginBottom: 15,
  },
  synopsisText: {
    fontSize: 16,
    color: "#fefefe",
  },
  infoBox: {
    backgroundColor: "#17082a",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  infoLine: {
    flexDirection: "row",
    alignItems: "center",
    color: "#fefefe",
    padding: 15,
  },
  infoLineText: {
    marginHorizontal: 15,
    fontSize: 16,
    color: "#fefefe",
  },
  strong: {
    fontWeight: "bold",
  },
  filmCreators: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginVertical: 16,
    color: "#fefefe",
  },
  filmCreator: {
    width: "45%",
    padding: 8,
  },
  cast: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },
  person: {
    width: "48%",
    alignItems: "center",
    marginBottom: 16,
  },
  castImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    objectFit: "cover",
  },
  name: {
    color: "#fefefe",
    fontWeight: "bold",
    marginTop: 8,
  },
  job: {
    color: "#fefefe",
    fontSize: 12,
  },
  jobCast: {
    color: "#fefefe",
    fontSize: 12,
    textAlign: "center",
  },
  comments: {
    marginTop: 32,
  },
  comment: {
    marginBottom: 20,
    backgroundColor: "#17082a",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 15,
  },
  commentHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  commentName: {
    fontWeight: "bold",
    color: "#fefefe",
  },
  commentDescription: {
    color: "#fefefe",
    fontSize: 14,
  },
  warning: {
    color: "#fefefe",
    textAlign: "center",
    marginVertical: 70,
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#17082a",
    paddingVertical: 50,
    paddingHorizonta: 20,
    borderRadius: 20,
    width: "95%",
    maxWidth: 500,
    alignItems: "center",
  },
  modalTitle: {
    marginTop: 30,
    fontSize: 18,
    color: "#fefefe",
  },
  textArea: {
    height: 150,
    borderColor: "#f79e44",
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginTop: 30,
    textAlignVertical: "top",
    backgroundColor: "#fefefe",
  },
  button: {
    backgroundColor: "#6644b8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    color: "#fefefe",
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    gap: 15,
  },
  cancelButton: {
    backgroundColor: "#555",
  },
});

export default MovieDetail;
