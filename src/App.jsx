import React from "react";
import { MainPageContainer } from "./pages/MainPage/MainPageContainer";
import { Route, Routes } from "react-router";
import { CurrentAnimalPageContainer } from "./pages/CurrentAnimalPage/CurrentAnimalPageContainer";
import Layout from "./components/Layout/Layout";
import { LoginContainer } from "./components/Login/LoginContainer";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="" element={<MainPageContainer />} />
        <Route path="animal/:id" element={<CurrentAnimalPageContainer />} />
        <Route path="login" element={<LoginContainer />} />
      </Route>
    </Routes>
  );
};

export default App;
