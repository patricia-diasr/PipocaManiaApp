import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { useNavigation } from "@react-navigation/native";
import ListScreenings from "../screens/ListScreenings";

if (typeof jest !== "undefined") {
  jest.mock("@react-navigation/native", () => ({
    useNavigation: jest.fn(),
  }));

  describe("ListScreenings", () => {
    const mockNavigate = jest.fn();

    beforeEach(() => {
      useNavigation.mockReturnValue({ navigate: mockNavigate });
    });

    it("renders screenings correctly", () => {
      const screenings = [
        { id: "1", date: "2024-12-10", time: "15:00", type: "2D", seats: [] },
        { id: "2", date: "2024-12-11", time: "18:00", type: "3D", seats: [] },
      ];

      const { getByText } = render(
        <ListScreenings movieId="123" screenings={screenings} />
      );

      expect(getByText("2024-12-10 - 15:00")).toBeTruthy();
      expect(getByText("2D")).toBeTruthy();
      expect(getByText("2024-12-11 - 18:00")).toBeTruthy();
      expect(getByText("3D")).toBeTruthy();
    });

    it("navigates to BlockSeat screen when a screening is clicked", () => {
      const screenings = [
        { id: "1", date: "2024-12-10", time: "15:00", type: "2D", seats: [] },
      ];

      const { getByText } = render(
        <ListScreenings movieId="123" screenings={screenings} />
      );

      const screeningButton = getByText("2024-12-10 - 15:00");
      fireEvent.press(screeningButton);

      expect(mockNavigate).toHaveBeenCalledWith("BlockSeat", {
        movieId: "123",
        screeningId: "1",
        seatingData: [],
      });
    });
  });
}
