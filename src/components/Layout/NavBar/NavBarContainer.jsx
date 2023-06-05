import React from "react";
import { NavBar } from "./NavBar";
import { useAnimalContext } from "../../../Context/AnimalContext";

export const NavBarContainer = () => {
  const { userData } = useAnimalContext();
  console.log(userData)
  return <NavBar {...userData}/>;
};
