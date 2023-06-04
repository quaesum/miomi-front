import React, { useEffect, useState } from "react";
import { CurrentAnimalPage } from "./CurrentAnimalPage";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useParams } from "react-router-dom";

export const CurrentAnimalPageContainer = () => {
  const [animal, setAnimal] = useState();
  const { animalsData, baseURL } = useAnimalContext();
  let { id } = useParams();

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
  }, [animalsData]);
  
  if(!animal) return null
  return <CurrentAnimalPage animal={animal} id={id} />;
};
