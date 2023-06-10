import { Box, Typography } from "@mui/material";
import React from "react";

export const Age = ({ register, isEditMode, age, ageName, errors }) => {
  return (
    <Typography
      sx={
        isEditMode
          ? { ml: { md: 30, xs: 10 } }
          : { mt: {md: 13, xs: 0}, ml: {md: 30, xs: 1} }
      }
    >
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
        <div className="text-xs md:text-sm text-gray-600">
          <span>{age}</span>
          &nbsp;
          <span>{ageName}</span>
        </div>
      )}
    </Typography>
  );
};
