import { Box, Typography } from "@mui/material";
import React from "react";

export const PlaceAnAd = ({ type }) => {
  return (
    <>
      <Box
        className="flex"
        sx={{
          mx: { lg: 13, xs: 2 },
          my: { lg: 4, xs: 2 },
          flexDirection: { xs: "column" },
        }}
      >
        <Typography
          fontSize={30}
          sx={{ justifyContent: { xs: "center" } }}
          className="!font-semibold flex"
        >
          Подача объявления
        </Typography>
        <Typography
          fontSize={30}
          sx={{ justifyContent: { xs: "center" }, ml: {lg: 5}, color: "#EE7100" }}
          className="!font-semibold flex"
        >
          {type}
        </Typography>
      </Box>
      <div className="h-2 w-full" style={{ backgroundColor: "#DCDCDC" }}></div>
    </>
  );
};
