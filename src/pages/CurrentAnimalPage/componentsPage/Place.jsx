import { Box, Typography } from "@mui/material";
import React from "react";

export const Place = ({
  isEditMode,
  register,
  place,
  errors,
  validationDefaultProps,
}) => {
  return (
    <>
      {isEditMode ? (
        <>
          <input
            {...register("place", { ...validationDefaultProps })}
            type="text"
            
            className={`outline-0 rounded-md h-100 pl-6 !border-solid !border-2 text-lg ${
              errors ? "border-red-300" : "!border-gray-300"
            }`}
          />
          {errors && <Box sx={{ color: "red" }}>{errors.message}</Box>}
        </>
      ) : (
        <Typography fontSize={22} sx={{ color: "#6A6D76" }}>
          {place}
        </Typography>
      )}
    </>
  );
};
