import React, { useEffect, useState } from "react";
import { CurrentAnimalPage } from "./CurrentAnimalPage";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useParams } from "react-router-dom";

export const CurrentAnimalPageContainer = () => {
  const [animal, setAnimal] = useState();
  const { animalsData } = useAnimalContext();
  let { id } = useParams();

  useEffect(() => {
    const tempCurrentAnimal = animalsData.filter(
      (el) => el.id === Number(id)
    )[0];
    setAnimal(tempCurrentAnimal);
  }, [animalsData]);

  return <CurrentAnimalPage animal={animal} />;
};
