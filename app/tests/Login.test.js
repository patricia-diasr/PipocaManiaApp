import React from "react";
import {
  render,
  fireEvent,
  waitFor,
  screen,
} from "@testing-library/react-native";
import Login from "../screens/Login";
import { login } from "../services/authenticationService";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../context/AuthContext";

if (typeof jest !== "undefined") {
  jest.mock("../services/authenticationService");
  jest.mock("@react-native-async-storage/async-storage", () =>
    require("@react-native-async-storage/async-storage/jest/async-storage-mock")
  );
  jest.mock("@react-navigation/native");
  jest.mock("../context/AuthContext");

  describe("Login Component", () => {
    beforeEach(() => {
      jest.clearAllMocks();

      useNavigation.mockReturnValue({
        navigate: jest.fn(),
      });

      useAuth.mockReturnValue({
        loadUserData: jest.fn(),
      });

      AsyncStorage.setItem.mockResolvedValue(null);
    });

    it("renders correctly", () => {
      render(<Login />);

      expect(screen.getByText("Faça seu login")).toBeTruthy();
      expect(screen.getByPlaceholderText("Digite seu username")).toBeTruthy();
      expect(screen.getByPlaceholderText("Digite sua senha")).toBeTruthy();
      expect(screen.getByText("Entrar")).toBeTruthy();
    });

    it("shows error when fields are empty", async () => {
      render(<Login />);

      const loginButton = screen.getByText("Entrar");
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(screen.getByText("Preencha todos os campos")).toBeTruthy();
      });
    });

    it("login successfully", async () => {
      login.mockResolvedValue({
        user: { id: "1", name: "Teste" },
      });

      render(<Login />);

      const usernameInput = screen.getByPlaceholderText("Digite seu username");
      const passwordInput = screen.getByPlaceholderText("Digite sua senha");
      const loginButton = screen.getByText("Entrar");

      fireEvent.changeText(usernameInput, "pati");
      fireEvent.changeText(passwordInput, "123");
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(login).toHaveBeenCalledWith({
          login: "pati",
          password: "123",
        });
        expect(AsyncStorage.setItem).toHaveBeenCalled();
      });
    });

    it("shows invalid credentials error", async () => {
      login.mockRejectedValue(new Error("Credenciais inválidas"));

      render(<Login />);

      const usernameInput = screen.getByPlaceholderText("Digite seu username");
      const passwordInput = screen.getByPlaceholderText("Digite sua senha");
      const loginButton = screen.getByText("Entrar");

      fireEvent.changeText(usernameInput, "pati");
      fireEvent.changeText(passwordInput, "321");
      fireEvent.press(loginButton);

      await waitFor(() => {
        expect(screen.getByText("Senha ou login inválidos")).toBeTruthy();
      });
    });

    it("navigate to signup screen", () => {
      const mockNavigate = jest.fn();
      useNavigation.mockReturnValue({
        navigate: mockNavigate,
      });

      render(<Login />);

      const signupLink = screen.getByText("Não tem cadastro? Registre-se aqui");
      fireEvent.press(signupLink);

      expect(mockNavigate).toHaveBeenCalledWith("Signup");
    });
  });
}
