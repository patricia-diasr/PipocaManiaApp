import { useState } from "react";
import { saveCheckout, updateSeatingData } from "../services/checkoutService";

function useCheckout() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submitCheckout = async (user, reservation, seatingData) => {
        setLoading(true);
        setError(null);
        setSuccess(false);
        try {
            await saveCheckout(user, reservation);
            await updateSeatingData(reservation.movieId, reservation.screeningId, seatingData);
            setSuccess(true);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return { submitCheckout, loading, error, success };
}

export default useCheckout;
