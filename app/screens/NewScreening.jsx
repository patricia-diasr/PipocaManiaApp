import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function NewScreening() {
  const [selectedAudio, setSelectedAudio] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [mode, setMode] = useState("date");

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

  const handleSubmit = async () => {
    if (!isFormValid) {
      return;
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
                selectedAudio === "dublado" && styles.selectedOption,
              ]}
              onPress={() => setSelectedAudio("dublado")}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAudio === "dublado" && styles.selectedOptionText,
                ]}
              >
                Dublado
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                selectedAudio === "legendado" && styles.selectedOption,
              ]}
              onPress={() => setSelectedAudio("legendado")}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedAudio === "legendado" && styles.selectedOptionText,
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
                selectedFormat === "2d" && styles.selectedOption,
              ]}
              onPress={() => setSelectedFormat("2d")}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedFormat === "2d" && styles.selectedOptionText,
                ]}
              >
                Filme 2D
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                selectedFormat === "3d" && styles.selectedOption,
              ]}
              onPress={() => setSelectedFormat("3d")}
            >
              <Text
                style={[
                  styles.optionText,
                  selectedFormat === "3d" && styles.selectedOptionText,
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
