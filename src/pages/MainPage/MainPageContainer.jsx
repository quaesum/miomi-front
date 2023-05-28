import React, { useEffect, useState } from 'react'
import { MainPage } from './MainPage'
import axios from 'axios';

export const MainPageContainer = () => {

    const [newsData, setNewsData] = useState(null);
  const [animalsData, setAnimalsData] = useState([]);

  useEffect(() => {
    axios.get(`http://miomi.by/api/animal/v1/`).then((res) => {
      setAnimalsData(res.data);
    });

    axios.get(`http://miomi.by/api/news/v1/`).then((res) => {
      setNewsData(res.data);
    });
  }, []);

  return (
    <MainPage animalsData={animalsData} newsData={newsData}/>
  )
}
