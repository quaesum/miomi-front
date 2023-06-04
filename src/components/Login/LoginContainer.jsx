import React from "react";
import { Login } from "./Login";
import { useAnimalContext } from "../../Context/AnimalContext";
import { Outlet } from "react-router";

export const LoginContainer = () => {
  const { isLogin, setIsLogin } = useAnimalContext();
  return !isLogin ? <Login setIsLogin={setIsLogin}/> : <Outlet />;
};
