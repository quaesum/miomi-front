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

const ageIdent = (age) => {
  if (age === 1) return ' год'
  if (age >= 2 && age <= 4) return ' года'
  if ((age >= 5 && age <= 9) || age === 0) return ' лет'
  else return ageIdent(age % 10)
}

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
                  <CardMedia src={`http://miomi.by:9000${animal.photos[0]}`}
                    component="img"
                    alt={animal.id}
                    className="rounded-full ml-6"
                    sx={{ width: 125, height: 125 }}
                  />
                </CardContent>
                <CardContent className="flex flex-col justify-items-center">
                  <Typography fontSize={24}>{animal.name}</Typography>
                  <Typography>{animal.sex === 0 ? 'мальчик' : 'девочка'}</Typography>
                  <Typography>{animal.age + ageIdent(animal.age)}</Typography>
                </CardContent>
              </div>
            </CardActionArea>
          </Card>
        );
      })}
    </div>
  );
};
