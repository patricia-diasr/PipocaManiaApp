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
        backgroundColor: '#7D56D3', 
        padding: 10,
        borderRadius: 20,
    },
    room: {
        flexDirection: "column",
        gap: 5,
    },
    row: {
        flexDirection: "row",
        gap: 5,
    },
    seat: {
        width: 30,
        height: 30,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#8E44AD", 
    },
    seatText: {
        fontSize: 12,
        color: "#fff",
    },
    available: {
        backgroundColor: "#8E44AD", 
    },
    availableHovered: {
        opacity: 0.8,
    },
    booked: {
        backgroundColor: "#4E4D4D",
    },
    selected: {
        backgroundColor: "#F1C40F",
    },
    emptySeat: {
        width: 5,
        height: 5,
    },
});

export default Seatmap;
