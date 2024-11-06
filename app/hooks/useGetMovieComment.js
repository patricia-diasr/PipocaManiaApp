import { useState, useEffect } from "react";
import { getMovieCommentByUser } from "../services/commentsService";

function useGetMovieComment(user, movie) {
    const [review, setReview] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieReview = async () => {
            try {
                const fetchedReview = await getMovieCommentByUser(user, movie);
                setReview(fetchedReview);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchMovieReview();
    }, [user, movie]);

    return { review, error, loading };
}

export default useGetMovieComment;
