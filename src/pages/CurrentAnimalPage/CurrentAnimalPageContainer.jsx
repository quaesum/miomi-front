import React, { useEffect, useState } from "react";
import { CurrentAnimalPage } from "./CurrentAnimalPage";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GET_SHELTER_BY_ID } from "../../endpoints";
import authHeader from "../../auth/auth.headers";

export const CurrentAnimalPageContainer = () => {
  const [animal, setAnimal] = useState();
  const [isCanEdit, setIsCanEdit] = useState();
  const [shelter, setShelter] = useState();
  const { animalsData, SERVICE_STORAGE_URL, isLogin, userData, urlsImages, updateAnimals, isAdmin } =
    useAnimalContext();
  let { id } = useParams();
  const userShelterId = userData.shelter_id ? userData.shelter_id : "";

  const getShelterByID = async (id) => {
    await axios.get(`${GET_SHELTER_BY_ID}${id}`, {headers: authHeader}).then((res) => {
        setShelter(res.data.data)
    })
}

  useEffect(() => {
    const tempCurrentAnimal = animalsData.filter(
      (el) => el.id === Number(id)
    )[0];
    if (tempCurrentAnimal) {
      setAnimal({
        ...tempCurrentAnimal,
      });
      getShelterByID(tempCurrentAnimal.shelterId)
    }
  }, [animalsData, SERVICE_STORAGE_URL, id]);

  useEffect(() => {
    console.log(isLogin, userShelterId, animal?.shelterId)
    setIsCanEdit((isLogin && userShelterId === Number(animal?.shelterId)) || isAdmin == true);
  }, [animal, isLogin, userData]);

  if (!animal) return null;
  return (
    <CurrentAnimalPage
    updateAnimals={updateAnimals}
      baseUrl={SERVICE_STORAGE_URL}
      urlsImages={urlsImages}
      animal={animal}
      id={id}
      isCanEdit={isCanEdit}
      shelter={shelter}
    />
  );
};
