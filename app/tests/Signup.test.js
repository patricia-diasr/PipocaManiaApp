import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import Signup from "../screens/Signup";
import { signup } from "../services/authenticationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

jest.mock("../services/authenticationService");
jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);
jest.mock("@react-native-async-storage/async-storage");
jest.mock("@react-navigation/native");

describe("Signup Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    useNavigation.mockReturnValue({
      navigate: jest.fn(),
    });

    AsyncStorage.setItem.mockResolvedValue(null);
  });

  it("renders correctly", () => {
    render(<Signup />);

    expect(screen.getByText("Faça seu cadastro")).toBeTruthy();
    expect(screen.getByPlaceholderText("Digite seu nome")).toBeTruthy();
    expect(screen.getByPlaceholderText("Digite seu username")).toBeTruthy();
    expect(screen.getByPlaceholderText("Digite sua senha")).toBeTruthy();
    expect(screen.getByText("Cadastrar")).toBeTruthy();
  });

  it("shows error when fields are empty", async () => {
    render(<Signup />);

    const signupButton = screen.getByText("Cadastrar");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(screen.getByText("Preencha todos os campos")).toBeTruthy();
    });
  });

  it("signups successfully", async () => {
    signup.mockResolvedValue({
      user: {
        id: "1",
        name: "Teste Cliente",
        role: "client",
      },
    });

    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });

    render(<Signup />);

    const nameInput = screen.getByPlaceholderText("Digite seu nome");
    const usernameInput = screen.getByPlaceholderText("Digite seu username");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const signupButton = screen.getByText("Cadastrar");

    fireEvent.changeText(nameInput, "Teste Cliente");
    fireEvent.changeText(usernameInput, "testclient");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(signup).toHaveBeenCalledWith({
        login: "testclient",
        password: "password123",
        name: "Teste Cliente",
      });
      expect(AsyncStorage.setItem).toHaveBeenCalled();
      expect(mockNavigate).toHaveBeenCalledWith("Home");
    });
  });

  it("shows erros", async () => {
    signup.mockRejectedValue(new Error("Erro de cadastro"));

    render(<Signup />);

    const nameInput = screen.getByPlaceholderText("Digite seu nome");
    const usernameInput = screen.getByPlaceholderText("Digite seu username");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    const signupButton = screen.getByText("Cadastrar");

    fireEvent.changeText(nameInput, "Teste Usuário");
    fireEvent.changeText(usernameInput, "testuser");
    fireEvent.changeText(passwordInput, "password123");
    fireEvent.press(signupButton);

    await waitFor(() => {
      expect(screen.getByText("Algo deu errado")).toBeTruthy();
    });
  });

  it("navigates to login", () => {
    const mockNavigate = jest.fn();
    useNavigation.mockReturnValue({
      navigate: mockNavigate,
    });

    render(<Signup />);

    const loginLink = screen.getByText("Já possui cadastro? Faça login aqui");
    fireEvent.press(loginLink);

    expect(mockNavigate).toHaveBeenCalledWith("Login");
  });
});
