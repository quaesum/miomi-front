import React, { useEffect, useState } from "react";
import { CurrentAnimalPage } from "./CurrentAnimalPage";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useParams } from "react-router-dom";

export const CurrentAnimalPageContainer = () => {
  const [animal, setAnimal] = useState();
  const [isCanEdit, setIsCanEdit] = useState();
  const { animalsData, baseURL, isLogin, userData } = useAnimalContext();
  let { id } = useParams();
  const userShelterId = userData.shelterId ? userData.shelterId : "";

  useEffect(() => {
    const tempCurrentAnimal = animalsData.filter(
      (el) => el.id === Number(id)
    )[0];
    if (tempCurrentAnimal) {
      setAnimal({
        ...tempCurrentAnimal,
        photos: [...tempCurrentAnimal?.photos.map((el) => `${baseURL}${el}`)],
      });
    }
  }, [animalsData, baseURL, id]);

  useEffect(()=>{
    setIsCanEdit(isLogin && userShelterId === animal?.shelterId)
  }, [animal, isLogin, userData])

  if (!animal) return null;
  return <CurrentAnimalPage animal={animal} id={id} isCanEdit={isCanEdit}/>;
};
