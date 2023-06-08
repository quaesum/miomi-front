import { Box } from "@mui/material";
import React from "react";

export const Name = ({ isEditMode, register, name, errors, validationDefaultProps }) => {
  return (
    <>
      {isEditMode ? (
        <div className="w-150">
          <input
            {...register("nameAnimal", {...validationDefaultProps})}
            type="text"
            className={`outline-0 w-fit rounded-md h-100 pl-6 !border-solid !border-2 text-xs md:text-2xl font-semibold ${
              errors
                ? "border-red-300"
                : "!border-gray-300"
            }`}
          />
          {errors && (
            <Box sx={{ color: "red", width: "max-content" }}>{errors.message}</Box>
          )}
        </div>
      ) : (
        <span className="xs:text-sm md:text-2xl font-semibold">{name}</span>
      )}
    </>
  );
};
