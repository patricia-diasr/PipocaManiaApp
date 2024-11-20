import { useState, useEffect, useCallback } from "react";
import { getCheckout } from "../services/checkoutService";

function useGetCheckout(user) {
  const [tickets, setTickets] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCheckout = useCallback(async () => {
    try {
      setLoading(true);  
      const tickets = await getCheckout(user);
      setTickets(tickets);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);  
    }
  }, [user]);

  useEffect(() => {
    fetchCheckout();  
  }, [user, fetchCheckout]);

  return { tickets, error, loading, fetchCheckout }; 
}

export default useGetCheckout;
