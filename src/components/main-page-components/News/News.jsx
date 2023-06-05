import { CardActionArea, CardContent, CardMedia, Typography, Card } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router";

export const News = ({ news }) => {
  const navigate = useNavigate();
  return (
    <div className="grid grid-col-1">
      {news.map((n) => {
        return (
          <Card className='flex shadow m-10' >
            <CardActionArea onClick={() => navigate(`/news/${n.id}`)}>
              <div className="flex flex-col items-center md:flex-row ">
                <CardContent className="flex flex-col">
                  <CardMedia
                    src={`http://miomi.by:9000${n.photo}`}
                    component="img"
                    alt={n.id}
                    className="rounded-lg ml-6"
                    sx={{width: 150, height: 150}}
                  />
                </CardContent>
                <CardContent className="flex flex-col w-full">
                  <Typography fontSize={24}>{n.label}</Typography>
                  <Typography>{n.created_at}</Typography>
                </CardContent>
              </div>
            </CardActionArea>
          </Card>

        );
      })}
    </div>
  );
};
