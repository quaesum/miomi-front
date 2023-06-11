import React from "react";
import { useAnimalContext } from "../../Context/AnimalContext";
import { Card, CardActionArea, CardContent, Typography } from "@mui/material";
import { useNavigate } from "react-router";

export const Donations = () => {
  const { donations } = useAnimalContext();
  const navigate = useNavigate();

  const handleDonationsClick = (id) => {
    navigate("donations/" + id);
  };

  const elements = donations.map((el) => (
    <Card className="flex shadow m-10" sx={{ height: 90 }}>
      <CardActionArea onClick={() => handleDonationsClick(el.id)}>
        <div className="flex flex-col items-center md:flex-row ">
          <CardContent className="flex flex-col w-full">
            <Typography fontSize={24}>{el.label}</Typography>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  ));
  return <div>{elements}</div>;
};
