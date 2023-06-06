import React from "react";
import { User } from "./User";
import { useAnimalContext } from "../../../Context/AnimalContext";

export const UserContainer = (props) => {
  const { isLogin, userData } = useAnimalContext();
  return isLogin ? <User {...props} {...userData} /> : null;
};
