import { Box, Typography } from "@mui/material";
import React from "react";

export const PlaceAnAd = ({ type }) => {
  return (
    <>
      <Box className="flex flex-row " sx={{ mx: 13, my: 4 }}>
        <Typography fontSize={30} className="!font-semibold">
          Подача объявления
        </Typography>
        <Typography
          fontSize={30}
          sx={{ ml: 5, color: "#EE7100" }}
          className="!font-semibold"
        >
          {type}
        </Typography>
      </Box>
      <div className="h-2 w-full" style={{ backgroundColor: "#DCDCDC" }}></div>
    </>
  );
};
