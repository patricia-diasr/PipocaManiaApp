import { useState, useEffect, useCallback } from "react";
import { getUserMovieLists } from "../services/listService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useMovieLists() {
  const [user, setUser] = useState(null); 
  const [watchlist, setWatchlist] = useState(null);
  const [myReviews, setMyReviews] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = useCallback(async () => {
    try {
      const storedUser = await AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser?.id) {
        setUser(parsedUser.id);
      } else {
        throw new Error("Usuário não encontrado");
      }
    } catch (err) {
      setError(err.message);
      setLoading(false); 
    }
  }, []);

  const fetchMovieLists = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      const userData = await getUserMovieLists(user);
      setWatchlist(userData.watchlist || []);
      setMyReviews(userData.myReviews || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    fetchMovieLists();
  }, [user, fetchMovieLists]);

  return { watchlist, myReviews, error, loading, fetchMovieLists };
}

export default useMovieLists;
