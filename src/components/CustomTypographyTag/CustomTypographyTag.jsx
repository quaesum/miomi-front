import { Typography } from "@mui/material";
import React from "react";

export const CustomTypographyTag = ({
  type,
  register,
  isEditMode,
  text,
  active,
  color = "black",
  border = "1px solid #EE7100",
  className = "",
  handleCustomTag,
}) => {
  return (
    <Typography
      fontSize={18}
      className={`${className} px-20`}
      {...register(type, { value: active })}
      onClick={isEditMode ? () => handleCustomTag(type, !active) : () => {}}
      sx={[
        isEditMode ? { cursor: "pointer" } : { cursor: "default" },
        {
          py: "5px",
          borderRadius: "10px",
          transition: "0.2s",
        },
        active
          ? {
              color: "white",
              backgroundColor: "#EE7100",
              border: "2px solid #EE7100",
            }
          : {
              color: { color },
              border: { border },
              backgroundColor: "white",
            },
      ]}
    >
      {text}
    </Typography>
  );
};
