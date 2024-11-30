import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { Ionicons } from "@expo/vector-icons";
import { useCheckout } from "../services/checkoutService";

const CheckTickets = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [message, setMessage] = useState("Nenhum ticket escaneado ainda");
  const [checkoutData, setCheckoutData] = useState(null);

  useEffect(() => {
    const getCameraPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    };

    getCameraPermissions();
  }, []);

  const handleBarcodeScanned = async ({ type, data }) => {
    setScanned(true);
    setScannedData(data);
    setIsCameraActive(false);

    setMessage(`QR Code escaneado com sucesso! Dados: ${data}`);

    try {
      const response = await useCheckout(data);
      setMessage(response.message);

      if (response.checkoutData) {
        setCheckoutData(response.checkoutData);
      }
    } catch (error) {
      setMessage(`Erro ao atualizar status do checkout: ${error.message}`);
    }
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.warning}>Solicitando permissão de câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text style={styles.warning}>
          Permissão para acessar a câmera foi negada.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isCameraActive ? (
        <>
          <CameraView
            onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
            barcodeScannerSettings={{
              barcodeTypes: ["qr", "pdf417"],
            }}
            style={StyleSheet.absoluteFillObject}
          />
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setIsCameraActive(false)}
          >
            <Ionicons name="close" size={30} color="#FFF" />
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.content}>
          <Text style={styles.title}>Scannear Ingressos</Text>

          <Text style={styles.message}>{message}</Text>

          {checkoutData && (
            <View style={styles.ticketContainer}>
              <Text style={styles.ticketTitle}>{checkoutData.movieName}</Text>
              <View style={styles.ticketInfo}>
                <View>
                  <Text style={styles.textWhite}>{checkoutData.date}</Text>
                  <Text style={styles.textWhite}>{checkoutData.time}</Text>
                  <View style={styles.divider}></View>
                  <Text style={styles.textWhite}>
                    Assentos: {checkoutData.selectedSeats.join(", ")}
                  </Text>
                </View>
                <View style={styles.divider}></View>
                <View>
                  {checkoutData.tickets.half > 0 && (
                    <Text style={styles.textWhite}>
                      {checkoutData.tickets.half}x - Meia-entrada
                    </Text>
                  )}
                  {checkoutData.tickets.full > 0 && (
                    <Text style={styles.textWhite}>
                      {checkoutData.tickets.full}x - Inteira
                    </Text>
                  )}
                </View>
              </View>
            </View>
          )}

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setScanned(false);
              setIsCameraActive(true);
            }}
          >
            <Ionicons name="camera" size={20} color="#FFF" />
            <Text style={styles.buttonText}>Scannear</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#0c0f0a",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 84,
    paddingBottom: 70,
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    marginVertical: 16,
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  ticketContainer: {
    backgroundColor: "#17082a",
    padding: 40,
    borderRadius: 20,
  },
  ticketTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fefefe",
  },
  divider: {
    height: 10,
  },
  textWhite: {
    color: "#fefefe",
    fontSize: 18,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#6644b8",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 15,
    gap: 15,
  },
  buttonText: {
    color: "#FEFEFE",
    fontSize: 18,
  },
  closeButton: {
    position: "absolute",
    top: 70,
    right: 15,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  warning: {
    color: "#fefefe",
    textAlign: "center",
    marginTop: 120,
    fontSize: 16,
  },
  resultText: {
    color: "#fff",
    fontSize: 18,
    marginVertical: 20,
    textAlign: "center",
  },
  message: {
    color: "#FEFEFE",
    fontSize: 16,
    marginVertical: 10,
    textAlign: "center",
  },
});

export default CheckTickets;
