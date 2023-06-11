import { Box } from "@mui/material";
import React from "react";

export const Sex = ({
  isEditMode,
  register,
  sex,
  handleChangeSex,
  validationDefaultProps,
  errors,
}) => {
  const otherSex = sex === "мальчик" ? "девочка" : "мальчик";
  return (
    <>
      {isEditMode ? (
        <>
          <select
            {...register("sex", { ...validationDefaultProps })}
            className={` mt-6 outline-0 rounded-md h-100 pl-6 !border-solid !border-2 md:text-base ${
              errors ? "border-red-300 w-6/12" : "!border-gray-300 w-full"
            }`}
            onChange={handleChangeSex}
          >
            <option value={sex}>{sex}</option>
            <option value={otherSex}>{otherSex}</option>
          </select>
          {errors && <Box sx={{ color: "red", ml: 4 }}>{errors.message}</Box>}
        </>
      ) : (
        <span className="text-gray-600 xs:text-xs md:text-sm">{sex}</span>
      )}
    </>
  );
};
