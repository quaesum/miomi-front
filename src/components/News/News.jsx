import React from "react";
import { useNavigate } from "react-router";
import { NewsCard } from "./NewsCard";
import { Typography } from "@mui/material";

export const News = ({ news, baseURL }) => {
  const navigate = useNavigate();

  const handleNewsClick = (id) => {
    navigate(`/news/${id}`);
  };

  const newsElements = news?.map((el) => (
    <NewsCard
      key={el.id}
      {...el}
      photo={`${baseURL}${el.photo}`}
      handleNewsClick={handleNewsClick}
    />
  ));

  if (news == null) {
    return <div className="flex items-center text-center">
    <Typography color="gray" className="w-full">
      Новостей не найдено :(
    </Typography>
  </div>
  }

  return <div className="grid grid-col-1">{newsElements}</div>;
};
