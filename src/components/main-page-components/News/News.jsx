import React from "react";
import { useNavigate } from "react-router";
import { NewsCard } from "./NewsCard";

export const News = ({ news, baseURL }) => {
  const navigate = useNavigate();

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  const newsElements = news.map((el) => (
    <NewsCard
      key={el.id}
      {...el}
      photo={`${baseURL}${el.photo}`}
      handleNewsClick={handleNewsClick}
    />
  ));

  return <div className="grid grid-col-1">{newsElements}</div>;
};
