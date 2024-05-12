import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import React from "react";
import userService from "../../auth/user.service";
import { useState, useEffect } from "react";
import PersonIcon from '@mui/icons-material/Person';

export const ServiceCard = ({ handleServiceClick, photo, id, name, description, volunteer_id }) => {
  const [userData, setUserData] = useState({})


  useEffect(() => {
    userService.getUserInfoByID(volunteer_id).then(res => setUserData(res.data.data)).catch(er => {
      console.log(er)
    })
  }, []);

  return (
    <Card className="flex shadow m-10">
      <CardActionArea onClick={() => handleServiceClick(id)}>
        <div className="flex flex-col items-center md:flex-row ">
          <CardContent className="flex flex-row w-1/2 items-center">
            <CardMedia
              src={photo}
              component="img"
              alt={id}
              className="rounded-lg ml-6 mr-12"
              sx={{ width: 150, height: 150 }}
            />
            <div className="flex flex-col space-y-4 h-full">
            <Typography fontSize={24}>{name}</Typography>
            <Typography fontSize={18} className="truncate ...">{description}</Typography>
            </div>
          </CardContent>
          <CardContent className="flex items-center w-1/2 justify-end mr-6 space-x-6">
            <Typography fontSize={24} className="flex flex-row">{userData?.firstName+ " "+userData?.lastName}</Typography>
            <PersonIcon sx={{width: "32px", height: "32px"}}/>
          </CardContent>
        </div>
      </CardActionArea>
    </Card>
  );
};
