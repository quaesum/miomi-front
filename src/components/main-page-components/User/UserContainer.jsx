import React from "react";
import { User } from "./User";
import { useAnimalContext } from "../../../Context/AnimalContext";

export const UserContainer = () => {
  const { userData } = useAnimalContext();
  return userData ?  <User {...userData} /> : null
};
