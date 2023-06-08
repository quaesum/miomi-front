import { Box } from "@mui/material";
import React from "react";

export const Name = ({ isEditMode, register, name, errors, validationDefaultProps }) => {
  return (
    <>
      {isEditMode ? (
        <>
          <input
            {...register("nameAnimal", {...validationDefaultProps})}
            type="text"
            className={`outline-0 rounded-md w-max h-100 pl-6 !border-solid !border-2 text-2xl font-semibold ${
              errors
                ? "border-red-300"
                : "!border-gray-300"
            }`}
          />
          {errors && (
            <Box sx={{ color: "red", width: "max-content" }}>{errors.message}</Box>
          )}
        </>
      ) : (
        <span className="text-2xl font-semibold">{name}</span>
      )}
    </>
  );
};
