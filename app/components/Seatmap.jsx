import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function Seatmap({ seatingData, onSeatSelect }) {
    return (
        <View style={styles.seatmap}>
            <View style={styles.room}>
                {seatingData.map((row, rowIndex) => (
                    <View key={rowIndex} style={styles.row}>
                        {row.map((seat, seatIndex) =>
                            seat !== "null" ? (
                                <TouchableOpacity
                                    key={seatIndex}
                                    style={[styles.seat, styles[seat.status]]}
                                    onPress={() => onSeatSelect(seat)}
                                >
                                    <Text style={styles.seatText}>{seat.position}</Text>
                                </TouchableOpacity>
                            ) : (
                                <View key={seatIndex} style={styles.emptySeat}></View>
                            )
                        )}
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    seatmap: {
        backgroundColor: '#17082a', 
        padding: 10,
        borderRadius: 20,
        alignItems: "center"
    },
    room: {
        flexDirection: "column",
        gap: 6,
    },
    row: {
        flexDirection: "row",
        gap: 6,
    },
    seat: {
        width: 32,
        height: 32,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    seatText: {
        fontSize: 13,
        color: "#fff",
    },
    available: {
        backgroundColor: "#6644b8", 
    },
    availableHovered: {
        opacity: 0.8,
    },
    booked: {
        backgroundColor: "#4e4d4d",
    },
    selected: {
        backgroundColor: "#f79e44",
    },
    emptySeat: {
        width: 10,
        height: 10,
    },
});

export default Seatmap;
