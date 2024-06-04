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
    return <Typography>Новости отсутствуют(</Typography>
  }

  return <div className="grid grid-col-1">{newsElements}</div>;
};
