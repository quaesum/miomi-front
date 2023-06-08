import { Box, Typography } from "@mui/material";
import React from "react";
import { useMobile } from "../../hooks/useMobile";

export const PlaceAnAd = ({ type }) => {
  const isMobile = useMobile()
  return (
    <>
      <Box
        className={`flex ${isMobile && "flex-col"}`}
        sx={{
          mx: { lg: 13, xs: 2 },
          my: { lg: 4, xs: 2 },
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
