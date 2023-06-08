import { Box } from "@mui/material";
import React from "react";

export const Label = ({ isEditMode, register, label, errors, validationDefaultProps }) => {
  return (
    <>
      {isEditMode ? (
        <>
          <input
            {...register("label", {...validationDefaultProps})}
            type="text"
            className={`outline-0 rounded-md h-100 pl-6 !border-solid !border-2 text-xs md:text-2xl font-semibold ${
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
        <span className="text-xs md:text-2xl font-semibold">{label}</span>
      )}
    </>
  );
};
