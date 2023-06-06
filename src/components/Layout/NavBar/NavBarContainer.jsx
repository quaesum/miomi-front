import React from "react";
import { NavBar } from "./NavBar";
import { useAnimalContext } from "../../../Context/AnimalContext";
import { useNavigate } from "react-router";
import authService from "../../../auth/auth.service";

export const NavBarContainer = () => {
  const { userData, isLogin, logout } = useAnimalContext();
  const navigate = useNavigate();

  const handleClickExit = () => {
    if (isLogin) {
      authService.logout();
      logout()
    } else {
      navigate("/login");
    }
  };

  return (
    <NavBar {...userData} isLogin={isLogin} handleClickExit={handleClickExit} />
  );
};
