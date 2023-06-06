import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { CurrentAnimalPageContainer } from "./pages/CurrentAnimalPage/CurrentAnimalPageContainer";
import Layout from "./components/Layout/Layout";
import { LoginContainer } from "./components/Login/LoginContainer";
import { MainPage } from "./pages/MainPage/MainPage";
import { CurrentNewsPageContainer } from "./pages/CurrentNewsPage/CurrentNewsPageContainer";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="" element={<MainPage />} />
        <Route path="animals/:id" element={<CurrentAnimalPageContainer />} />
        <Route path="news/:id" element={<CurrentNewsPageContainer />} />
        <Route path="login" element={<LoginContainer />} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default App;
