import React from "react";
import { View, Text, Button, SafeAreaView, TextInput } from "react-native";

export default function HomeScreen(props) {
  const { navigation } = props;

  const goToSettings = () => {
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView>
      <TextInput placeHolder="Usuario"/>
      <Button onPress={goToSettings} title="Ir a Ajustes">
        Cerrar sesion
      </Button>
    </SafeAreaView>
  );
}
