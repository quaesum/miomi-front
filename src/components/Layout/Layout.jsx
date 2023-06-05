import React from "react";
import { Outlet } from "react-router";
import { NavBarContainer } from "./NavBar/NavBarContainer";

export default function Layout() {
  return (
    <div className={"layout-default"}>
      <NavBarContainer />
      <Outlet />
    </div>
  );
}
