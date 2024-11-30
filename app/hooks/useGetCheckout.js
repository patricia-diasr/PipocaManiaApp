import { useState, useEffect, useCallback } from "react";
import { getCheckout } from "../services/checkoutService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useGetCheckout() {
  const [tickets, setTickets] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCheckout = useCallback(async () => {
    try {
      setLoading(true);

      const storedUser = await AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);

      if (!parsedUser?.id) {
        throw new Error("Usuário não encontrado no armazenamento.");
      }

      const userId = parsedUser.id;

      const tickets = await getCheckout(userId);
      setTickets(tickets);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCheckout();
  }, [fetchCheckout]);

  return { tickets, error, loading, fetchCheckout };
}

export default useGetCheckout;
