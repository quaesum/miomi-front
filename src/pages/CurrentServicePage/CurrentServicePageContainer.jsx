import React, { useEffect, useState } from "react";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useParams } from "react-router-dom";
import { CurrentServicePage } from "./CurrentServicePage";
import userService from "../../auth/user.service";

export const CurrentServicePageContainer = () => {
  const [services, setServices] = useState();
  const [isCanEdit, setIsCanEdit] = useState();
  const [currentUser, setCurrentUser] = useState();
  const { servicesData, SERVICE_STORAGE_URL, urlsImages, updateServices, isAdmin, userData, isLogin } = useAnimalContext();

  const userId = userData.id ? userData.id : "";
  
  let { id } = useParams();

  useEffect(() => {
    const tempCurrentService = servicesData.filter(
      (el) => el.id === Number(id)
    )[0];
    if (tempCurrentService) {
      setServices({
        ...tempCurrentService,
      });
    }
  }, [servicesData, SERVICE_STORAGE_URL, id]);

  useEffect(() => {
    setIsCanEdit((isLogin && userId === services?.volunteer_id) || isAdmin);
  }, [services, isLogin, userData, isAdmin]);

  useEffect(() => {
    userService.getUserInfoByID(services?.volunteer_id).then(res => setCurrentUser(res.data.data)).catch(er => {
      console.log(er)
    })
  }, [id, services]);
  
  if(!services) return null
  return <CurrentServicePage 
  services={services}
   id={id} 
   isCanEdit={isCanEdit} 
   baseUrl={SERVICE_STORAGE_URL} 
   urlsImages={urlsImages} 
   updateServices={updateServices}
   currentUser={currentUser}
   />;
};
