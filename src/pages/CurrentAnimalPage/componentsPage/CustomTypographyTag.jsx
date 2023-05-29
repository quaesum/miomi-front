import { Typography } from "@mui/material";
import React from "react";

export const CustomTypographyTag = ({
  type,
  register,
  isEditMode,
  text,
  active,
  className = "",
  handleCustomTag,
}) => {
  return (
    <Typography
      fontSize={18}
      className={className}
      {...register(type, { value: active })}
      onClick={isEditMode ? () => handleCustomTag(type, !active) : () => {}}
      sx={[
        { py: "5px", pl: "13px", pr: "15px", borderRadius: "10px" },
        active
          ? {
              color: "white",
              backgroundColor: "#EE7100",
              border: "1px solid #EE7100",
            }
          : {
              color: "black",
              border: "1px solid #EE7100",
              backgroundColor: "white",
            },
      ]}
    >
      {text}
    </Typography>
  );
};
