import { Box, Typography } from "@mui/material";
import React from "react";

export const Address = ({
  isEditMode,
  register,
  address,
  errors,
  validationDefaultProps,
}) => {
  return (
    <>
        <Typography  sx={{ color: "#6A6D76", fontSize: {md: 22, sx: 14} }}>
          {address}
        </Typography>
    </>
  );
};
