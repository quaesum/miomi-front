import { NativeSelect } from "@mui/material";
import React from "react";

export const Sex = ({
  isEditMode,
  register,
  sex,
  handleChangeSex,
}) => {
  const otherSex = sex === "мальчик" ? "девочка" : "мальчик";
  return (
    <>
      {isEditMode ? (
        <NativeSelect
          {...register("sex")}
          sx={{ width: "max-content" }}
          defaultValue={sex}
          onChange={handleChangeSex}
          inputProps={{
            name: "name",
            id: "uncontrolled-native",
          }}
        >
          <option value={sex}>{sex}</option>
          <option value={otherSex}>{otherSex}</option>
        </NativeSelect>
      ) : (
        <span className="text-gray-600 text-sm">{sex}</span>
      )}
    </>
  );
};
