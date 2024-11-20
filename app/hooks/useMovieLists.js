import { useState, useEffect, useCallback } from "react";
import { getUserMovieLists } from "../services/listService";

function useMovieLists(user) {
  const [watchlist, setWatchlist] = useState(null);
  const [myReviews, setMyReviews] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchMovieLists = useCallback(async () => {
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
    fetchMovieLists(); 
  }, [user, fetchMovieLists]);

  return { watchlist, myReviews, error, loading, fetchMovieLists };
}

export default useMovieLists;
