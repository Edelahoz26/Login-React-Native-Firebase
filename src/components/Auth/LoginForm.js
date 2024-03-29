//Components
import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";

// Función signInWithEmailAndPassword y auth desde el módulo de Firebase
import {
  signInWithEmailAndPassword,

} from "firebase/auth";
import { auth } from "../../config/firebase";

//importando el hooks de useContext para contener la autenticación
import useAuth from "../../hooks/useAuth";

const LoginForm = (props) => {
  // Variables de estado para almacenar el correo electrónico, la contraseña y los mensajes de error
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { auths, login } = useAuth();
  console.log(auths);

  // Función para manejar el inicio de sesión del usuario con correo electrónico y contraseña
  const loginUserWithEmailAndPassword = async () => {
    try {
      // Intentar iniciar sesión con el correo electrónico y la contraseña proporcionados
      await signInWithEmailAndPassword(auth, email, password).then(
        (userCredential) => {
          let user = userCredential.user;
          login(user);
        }
      );

      //Campos vacios
      setEmail("");
      setPassword("");
      setError(null);

      //Mensaje exito y navegar a la pantalla de inicio
      Alert.alert("Inicio de sesion", "success");
      props.navigation.navigate("Home");
    } catch (error) {
      // Manejo de errores
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorCode, errorMessage);

      switch (errorCode) {
        case "auth/invalid-credential":
          setError("Credencial inválida. Por favor, intenta nuevamente.");
          break;
        case "auth/missing-password":
          setError(
            "La contraseña no puede estar vacía. Por favor, proporciona tu contraseña."
          );
          break;
        case "auth/missing-email":
          setError("La dirección de correo electrónico no puede estar vacía.");
          break;
        case "auth/invalid-email":
          setError(
            "La dirección de correo electrónico proporcionada no es válida."
          );
          break;
        case "auth/too-many-requests":
          setError(
            "Tu cuenta está temporalmente deshabilitada. Por favor, espera un momento y vuelve a intentarlo más tarde."
          );
          break;
        default:
          setError(errorMessage);
          break;
      }
    }
  };

  return (
    <View style={styles.containerLogin}>
      <Image
        source={require("../../../assets/nativescript.png")}
        style={styles.logoLogin}
      />
      <Text style={styles.titleLogin}>Welcome back</Text>
      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize="none"
        style={styles.inputLogin}
      />
      <TextInput
        placeholder="Contraseña"
        value={password}
        autoCapitalize="none"
        onChangeText={(text) => setPassword(text)}
        style={styles.inputLogin}
        secureTextEntry
      />
      {error && <Text style={styles.error}>{error}</Text>}
      <TouchableOpacity
        onPress={loginUserWithEmailAndPassword}
        style={styles.button}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate("Register")}
        style={[styles.button, styles.buttonOutline]}
      >
        <Text style={styles.buttonOutlineText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        // onPress={loginUserWithEmailAndPasswordGoogle}
        style={styles.containerLogoLoginGoogle}
      >
        <Image
          source={require("../../../assets/google.png")}
          style={styles.logoLoginGoogle}
        />
      </TouchableOpacity>
    </View>
  );
};

export default LoginForm;

const styles = StyleSheet.create({
  containerLogin: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logoLogin: {
    width: 200,
    height: 200,
  },
  titleLogin: {
    color: "#000",
    fontSize: 30,
    fontWeight: "700",
    justifyContent: "center",
  },
  inputLogin: {
    width: "80%",
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  button: {
    backgroundColor: "#000",
    width: "60%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    color: "#000",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#000",
    borderWidth: 2,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#000",
    fontWeight: "700",
    fontSize: 16,
  },
  error: {
    color: "red",
    fontWeight: "bold",
    fontStyle: "italic",
    fontSize: 14,
    textAlign: "center",
    marginTop: 10,
    maxWidth: 300,
    marginHorizontal: 20,
  },
  containerLogoLoginGoogle: {
    flexDirection: "row",
    gap: 7,
    top: 30,
    alignItems: "center",
  },
  logoLoginGoogle: {
    width: 50,
    height: 50,
  },
});
