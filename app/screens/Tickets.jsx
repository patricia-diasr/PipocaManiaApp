import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Image,
  ScrollView,
  StyleSheet,
  RefreshControl, 
} from "react-native";
import useGetCheckout from "../hooks/useGetCheckout";

function Tickets() {
  const user = "2";
  const { tickets, error, loading, fetchCheckout } = useGetCheckout(user);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(false);
  const [refreshing, setRefreshing] = useState(false);  

  const openModal = (ticket) => {
    if (ticket.status) {
      setSelectedTicket(ticket);
      setIsModalVisible(true);
    }
  };

  const closeModal = () => setIsModalVisible(false);

  const onRefresh = async () => {
    setRefreshing(true);  
    await fetchCheckout();  
    setRefreshing(false);  
  };

  if (loading) {
    return <Text style={styles.warning}>Carregando...</Text>;
  }

  if (error) {
    return <Text style={styles.warning}>Erro: {error}</Text>;
  }

  if (!tickets) {
    return <Text style={styles.warning}>Ingressos não encontrados.</Text>;
  }

  return (
    <ScrollView 
      style={styles.tickets}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} /> 
      }
    >
      <View style={styles.section}>
        <Text style={styles.title}>Meus Ingressos</Text>
        <View style={styles.ticketsContainer}>
          {tickets.map((ticket) => (
            <TouchableOpacity
              key={ticket.checkoutId}
              style={[
                styles.ticket,
                ticket.status === false && styles.disabled,
              ]}
              onPress={() => openModal(ticket)}
            >
              <Text style={styles.ticketTitle}>{ticket.movieName}</Text>
              <View style={styles.ticketInfo}>
                <View>
                  <Text style={styles.textWhite}>{ticket.date}</Text>
                  <Text style={styles.textWhite}>{ticket.time}</Text>
                  <View style={styles.divider}></View>
                  <Text style={styles.textWhite}>
                    Assentos: {ticket.selectedSeats.join(", ")}
                  </Text>
                </View>
                <View style={styles.divider}></View>
                <View>
                  {ticket.tickets.half > 0 && (
                    <Text style={styles.textWhite}>
                      {ticket.tickets.half}x - Meia-entrada
                    </Text>
                  )}
                  {ticket.tickets.full > 0 && (
                    <Text style={styles.textWhite}>
                      {ticket.tickets.full}x - Inteira
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {isModalVisible && selectedTicket && (
        <Modal
          visible={isModalVisible}
          onRequestClose={closeModal}
          transparent={true}
          animationType="slide"
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <View style={styles.img}>
                <Image
                  source={{
                    uri: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${selectedTicket.checkoutId}`,
                  }}
                  style={styles.qrImage}
                />
              </View>
              <Text style={styles.modalTitle}>{selectedTicket.movieName}</Text>
              <View style={styles.modalInfo}>
                <Text style={styles.textWhite}>{selectedTicket.date}</Text>
                <Text style={styles.textWhite}>{selectedTicket.time}</Text>
                <View style={styles.divider}></View>
                {selectedTicket.tickets.half > 0 && (
                  <Text style={styles.textWhite}>
                    {selectedTicket.tickets.half}x - Meia-entrada
                  </Text>
                )}
                {selectedTicket.tickets.full > 0 && (
                  <Text style={styles.textWhite}>
                    {selectedTicket.tickets.full}x - Inteira
                  </Text>
                )}
                <View style={styles.divider}></View>
                <Text style={styles.textWhite}>
                  Assentos: {selectedTicket.selectedSeats.join(", ")}
                </Text>
              </View>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  tickets: {
    backgroundColor: "#0c0f0a",
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 84,
    paddingBottom: 70,
    margin: "0 auto",
  },
  title: {
    marginVertical: 16,
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
  },
  ticketsContainer: {
    flexDirection: "column",
    justifyContent: "center",
    gap: 15,
  },
  ticket: {
    backgroundColor: "#17082a",
    padding: 20,
    borderRadius: 10,
  },
  ticketTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fefefe",
  },
  divider: {
    height: 10,
  },
  disabled: {
    opacity: 0.4,
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
  qrImage: {
    width: 150,
    height: 150,
  },
  img: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: "#fff",
  },
  modalTitle: {
    fontSize: 18,
    marginVertical: 10,
    color: "#fefefe",
  },
  modalInfo: {
    width: "100%",
    flexDirection: "column",
    marginVertical: 10,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: "#6644b8",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fefefe",
    fontSize: 16,
  },
  warning: {
    color: "#fefefe",
    textAlign: "center",
    marginVertical: 20,
    fontSize: 16,
  },
  textWhite: {
    color: "#fefefe",
  },
});

export default Tickets;
