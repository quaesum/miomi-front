import { Typography } from "@mui/material";
import React from "react";

export const News = ({ news }) => {
  return (
    <div>
      {news.map((n) => {
        return (
          <div>
            <Typography key={n.id}>{n.label}</Typography>
          </div>
        );
      })}
    </div>
  );
};
