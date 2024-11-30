import { useState, useEffect } from "react";
import { getMovieCommentByUser } from "../services/commentsService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useGetMovieComment(movie) {
  const [review, setReview] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovieReview = async () => {
      try {
        const storedUser = await AsyncStorage.getItem("user");
        const parsedUser = JSON.parse(storedUser);

        if (!parsedUser?.id) {
          throw new Error("Usuário não encontrado no armazenamento.");
        }

        const userId = parsedUser.id;

        const fetchedReview = await getMovieCommentByUser(userId, movie);
        setReview(fetchedReview);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieReview();
  }, [movie]); 

  return { review, error, loading };
}

export default useGetMovieComment;
