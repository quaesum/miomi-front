import React from "react";
import { Route, Routes } from "react-router";
import { CurrentAnimalPageContainer } from "./pages/CurrentAnimalPage/CurrentAnimalPageContainer";
import Layout from "./components/Layout/Layout";
import { LoginContainer } from "./components/Login/LoginContainer";
import { MainPage } from "./pages/MainPage/MainPage";
import TermsOfUse from "./pages/TermsOfUse";
import ProfilePageContainer from "./pages/ProfilePage/ProfilePageContainer.";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="terms-of-use" element={<TermsOfUse />}/>
        <Route path="" element={<MainPage />} />
        <Route path="animal/:id" element={<CurrentAnimalPageContainer />} />
        <Route path="login" element={<LoginContainer />} />
        <Route path="profile" element={<ProfilePageContainer/>}/>
      </Route>
    </Routes>
  );
};

export default App;
