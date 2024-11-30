import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

function ListScreenings({movieId, screenings}) {
  const navigation = useNavigation();

  const handleScreeningClick = (screeningId) => {
    navigation.navigate("BlockSeat", {
      movieId: movieId,
      screeningId,
      seatingData: screenings.find(s => s.id = screeningId).seats, 
    });
  };

  return (
    <View style={styles.listScreenings}>
      <View style={styles.section}>
        <View style={styles.screeningsContainer}>
          {screenings.map((screening) => (
            <TouchableOpacity
              style={styles.screening}
              key={screening.id}
              onPress={() => handleScreeningClick(screening.id)}
            >
              <Text style={styles.screeningTitle}>
                {screening.date} - {screening.time}
              </Text>
              <Text style={styles.screeningInfo}>{screening.type}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listScreenings: {
    paddingHorizontal: 16,
    flexGrow: 1,
    paddingTop: 76,
    paddingBottom: 60,
  },
  section: {
    marginBottom: 30,
  },
  screeningsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
  },
  screening: {
    backgroundColor: "#17082a",
    padding: 20,
    borderRadius: 10,
  },
  screeningTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fefefe",
  },
  screeningInfo: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fefefe",
  },
});

export default ListScreenings;
