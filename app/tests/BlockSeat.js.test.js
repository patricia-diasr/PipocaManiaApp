import React from "react";
import { render, screen, fireEvent } from "@testing-library/react-native";
import BlockSeat from "../screens/BlockSeat";
import { useRoute, useNavigation } from "@react-navigation/native";
import { updateSeatingData } from "../services/checkoutService";

if (typeof jest !== "undefined") {
  jest.mock("@react-navigation/native", () => ({
    useRoute: jest.fn(),
    useNavigation: jest.fn(),
  }));
  jest.mock("../services/checkoutService", () => ({
    updateSeatingData: jest.fn(),
  }));

  describe("BlockSeat", () => {
    beforeEach(() => {
      useRoute.mockReturnValue({
        params: {
          movieId: "1",
          screeningId: "123",
          seatingData: [
            [{ position: "A1", status: "available" }],
            [{ position: "A2", status: "available" }],
          ],
        },
      });
      useNavigation.mockReturnValue({
        navigate: jest.fn(),
      });
    });

    it("should render the component with initial elements", () => {
      render(<BlockSeat />);

      expect(screen.getByText("Selecione os assentos")).toBeTruthy();
      expect(screen.getByText("Aplicar")).toBeTruthy();
    });

    it("should call updateSeatingData on submit", async () => {
      render(<BlockSeat />);

      const seat = screen.getByText("A1");
      fireEvent.press(seat);

      const submitButton = screen.getByText("Aplicar");
      fireEvent.press(submitButton);

      expect(updateSeatingData).toHaveBeenCalledWith(
        "1",
        "123",
        expect.any(Array)
      );
    });
  });
}
