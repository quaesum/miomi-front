import React, { useEffect, useState } from "react";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useParams } from "react-router-dom";
import { CurrentNewsPage } from "./CurrentNewsPage";

export const CurrentNewsPageContainer = () => {
  const [news, setNews] = useState();
  const { newsData, baseURL, isLogin } = useAnimalContext();
  
  let { id } = useParams();

  useEffect(() => {
    const tempCurrentNews = newsData.filter(
      (el) => el.id === Number(id)
    )[0];
    if (tempCurrentNews) {
      setNews({
        ...tempCurrentNews,
        photos: [`${baseURL}${tempCurrentNews.photo}`],
      });
    }
  }, [newsData, baseURL, id]);

  
  if(!news) return null
  return <CurrentNewsPage news={news} id={id} isCanEdit={isLogin}/>;
};
