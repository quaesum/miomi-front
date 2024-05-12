import { Avatar, Box, Typography } from "@mui/material";
import React from "react";
import DoneIcon from '@mui/icons-material/Done';
import CountdownTimer from "./Timer";

export const Success = ({}) => {
  return (
    <>
      <Box
        sx={{ p: { md: "25px", xs: "5px" }, mx: "10px" }}
        className="flex h-screen w-full justify-center items-center"
      >
        <Box className="flex flex-row items-center bg-white h-min rounded-full">
          <Box className="flex flex-col ml-10 text-center p-24 items-center">
            <div className="flex flex-row items-center space-x-4">
            <Typography
              fontWeight={600}
              sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}

            >
              Почтовый адрес успешно подтвержден
            </Typography>
            <DoneIcon sx={{color: "green", height: "32px", width:"32px"}}/>

            </div>

            <Typography
              fontWeight={600}
              sx={{ fontSize: { md: "1.5rem", xs: "1rem" } }}
            >
              Вы будете перенаправлены на главную страницу
            </Typography>
            <CountdownTimer redirectUrl={"/"}/>
          </Box>
        </Box>
      </Box>
    </>
  );
};
