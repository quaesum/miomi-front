import React from "react";
import { NavBar } from "./NavBar";
import { useAnimalContext } from "../../../Context/AnimalContext";

export const NavBarContainer = () => {
  const { userData } = useAnimalContext();
  return <NavBar {...userData} />;
};
