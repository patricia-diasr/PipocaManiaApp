import { useState } from "react";
import { saveComment } from "../services/commentsService";
import { addMovieReviewList } from "../services/listService";

function useNewReview() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitReview = async (userId, movieId, comment, review) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await saveComment(movieId, comment);
            await addMovieReviewList(userId, review);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { submitReview, loading, error, success };
}

export default useNewReview;
