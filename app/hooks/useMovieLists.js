import { useState, useEffect } from "react";
import { getUserMovieLists } from "../services/listService";

function useMovieLists(user) {
    const [watchlist, setWatchlist] = useState(null);
    const [myReviews, setMyReviews] = useState(null);

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieLists = async () => {
            try {
                const userData = await getUserMovieLists(user);

                setWatchlist(userData.watchlist || []);
                setMyReviews(userData.myReviews || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieLists();
    }, [user]);

    return { watchlist, myReviews, error, loading };
}

export default useMovieLists;
