import { useState, useCallback } from "react";
import { saveCheckout, updateSeatingData } from "../services/checkoutService";
import AsyncStorage from "@react-native-async-storage/async-storage";

function useCheckout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const submitCheckout = useCallback(async (reservation, seatingData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const storedUser = await AsyncStorage.getItem("user");
      const parsedUser = JSON.parse(storedUser);

      if (!parsedUser?.id) {
        throw new Error("Usuário não encontrado no armazenamento.");
      }

      const userId = parsedUser.id;

      await saveCheckout(userId, reservation);
      await updateSeatingData(
        reservation.movieId,
        reservation.screeningId,
        seatingData
      );

      setSuccess(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return { submitCheckout, loading, error, success };
}

export default useCheckout;
