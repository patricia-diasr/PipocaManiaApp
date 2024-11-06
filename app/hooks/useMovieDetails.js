import { useState, useEffect } from "react";
import { getMovieDetails, getMovieCredits } from "../services/movieService";
import { getMovieComments } from "../services/commentsService";

function useMovieDetails(id) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [movieCredits, setMovieCredits] = useState(null);
    const [movieComments, setMovieComments] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const details = await getMovieDetails(id);
                const credits = await getMovieCredits(id);
                const comments = await getMovieComments(id);

                setMovieDetails(details);
                setMovieCredits(credits);
                setMovieComments(comments);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            fetchMovieDetails();
        }
    }, [id]);

    return { movieDetails, movieCredits, movieComments, error, loading };
}

export default useMovieDetails;
