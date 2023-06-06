import { TextField } from "@mui/material";
import React from "react";

export const Label = ({ isEditMode, register, label }) => {
  return (
    <>
      {isEditMode ? (
        <TextField
          sx={{width: "300px"}}
          classes="!font-semibold"
          {...register("label")}
          id="standard-required"
          variant="standard"
        />
      ) : (
        <span className="text-2xl font-semibold">{label}</span>
      )}
    </>
  );
};
