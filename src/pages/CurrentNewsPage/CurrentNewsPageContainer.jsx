import React, { useEffect, useState } from "react";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useParams } from "react-router-dom";
import { CurrentNewsPage } from "./CurrentNewsPage";

export const CurrentNewsPageContainer = () => {
  const [news, setNews] = useState();
  const { newsData, SERVICE_STORAGE_URL, isLogin } = useAnimalContext();
  
  let { id } = useParams();

  useEffect(() => {
    const tempCurrentNews = newsData.filter(
      (el) => el.id === Number(id)
    )[0];
    if (tempCurrentNews) {
      setNews({
        ...tempCurrentNews,
        photos: [`${SERVICE_STORAGE_URL}${tempCurrentNews.photo}`],
      });
    }
  }, [newsData, SERVICE_STORAGE_URL, id]);

  
  if(!news) return null
  return <CurrentNewsPage news={news} id={id} isCanEdit={isLogin}/>;
};
