import React from "react";
import { Avatar, Box, Card, Typography } from "@mui/material";

const ageTransformation = (ageAnimal) => {
  let age = `${ageAnimal} `;
  let percentAge = ageAnimal % 10;
  if (percentAge === 1) age += "год";
  if (age >= 2 && age <= 4) age += "года";
  else age += "лет";
  return age;
};

export const CurrentAnimalPage = ({ animal }) => {
  console.log(animal);
  const sex = animal?.sex ? "девочка" : "мальчик";
  const age = ageTransformation(animal?.age);
  return (
    <div className="grid place-content-center h-full w-full flex-1">
      <Card
        sx={{
          width: { sm: "100%", lg: "1024px", xs: "100%", borderRadius: "20px" },
        }}
      >
        <Box sx={{ px: 10, py: 5 }} className="flex justify-between">
          <Box className="flex">
            <Typography>
              <Avatar
                alt="avatar-animal"
                src={animal?.photos[0]}
                sx={{ width: 90, height: 90 }}
              />
            </Typography>
            <Box sx={{ mt: "10px" }} className="flex">
              <Typography sx={{ ml: "20px" }} className="flex flex-col">
                <span className="text-2xl font-semibold">{animal?.name}</span>
                <span className="text-gray-600 text-sm">{sex}</span>
              </Typography>
              <Typography sx={{ mt: "13px", ml: "30px" }}>
                <span className="text-sm text-gray-600">{age}</span>
              </Typography>
            </Box>
          </Box>
          <Box className="flex flex-col" sx={{ mt: "23px" }}>
            <Typography
              fontSize={18}
              className={"text-grey-600 cursor-pointer"}
            >
              Изменить
            </Typography>
            <Typography
              fontSize={18}
              className="cursor-pointer !ml-auto w-max"
              sx={{ color: "#EE7100" }}
            >
              Удалить
            </Typography>
          </Box>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box sx={{ px: 10, pt: 2, pb: 5 }} className="flex">
          <Box>
            
          </Box>
        </Box>
      </Card>
    </div>
  );
};
