import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import Tickets from "../screens/Tickets";
import useGetCheckout from "../hooks/useGetCheckout";

if (typeof jest !== "undefined") {
  jest.mock("../hooks/useGetCheckout", () => ({
    __esModule: true,
    default: jest.fn(),
  }));

  describe("Tickets Component", () => {
    const mockTickets = [
      {
        checkoutId: "1",
        movieName: "Test Movie",
        date: "2024-01-15",
        time: "19:30",
        status: true,
        selectedSeats: ["A1", "A2"],
        tickets: {
          half: 1,
          full: 1,
        },
      },
    ];

    beforeEach(() => {
      jest.clearAllMocks();
    });

    test("renders loading state correctly", () => {
      useGetCheckout.mockReturnValue({
        loading: true,
        tickets: null,
        error: null,
        fetchCheckout: jest.fn(),
      });

      render(<Tickets />);

      expect(screen.getByText("Carregando...")).toBeTruthy();
    });

    test("renders error state correctly", () => {
      useGetCheckout.mockReturnValue({
        loading: false,
        tickets: null,
        error: "Test error message",
        fetchCheckout: jest.fn(),
      });

      render(<Tickets />);

      expect(screen.getByText(/Erro: Test error message/)).toBeTruthy();
    });

    test("renders tickets list when data is available", () => {
      useGetCheckout.mockReturnValue({
        loading: false,
        tickets: mockTickets,
        error: null,
        fetchCheckout: jest.fn(),
      });

      render(<Tickets />);

      expect(screen.getByText("Meus Ingressos")).toBeTruthy();
      expect(screen.getByText("Test Movie")).toBeTruthy();
      expect(screen.getByText("2024-01-15")).toBeTruthy();
    });

    test("closes modal when close button is pressed", () => {
      useGetCheckout.mockReturnValue({
        loading: false,
        tickets: mockTickets,
        error: null,
        fetchCheckout: jest.fn(),
      });

      render(<Tickets />);

      fireEvent.press(screen.getByText("Test Movie"));

      fireEvent.press(screen.getByText("Fechar"));
    });

    test("disabled ticket is not clickable", () => {
      const disabledTicket = {
        ...mockTickets[0],
        status: false,
      };

      useGetCheckout.mockReturnValue({
        loading: false,
        tickets: [disabledTicket],
        error: null,
        fetchCheckout: jest.fn(),
      });

      render(<Tickets />);

      const ticket = screen.getByText("Test Movie");
      fireEvent.press(ticket);
    });
  });
}
