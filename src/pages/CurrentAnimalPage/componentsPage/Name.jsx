import { TextField } from "@mui/material";
import React from "react";

export const Name = ({ isEditMode, register, name }) => {
  return (
    <>
      {isEditMode ? (
        <TextField
          classes="!font-semibold"
          {...register("nameAnimal")}
          id="standard-required"
          variant="standard"
        />
      ) : (
        <span className="text-2xl font-semibold">{name}</span>
      )}
    </>
  );
};
