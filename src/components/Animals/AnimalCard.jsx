import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";

export const AnimalCard = ({
  photo,
  sex,
  id,
  handleAnimalClick,
  name,
  age,
  ageText,
}) => {
  return (
    <Card className="flex shadow m-10" sx={{ height: 200 }}>
      <CardActionArea onClick={() => handleAnimalClick(id)}>
        <div className="flex flex-row">
          <CardContent className="flex justify-items-center">
            <CardMedia
              src={photo}
              component="img"
              alt={id}
              className="rounded-xl ml-6"
              sx={{ width: 125, height: 125 }}
            />
          </CardContent>
          <CardContent className="flex flex-col justify-items-center">
            <Typography fontSize={24}>{name}</Typography>
            <Typography>{sex === "0" ? "мальчик" : "девочка"}</Typography>
            <Typography>{`${age} ${ageText}`}</Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};
