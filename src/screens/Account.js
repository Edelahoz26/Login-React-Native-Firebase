import React from "react";
import { View, Text } from "react-native";
import LoginForm from "../components/Auth/LoginForm";
import UserData from "../components/Auth/SignUpFaorm";
import useAuth from "../hooks/useAuth";

export default function Account() {
  const { auths } = useAuth();
  return <View>{auths ? <UserData /> : <LoginForm />}</View>;
}
