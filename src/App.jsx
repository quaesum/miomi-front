import React from "react";
import { Navigate, Route, Routes } from "react-router";
import { CurrentAnimalPageContainer } from "./pages/CurrentAnimalPage/CurrentAnimalPageContainer";
import Layout from "./components/Layout/Layout";
import { MainPage } from "./pages/MainPage/MainPage";
import TermsOfUse from "./pages/TermsOfUse/TermsOfUse";
import ProfilePageContainer from "./pages/ProfilePage/ProfilePageContainer.";
import { CurrentNewsPageContainer } from "./pages/CurrentNewsPage/CurrentNewsPageContainer";
import { CreateAnimalPage } from "./pages/CreateAnimalPage/CreateAnimalPage";
import { RegistrationContainer } from "./pages/Registration/RegistrationContainer";
import { LoginContainer } from "./pages/Login/LoginContainer";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="" element={<MainPage />} />
        <Route path="animals/:id" element={<CurrentAnimalPageContainer />} />
        <Route path="news/:id" element={<CurrentNewsPageContainer />} />
        <Route path="login" element={<LoginContainer />} />
        <Route path="profile" element={<ProfilePageContainer/>}/>
        <Route path="animals/create-animal" element={<CreateAnimalPage/>}/>
        <Route path="registration" element={<RegistrationContainer />}/>
        <Route path="terms-of-use" element={<TermsOfUse />}/>
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default App;
