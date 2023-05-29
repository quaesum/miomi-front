import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  Paper,
  CardMedia,
  CardContent,
} from "@mui/material";
import { useNavigate } from "react-router";

export const ageTransformation = (ageAnimal) => {
  let age = `${ageAnimal} `;
  let percentAge = ageAnimal % 10;
  if (percentAge === 1 && ageAnimal < 10) age += "год";
  if (percentAge >= 2 && percentAge <= 4 && ageAnimal < 10) age += "года";
  if ((percentAge >= 5 && percentAge <= 9) || percentAge === 0) age += "лет";
  else if (age.length < 5) age += "лет";
  return age;
};

export const Animals = ({ animals }) => {
  const navigate = useNavigate();

  return (
    <div className={`grid sm:grid-cols-1 md:grid-cols-3 `}>
      {animals.map((animal) => {
        return (
          <Card className="flex shadow m-10" sx={{ height: 200 }}>
            <CardActionArea onClick={() => navigate(`/animal/${animal.id}`)}>
              <div className="flex flex-row">
                <CardContent className="flex justify-items-center">
                  <CardMedia
                    src={`http://miomi.by:9000${animal.photos[0]}`}
                    component="img"
                    alt={animal.id}
                    className="rounded-full ml-6"
                    sx={{ width: 125, height: 125 }}
                  />
                </CardContent>
                <CardContent className="flex flex-col justify-items-center">
                  <Typography fontSize={24}>{animal.name}</Typography>
                  <Typography>
                    {animal.sex === 0 ? "мальчик" : "девочка"}
                  </Typography>
                  <Typography>{ageTransformation(animal.age)}</Typography>
                </CardContent>
              </div>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
};
