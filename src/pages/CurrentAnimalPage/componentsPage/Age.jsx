import { TextField, Typography } from "@mui/material";
import React from "react";

export const Age = ({ register, isEditMode, age, ageName }) => {
  return (
    <Typography sx={isEditMode ? { ml: "30px" } : { mt: "13px", ml: "30px" }}>
      {isEditMode ? (
        <TextField
          {...register("age")}
          sx={{ width: "50px" }}
          className="!text-lg"
          id="standard-number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
      ) : (
        <span className="text-sm text-gray-600">{`${age} ${ageName}`}</span>
      )}
    </Typography>
  );
};
