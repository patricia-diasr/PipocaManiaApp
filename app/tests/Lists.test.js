import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import Lists from "../screens/Lists";
import useMovieLists from "../hooks/useMovieLists";

jest.mock("../hooks/useMovieLists");
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("Lists Component", () => {

  it("displays error message when there is an error", () => {
    useMovieLists.mockReturnValue({
      loading: false,
      error: "Erro ao carregar listas.",
      watchlist: null,
      myReviews: null,
      fetchMovieLists: jest.fn(),
    });

    render(<Lists />);

    expect(screen.getByText(/Erro: Erro ao carregar listas./i)).toBeTruthy();
  });

  it("displays message when no lists are found", () => {
    useMovieLists.mockReturnValue({
      loading: false,
      error: null,
      watchlist: null,
      myReviews: null,
      fetchMovieLists: jest.fn(),
    });

    render(<Lists />);

    expect(screen.getByText(/Listas não encontradas./i)).toBeTruthy();
  });

});
