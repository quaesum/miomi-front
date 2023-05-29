import React, { useEffect, useState } from "react";
import { MainPage } from "./MainPage";
import axios from "axios";
import { useAnimalContext } from "../../Context/AnimalContext";

export const MainPageContainer = () => {
  const [newsData, setNewsData] = useState(null);

  const { animalsData } = useAnimalContext();

  useEffect(() => {
    axios.get(`http://miomi.by/api/news/v1/`).then((res) => {
      setNewsData(res.data);
    });
  }, []);

  return <MainPage animalsData={animalsData} newsData={newsData} />;
};
