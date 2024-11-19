import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { login } from "../services/authenticationService";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (!username || !password) {
      setError("Preencha todos os campos");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const loginData = await login({ login: username, password });

      if (loginData) {
        await AsyncStorage.setItem("user", JSON.stringify(loginData.user));
        if (loginData.user.role === "client") {
          navigation.navigate("Home");
        } else {
          navigation.navigate("Search");
        }
      }
    } catch (err) {
      setError("Senha ou login inválidos");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Faça seu login</Text>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        <View style={styles.form}>
          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Digite seu username"
          />
          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Digite sua senha"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Entrando..." : "Entrar"}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Não tem cadastro? Registre-se aqui</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0c0f0a",
    justifyContent: "flex-end",
  },
  loginContainer: {
    backgroundColor: "#17082a",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    height: "70%",
  },
  title: {
    textAlign: "center",
    fontSize: 24,
    color: "#FEFEFE",
    marginBottom: 20,
  },
  error: {
    color: "#f79e44",
    textAlign: "center",
    marginBottom: 10,
  },
  form: {
    flex: 1,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
    color: "#FEFEFE",
  },
  input: {
    backgroundColor: "#FEFEFE",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 2,
    borderColor: "#17082a",
  },
  button: {
    backgroundColor: "#6644b8",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#FEFEFE",
    fontSize: 18,
  },
  link: {
    textAlign: "center",
    color: "#f79e44",
    fontSize: 16,
  },
});

export default Login;
