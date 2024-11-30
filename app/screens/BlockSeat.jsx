import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import Seatmap from "../components/Seatmap";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updateSeatingData } from "../services/checkoutService";

function BlockSeat() {
  const route = useRoute();
  const navigation = useNavigation();
  const { movieId, screeningId, seatingData: initialSeatingData } = route.params;
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seatingData, setSeatingData] = useState(initialSeatingData);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const hasChanges =
      JSON.stringify(initialSeatingData) !== JSON.stringify(seatingData);
    setIsFormValid(hasChanges);
  }, [seatingData, initialSeatingData]);

  const handleSeatSelection = (seat) => {
    if (seat.status === "booked") return;

    setSeatingData((prevSeats) =>
      prevSeats.map((row) =>
        row.map((s) =>
          s && s.position === seat.position
            ? {
                ...s,
                status: selectedSeats.includes(seat.position)
                  ? "available"
                  : "selected",
              }
            : s
        )
      )
    );

    setSelectedSeats((prevSeats) =>
      prevSeats.includes(seat.position)
        ? prevSeats.filter((pos) => pos !== seat.position)
        : [...prevSeats, seat.position]
    );
  };

  const handleSubmit = async () => {
    if (!isFormValid) {
      return;
    }
    try {
      await updateSeatingData(movieId, screeningId, seatingData);
      Alert.alert("Sucesso!", "Os assentos foram bloqueados com sucesso.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Screenings"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro ao bloquear os assentos. Por favor, tente novamente."
      );
    }
  };

  return (
    <View style={styles.blockSeat}>
      <View style={styles.section}>
        <Text style={styles.heading}>Selecione os assentos</Text>
        <Seatmap seatingData={seatingData} onSeatSelect={handleSeatSelection} />
        <TouchableOpacity
          onPress={handleSubmit}
          style={[styles.submitButton, !isFormValid && styles.disabledButton]}
        >
          <Text style={styles.submitButtonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  blockSeat: {
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingTop: 76,
    paddingBottom: 60,
    backgroundColor: "#0c0f0a",
  },
  section: {
    marginBottom: 50,
  },
  heading: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fefefe",
  },
  submitButton: {
    display: "flex",
    marginVertical: 16,
    width: "100%",
    paddingVertical: 8,
    backgroundColor: "#6644b8",
    borderRadius: 32,
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 18,
    color: "#fefefe",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#6644b8",
    opacity: 0.6,
  },
});

export default BlockSeat;
