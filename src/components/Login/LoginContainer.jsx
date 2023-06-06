import React from "react";
import { Login } from "./Login";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useNavigate } from "react-router";

export const LoginContainer = () => {
  const { login, isLogin, setIsLogin } = useAnimalContext();
  const navigate = useNavigate();

  if (isLogin) navigate("/");

  return <Login login={login} setIsLogin={setIsLogin}/>;
};
