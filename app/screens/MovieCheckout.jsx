import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import uuid from "react-native-uuid";
import Seatmap from "../components/Seatmap";
import useCheckout from "../hooks/useCheckout";

function MovieCheckout({ screenings, movieName, movieId }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedSession, setSelectedSession] = useState(null);
  const [tickets, setTickets] = useState({ full: 0, half: 0 });
  const [selectedSeats, setSelectedSeats] = useState([]);

  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [seatingData, setSeatingData] = useState([]);

  const [modalMessage, setModalMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [showModal, setShowModal] = useState(false);

  const { submitCheckout, loading, error, success } = useCheckout();

  const navigation = useNavigation();

  if (!screenings) {
    return <Text style={styles.warning}>Não há sessões disponíveis para esse filme</Text>;
  }

  useEffect(() => {
    if (screenings) {
      const dates = [...new Set(screenings.map((screening) => screening.date))];
      setAvailableDates(dates);
      if (dates.length > 0) {
        setSelectedDate(dates[0]);
      }
    }
  }, [screenings]);

  useEffect(() => {
    if (selectedDate && screenings) {
      const filteredScreenings = screenings.filter(
        (screening) => screening.date === selectedDate
      );

      const timesGrouped = filteredScreenings.reduce((acc, screening) => {
        const { time, type } = screening;
        if (!acc[type]) {
          acc[type] = [];
        }
        if (!acc[type].includes(time)) {
          acc[type].push(time);
        }
        return acc;
      }, {});

      const timesArray = Object.keys(timesGrouped).map((type) => ({
        type,
        options: timesGrouped[type],
      }));

      setAvailableTimes(timesArray);

      if (timesArray.length > 0 && timesArray[0].options.length > 0) {
        const initialTime = `${timesArray[0].options[0]} - ${timesArray[0].type}`;
        setSelectedTime(initialTime);
        setSelectedOption(initialTime);
      }
    }
  }, [selectedDate, screenings]);

  useEffect(() => {
    if (selectedDate && selectedTime && screenings) {
      const selectedScreening = screenings.find((screening) => {
        const [time, type] = selectedTime.split(" - ");
        return (
          screening.date === selectedDate &&
          screening.time === time &&
          screening.type === type
        );
      });

      if (selectedScreening) {
        setSelectedSession(selectedScreening.id);
        setSeatingData(selectedScreening.seats || []);
        setSelectedSeats([]);
      }
    }
  }, [selectedDate, selectedTime, screenings]);

  const closeModal = () => {
    setShowModal(false);
    navigation.navigate("Ingressos")
  }
  
  const handleDateChange = (date) => setSelectedDate(date);

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    setSelectedOption(time);
  };

  const handleTicketChange = (type, action) => {
    setTickets((prevTickets) => {
      const newValue =
        action === "increment"
          ? prevTickets[type] + 1
          : prevTickets[type] > 0
          ? prevTickets[type] - 1
          : 0;
      return { ...prevTickets, [type]: newValue };
    });
  };

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

    const reservation = {
      checkoutId: uuid.v4(),
      movieName: movieName,
      movieId: movieId,
      screeningId: selectedSession,
      date: selectedDate,
      time: selectedTime,
      tickets,
      selectedSeats,
      status: true,
    };

    setModalMessage("Enviando a compra...");
    setShowModal(true);

    try {
      await submitCheckout(reservation, seatingData);
      setModalMessage("Compra realizada com sucesso!");

      setSelectedDate("");
      setSelectedTime("");
      setSelectedSession(null);
      setTickets({ full: 0, half: 0 });
      setSelectedSeats([]);
    } catch (err) {
      setModalMessage("Ocorreu um erro ao realizar a compra. Tente novamente.");
    }
  };

  const isFormValid =
    selectedDate &&
    selectedTime &&
    (tickets.full > 0 || tickets.half > 0) &&
    tickets.half + tickets.full === selectedSeats.length;

  return (
    <View style={styles.movieCheckout}>
      <View style={styles.section}>
        <Text style={styles.heading}>Selecione o dia</Text>
        <TouchableOpacity style={styles.pickerWrapper}>
          <Picker
            selectedValue={selectedDate}
            onValueChange={handleDateChange}
            style={styles.picker}
          >
            <Picker.Item label="Selecione a data" value="" />
            {availableDates.map((date) => (
              <Picker.Item key={date} label={date} value={date} />
            ))}
          </Picker>
        </TouchableOpacity>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Selecione o horário</Text>
        <View style={styles.sessionsType}>
          {availableTimes.length > 0 &&
            availableTimes.map(({ type, options }) => (
              <View key={type}>
                <Text style={styles.heading}>{type}</Text>
                <View style={styles.options}>
                  {options.map((time) => (
                    <TouchableOpacity
                      style={[
                        styles.option,
                        selectedOption === `${time} - ${type}` &&
                          styles.selectedOption,
                      ]}
                      key={`${time}-${type}`}
                      onPress={() => handleTimeChange(`${time} - ${type}`)}
                    >
                      <Text
                        style={[
                          styles.optionText,
                          selectedOption === `${time} - ${type}` &&
                            styles.selectedOptionText,
                        ]}
                      >
                        {time}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
        </View>
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Selecione os assentos</Text>
        <Seatmap seatingData={seatingData} onSeatSelect={handleSeatSelection} />
      </View>
      <View style={styles.section}>
        <Text style={styles.heading}>Selecione os ingressos</Text>
        <View style={styles.selectTickets}>
          <View style={styles.ticketType}>
            <Text style={styles.titleTicket}>Inteiras</Text>
            <View style={styles.inputNumber}>
              <TouchableOpacity
                onPress={() => handleTicketChange("full", "decrement")}
                style={[styles.button, styles.leftButton]}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.ticketCount}>{tickets.full}</Text>
              <TouchableOpacity
                onPress={() => handleTicketChange("full", "increment")}
                style={[styles.button, styles.rightButton]}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>R$ 30,00</Text>
          </View>
          <View style={styles.ticketType}>
            <Text style={styles.titleTicket}>Meia Entrada</Text>
            <View style={styles.inputNumber}>
              <TouchableOpacity
                onPress={() => handleTicketChange("half", "decrement")}
                style={[styles.button, styles.leftButton]}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.ticketCount}>{tickets.half}</Text>
              <TouchableOpacity
                onPress={() => handleTicketChange("half", "increment")}
                style={[styles.button, styles.rightButton]}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>R$ 15,00</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.submitButton, !isFormValid && styles.disabledButton]}
      >
        <Text style={styles.submitButtonText}>Aplicar</Text>
      </TouchableOpacity>
      {showModal && (
        <Modal
          visible={showModal}
          onRequestClose={closeModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>{modalMessage}</Text>
              <TouchableOpacity
                style={styles.submitButton}
                onPress={closeModal}
              >
                <Text style={styles.submitButtonText}>Ver ingresso</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  movieCheckout: {
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingTop: 76,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 30,
  },
  heading: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#fefefe",
  },
  pickerWrapper: {
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#17082a",
  },
  picker: {
    color: "#fefefe",
    backgroundColor: "#17082a",
  },
  sessionsType: {
    gap: 20,
  },
  options: {
    flexDirection: "row",
    gap: 15,
  },
  option: {
    padding: 10,
    borderColor: "#6644b8",
    borderWidth: 2,
    borderRadius: 20,
  },
  selectedOption: {
    borderColor: "#f79e44",
  },
  optionText: {
    color: "#6644b8",
    fontSize: 18,
  },
  selectedOptionText: {
    color: "#f79e44",
  },
  selectTickets: {
    display: "flex",
    flexDirection: "row",
  },
  ticketType: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: 8,
    width: "50%",
  },
  titleTicket: {
    fontSize: 18,
    color: "#fefefe",
  },
  inputNumber: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  ticketCount: {
    width: 32,
    color: "#f79e44",
    borderTopWidth: 3,
    borderBottomWidth: 3,
    borderColor: "#6644b8",
    backgroundColor: "transparent",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    color: "#f79e44",
    backgroundColor: "transparent",
    fontWeight: "bold",
    borderWidth: 3,
    borderColor: "#6644b8",
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderRadius: 24,
    fontSize: 20,
  },
  leftButton: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
  rightButton: {
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f79e44",
  },
  price: {
    fontSize: 16,
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
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#17082a",
    padding: 30,
    borderRadius: 20,
    width: "90%",
    maxWidth: 500,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    marginVertical: 10,
    textAlign: "center",
    color: "#fefefe",
  },
  modalInfo: {
    width: "100%",
    flexDirection: "column",
    marginVertical: 10,
  },
  warning: {
    color: "#fefefe",
    textAlign: "center",
    marginVertical: 70,
    fontSize: 16,
  },
});

export default MovieCheckout;
