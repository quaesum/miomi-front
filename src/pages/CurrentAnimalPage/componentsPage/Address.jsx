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
      {isEditMode ? (
        <>
          <input
            {...register("address", { ...validationDefaultProps })}
            type="text"
            className={`mt-6 outline-0 rounded-md h-100 pl-6 !border-solid !border-2 md:text-lg ${
              errors ? "border-red-300" : "!border-gray-300"
            }`}
          />
          {errors && <Box sx={{ color: "red" }}>{errors.message}</Box>}
        </>
      ) : (
        <Typography sx={{ color: "#6A6D76" }} fontSize={18}>
          {address}
        </Typography>
      )}
    </>
  );
};
