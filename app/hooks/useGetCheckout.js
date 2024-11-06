import { useState, useEffect } from "react";
import { getCheckout } from "../services/checkoutService";

function useGetCheckout(user) {
    const [tickets, setTickets] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCheckout = async () => {
            try {
                const tickets = await getCheckout(user);
                setTickets(tickets);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCheckout();
    }, [user]);

    return { tickets, error, loading };
}

export default useGetCheckout;
