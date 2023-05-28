import React from "react";
import {
  Typography,
  Card,
  CardActionArea,
  Paper,
  CardMedia,
} from "@mui/material";
import { useNavigate } from "react-router";

export const Animals = ({ animals }) => {
  const navigate = useNavigate();

  return (
    <div>
      {animals.map((animal) => {
        return (
          <div
            className="p-12"
            onClick={() => navigate(`/animal/${animal.id}`)}
          >
            <Card className="flex shadow" sx={{ height: 350 }}>
              <CardActionArea className="flex flex-col">
                <CardMedia
                  component="img"
                  src={`http://miomi.by:9000${animal.photos[0]}`}
                  alt={animal.name}
                />
                <Paper
                  sx={{
                    position: "absolute",
                    top: 8,
                    left: 8,
                    height: 40,
                    width: 150,
                    borderRadius: "10px 10px 10px 10px",
                    bgcolor: "#CCE8E4",
                    p: 1,
                  }}
                >
                  <Typography className="pl-6">{animal.name}</Typography>
                </Paper>
                <div className="w-full px-16 pt-16"></div>
              </CardActionArea>
            </Card>
          </div>
        );
      })}
    </div>
  );
};
