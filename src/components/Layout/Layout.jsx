import React from "react";
import { Outlet } from "react-router";
import { NavBarContainer } from "./NavBar/NavBarContainer";

export default function Layout() {
  return (
    <div className={"layout-default"}>
      <NavBarContainer />
      <div className="content-container">
        <Outlet />
      </div>
    </div>
  );
}