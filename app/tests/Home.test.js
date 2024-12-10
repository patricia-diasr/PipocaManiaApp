import React from "react";
import {
  render,
  screen,
  waitFor,
  fireEvent,
} from "@testing-library/react-native";
import Home from "../screens/Home";
import useMovieSugestions from "../hooks/useMovieSugestions";

jest.mock("../hooks/useMovieSugestions");
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

describe("Home Component", () => {
  it("displays error message if error occurs", () => {
    useMovieSugestions.mockReturnValue({
      loading: false,
      upcomingMovies: null,
      showingNow: null,
      error: "Network error",
      fetchMovieDetails: jest.fn(),
    });

    render(<Home />);
    expect(screen.getByText(/Erro: Network error/i)).toBeTruthy();
  });

  it("shows message when no upcoming movies are found", () => {
    useMovieSugestions.mockReturnValue({
      loading: false,
      upcomingMovies: null,
      showingNow: [],
      error: null,
      fetchMovieDetails: jest.fn(),
    });

    render(<Home />);
    expect(
      screen.getByText(/Próximos lançamentos não encontrados./i)
    ).toBeTruthy();
  });


});
