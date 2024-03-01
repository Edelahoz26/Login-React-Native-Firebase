//Components
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React from "react";
import LoginScreen from "../components/Auth/LoginForm";
import HomeScreen from "../screens/HomeScreen";
import SignUpScreen from "../components/Auth/SignUpForm";
import { createStackNavigator } from "@react-navigation/stack";
import useAuth from "../hooks/useAuth";
import { auth } from "../config/firebase";

const NavigationStack = (props) => {
  const Stack = createStackNavigator();

  const {auths} = useAuth()


  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false, animationEnabled: true }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, animationEnabled: true }}
      />
      <Stack.Screen
        name="Register"
        component={SignUpScreen}
        options={{
          title: "",
          headerShown: true,
          animationEnabled: true,
          headerStyle: {
            backgroundColor: "#f2f2f2",
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default NavigationStack;

const styles = StyleSheet.create({});
