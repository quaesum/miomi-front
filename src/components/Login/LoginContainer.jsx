import React from "react";
import { Login } from "./Login";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useNavigate } from "react-router";

export const LoginContainer = () => {
  const { setIsLogin, isLogin } = useAnimalContext();
  const navigate = useNavigate();

  if (isLogin) navigate("/");

  return <Login setIsLogin={setIsLogin} />;
};
