import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Typography,
  } from "@mui/material";
  import React from "react";
  
  export const ProductCard = ({
    photo,
    name,
    id,
    description,
    link,
  }) => {
    return (
      <Card className="flex shadow m-10" sx={{ height: 200 }}>
        <CardActionArea href={`${link}`} target="_blank">
          <div className="flex flex-row">
            <CardContent className="flex justify-items-center">
              <CardMedia
                src={photo}
                component="img"
                alt={id}
                className="rounded-full ml-6"
                sx={{ width: 125, height: 125 }}
              />
            </CardContent>
            <CardContent className="flex flex-col justify-items-center">
              <Typography fontSize={24}>{name}</Typography>
              <Typography>{`${description}`}</Typography>
            </CardContent>
          </div>
        </CardActionArea>
      </Card>
    );
  };
  