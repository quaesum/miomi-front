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
import { CreateNewsPage } from "./pages/CreateNewsPage/CreateNewsPage";
import { CurrentDonationsPage } from "./pages/CurrentDonationsPage/CurrentNewsPage";
import { CurrentServicePageContainer } from "./pages/CurrentServicePage/CurrentServicePageContainer";
import { CreateServicePage } from "./pages/CreateServicePage/CreateServicePage";
import { Restricted } from "./pages/EmailConfirmation/Restricted";
import { Success } from "./pages/EmailConfirmation/Success";
import ShelterPageContainer from "./pages/ShelterPage/ShelterPageContainer";
import AboutUs from "./pages/AboutUs/AboutUs";

export const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<Layout />}>
        <Route path="" element={<MainPage />} />
        <Route path="animals/:id" element={<CurrentAnimalPageContainer />} />
        <Route path="news/:id" element={<CurrentNewsPageContainer />} />
        <Route path="donations/:id" element={<CurrentDonationsPage />} />
        <Route path="services/:id" element={<CurrentServicePageContainer/>} />
        <Route path="login" element={<LoginContainer />} />
        <Route path="profile" element={<ProfilePageContainer/>}/>
        <Route path="my-shelter" element={<ShelterPageContainer/>}/>
        <Route path="animals/create-animal" element={<CreateAnimalPage/>}/>
        <Route path="services/create-service" element={<CreateServicePage/>} />
        <Route path="registration" element={<RegistrationContainer />}/>
        <Route path="terms-of-use" element={<TermsOfUse />}/>
        <Route path="news/create-news" element={<CreateNewsPage />}/>
        <Route path="email-restricted" element={<Restricted/>} />
        <Route path="email-confirmed" element={<Success/>} />
        <Route path="about-us" element={<AboutUs/>} />
        <Route path="*" element={<Navigate to={"/"} />} />
      </Route>
    </Routes>
  );
};

export default App;
