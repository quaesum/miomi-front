import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

export const NewsCard = ({ handleNewsClick, photo, id, label, created_at }) => {
  return (
    <Card className="flex shadow m-10">
      <CardActionArea onClick={() => handleNewsClick(id)}>
        <div className="flex flex-col items-center md:flex-row ">
          <CardContent className="flex flex-col">
            <CardMedia
              src={photo}
              component="img"
              alt={id}
              className="rounded-lg ml-6"
              sx={{ width: 150, height: 150 }}
            />
          </CardContent>
          <CardContent className="flex flex-col w-full">
            <Typography fontSize={24}>{label}</Typography>
            <Typography>{created_at}</Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};
