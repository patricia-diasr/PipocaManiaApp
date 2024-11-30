import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { addNewScreening } from "../services/screeningsService";
import DateTimePicker from "@react-native-community/datetimepicker";

function NewScreening({ movieId, poster }) {
  const [selectedAudio, setSelectedAudio] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState("date");

  const navigation = useNavigation();

  const isFormValid = selectedAudio && selectedFormat && date;

  const showPicker = (currentMode) => {
    setMode(currentMode);
    setShowDatePicker(true);
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      if (mode === "date") {
        setDate((prevDate) => {
          const newDate = new Date(selectedDate);
          return prevDate
            ? new Date(
                newDate.setHours(prevDate.getHours(), prevDate.getMinutes())
              )
            : newDate;
        });

        if (Platform.OS === "android") {
          showPicker("time");
        }
      } else {
        setDate((prevDate) => {
          const newDate = prevDate || new Date();
          return new Date(
            newDate.setHours(selectedDate.getHours(), selectedDate.getMinutes())
          );
        });
      }
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const monthNames = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];
    const month = monthNames[date.getMonth()];

    return `${day} de ${month}`;
  }

  function formatTime(dateString) {
    const date = new Date(dateString);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  const handleSubmit = async () => {
    if (!isFormValid) {
      return;
    }

    const dateTime = date;
    const screening = {
      id: new Date(),
      date: formatDate(dateTime),
      time: formatTime(dateTime),
      type: `${selectedFormat} ${selectedAudio}`,
      seats: [
        [
          {
            position: "A1",
            status: "available",
          },
          {
            position: "A2",
            status: "available",
          },
          {
            position: "A3",
            status: "available",
          },
          {
            position: "A4",
            status: "available",
          },
          "null",
          {
            position: "A5",
            status: "available",
          },
          {
            position: "A6",
            status: "available",
          },
          {
            position: "A7",
            status: "available",
          },
          {
            position: "A8",
            status: "available",
          },
        ],
        [
          {
            position: "B1",
            status: "available",
          },
          {
            position: "B2",
            status: "available",
          },
          {
            position: "B3",
            status: "available",
          },
          {
            position: "B4",
            status: "available",
          },
          "null",
          {
            position: "B5",
            status: "available",
          },
          {
            position: "B6",
            status: "available",
          },
          {
            position: "B7",
            status: "available",
          },
          {
            position: "B8",
            status: "available",
          },
        ],
        [
          {
            position: "C1",
            status: "available",
          },
          {
            position: "C2",
            status: "available",
          },
          {
            position: "C3",
            status: "available",
          },
          {
            position: "C4",
            status: "available",
          },
          "null",
          {
            position: "C5",
            status: "available",
          },
          {
            position: "C6",
            status: "available",
          },
          {
            position: "C7",
            status: "available",
          },
          {
            position: "C8",
            status: "available",
          },
        ],
        [
          {
            position: "D1",
            status: "available",
          },
          {
            position: "D2",
            status: "available",
          },
          {
            position: "D3",
            status: "available",
          },
          {
            position: "D4",
            status: "available",
          },
          "null",
          {
            position: "D5",
            status: "available",
          },
          {
            position: "D6",
            status: "available",
          },
          {
            position: "D7",
            status: "available",
          },
          {
            position: "D8",
            status: "available",
          },
        ],
        [
          {
            position: "E1",
            status: "available",
          },
          {
            position: "E2",
            status: "available",
          },
          {
            position: "E3",
            status: "available",
          },
          {
            position: "E4",
            status: "available",
          },
          "null",
          {
            position: "E5",
            status: "available",
          },
          {
            position: "E6",
            status: "available",
          },
          {
            position: "E7",
            status: "available",
          },
          {
            position: "E8",
            status: "available",
          },
        ],
        [
          "null",
          "null",
          "null",
          "null",
          "null",
          "null",
          "null",
          "null",
          "null",
        ],
        [
          {
            position: "F1",
            status: "available",
          },
          {
            position: "F2",
            status: "available",
          },
          {
            position: "F3",
            status: "available",
          },
          {
            position: "F4",
            status: "available",
          },
          "null",
          {
            position: "F5",
            status: "available",
          },
          {
            position: "F6",
            status: "available",
          },
          {
            position: "F7",
            status: "available",
          },
          {
            position: "F8",
            status: "available",
          },
        ],
        [
          {
            position: "G1",
            status: "available",
          },
          {
            position: "G2",
            status: "available",
          },
          {
            position: "G3",
            status: "available",
          },
          {
            position: "G4",
            status: "available",
          },
          "null",
          {
            position: "G5",
            status: "available",
          },
          {
            position: "G6",
            status: "available",
          },
          {
            position: "G7",
            status: "available",
          },
          {
            position: "G8",
            status: "available",
          },
        ],
        [
          {
            position: "H1",
            status: "available",
          },
          {
            position: "H2",
            status: "available",
          },
          {
            position: "H3",
            status: "available",
          },
          {
            position: "H4",
            status: "available",
          },
          "null",
          {
            position: "H5",
            status: "available",
          },
          {
            position: "H6",
            status: "available",
          },
          {
            position: "H7",
            status: "available",
          },
          {
            position: "H8",
            status: "available",
          },
        ],
        [
          {
            position: "I1",
            status: "available",
          },
          {
            position: "I2",
            status: "available",
          },
          {
            position: "I3",
            status: "available",
          },
          {
            position: "I4",
            status: "available",
          },
          "null",
          {
            position: "I5",
            status: "available",
          },
          {
            position: "I6",
            status: "available",
          },
          {
            position: "I7",
            status: "available",
          },
          {
            position: "I8",
            status: "available",
          },
        ],
        [
          {
            position: "J1",
            status: "available",
          },
          {
            position: "J2",
            status: "available",
          },
          {
            position: "J3",
            status: "available",
          },
          {
            position: "J4",
            status: "available",
          },
          "null",
          {
            position: "J5",
            status: "available",
          },
          {
            position: "J6",
            status: "available",
          },
          {
            position: "J7",
            status: "available",
          },
          {
            position: "J8",
            status: "available",
          },
        ],
        [
          {
            position: "K1",
            status: "available",
          },
          {
            position: "K2",
            status: "available",
          },
          {
            position: "K3",
            status: "available",
          },
          {
            position: "K4",
            status: "available",
          },
          "null",
          {
            position: "K5",
            status: "available",
          },
          {
            position: "K6",
            status: "available",
          },
          {
            position: "K7",
            status: "available",
          },
          {
            position: "K8",
            status: "available",
          },
        ],
        [
          {
            position: "L1",
            status: "available",
          },
          {
            position: "L2",
            status: "available",
          },
          {
            position: "L3",
            status: "available",
          },
          {
            position: "L4",
            status: "available",
          },
          "null",
          {
            position: "L5",
            status: "available",
          },
          {
            position: "L6",
            status: "available",
          },
          {
            position: "L7",
            status: "available",
          },
          {
            position: "L8",
            status: "available",
          },
        ],
      ],
    };

    try {
      await addNewScreening(movieId, screening, poster);
      Alert.alert("Sucesso!", "Sessão adicionada com sucesso.", [
        {
          text: "OK",
          onPress: () => navigation.navigate("Screenings"),
        },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Ocorreu um erro a adicionar sessão. Por favor, tente novamente."
      );
    }
  };

  return (
    <View style={styles.newScreening}>
      <View style={styles.section}>
        <Text style={styles.heading}>Selecione o tipo de áudio</Text>
        <View style={styles.sessionsType}>
          <View style={styles.options}>
            <TouchableOpacity
              style={[
                styles.option,
                selectedAudio === "Dublado" && styles.selectedOption,
              ]}
              onPress={() => setSelectedAudio("Dublado")}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAudio === "Dublado" && styles.selectedOptionText,
                ]}
              >
                Dublado
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                selectedAudio === "Legendado" && styles.selectedOption,
              ]}
              onPress={() => setSelectedAudio("Legendado")}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAudio === "Legendado" && styles.selectedOptionText,
                ]}
              >
                Legendado
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Selecione o formato de exibição</Text>
        <View style={styles.sessionsType}>
          <View style={styles.options}>
            <TouchableOpacity
              style={[
                styles.option,
                selectedFormat === "2D" && styles.selectedOption,
              ]}
              onPress={() => setSelectedFormat("2D")}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedFormat === "2D" && styles.selectedOptionText,
                ]}
              >
                Filme 2D
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                selectedFormat === "3D" && styles.selectedOption,
              ]}
              onPress={() => setSelectedFormat("3D")}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedFormat === "3D" && styles.selectedOptionText,
                ]}
              >
                Filme 3D
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Selecione a data e hora</Text>
        <TouchableOpacity
          style={styles.datePickerButton}
          onPress={() => showPicker("date")}
        >
          <Text style={styles.datePickerText}>
            {date
              ? `${date.toLocaleDateString()} - ${date.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}`
              : "Escolha uma data e hora"}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()}
            mode={mode}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            onChange={handleDateChange}
          />
        )}
      </View>

      <TouchableOpacity
        onPress={handleSubmit}
        style={[styles.submitButton, !isFormValid && styles.disabledButton]}
      >
        <Text style={styles.submitButtonText}>Aplicar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  newScreening: {
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
  datePickerButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#17082a",
  },
  datePickerText: {
    color: "#fefefe",
    fontSize: 16,
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

export default NewScreening;
