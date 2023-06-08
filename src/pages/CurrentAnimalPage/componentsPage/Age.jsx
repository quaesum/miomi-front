import { Box, TextField, Typography } from "@mui/material";
import React from "react";

export const Age = ({ register, isEditMode, age, ageName, errors }) => {
  return (
    <Typography sx={isEditMode ? { ml: {md:"30px", xs: "10px"} } : { mt: "13px", ml: "30px" }}>
      {isEditMode ? (
        <>
          <input
            {...register("age", {
              required: "Обязательное поле",
              min: { value: 0.1, message: "Минимальный возраст 1 год" },
              max: { value: 30, message: "Максимальный возраст 30 лет" },
            })}
            type="number"
            min={0}
            max={30}
            className={`outline-0 mt-6 rounded-md w-40 pl-6 !border-solid !border-2 text-base ${
              errors ? "border-red-300" : "!border-gray-300"
            }`}
          />
          {errors && <Box sx={{ color: "red", ml: 4 }}>{errors.message}</Box>}
        </>
      ) : (
        <span className="text-xs md:text-sm text-gray-600">{`${age} ${ageName}`}</span>
      )}
    </Typography>
  );
};