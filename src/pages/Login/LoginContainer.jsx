import React from "react";
import { Login } from "./Login";
import { useNavigate } from "react-router";
import { useAnimalContext } from "../../Context/AnimalContext";

export const LoginContainer = () => {
  const { login, isLogin, setIsLogin } = useAnimalContext();
  const navigate = useNavigate();

  if (isLogin) navigate("/");

  return <Login login={login} setIsLogin={setIsLogin}/>;
};
