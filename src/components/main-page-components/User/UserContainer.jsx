import React from "react";
import { User } from "./User";
import { useAnimalContext } from "../../../Context/AnimalContext";

export const UserContainer = (props) => {
  const { userData } = useAnimalContext();
  return userData ?  <User {...props} {...userData}/> : null
};
