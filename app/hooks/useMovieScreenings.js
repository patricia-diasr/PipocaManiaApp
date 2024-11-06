import { useState, useEffect } from "react";
import { getMovieScreenings } from "../services/screeningsService";

function useMovieScreenings(id) {
    const [screenings, setScreenings] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchScreenings = async () => {
            try {
                const screeningsData = await getMovieScreenings(id);
                setScreenings(screeningsData);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchScreenings();
        }
    }, [id]);

    return { screenings, error, loading };
}

export default useMovieScreenings;
