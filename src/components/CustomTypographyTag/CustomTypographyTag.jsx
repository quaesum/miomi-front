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
      className={`${className} px-20 text-xs md:text-base`}
      {...register(type, { value: active })}
      onClick={isEditMode ? () => handleCustomTag(type, !active) : () => {}}
      sx={[
        isEditMode ? { cursor: "pointer", display: "flex", alignItems: "center" } : { cursor: "default", display: "flex", alignItems: "center" },
        {
          py: "5px",
          borderRadius: "10px",
          transition: "0.2s",
        },
        active
          ? !isEditMode
            ? {
                color: "white",
                backgroundColor: "#EE7100",
                border: "2px solid #EE7100",
              }
            : {
                color: "white",
                backgroundColor: "#EE7100",
                border: "2px solid #EE7100",
                "&:hover": {
                  backgroundColor: "#ee6f00d2 !important",
                  borderColor: "#ee6f00d2 !important",
                  boxShadow:
                    "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important",
                },
              }
          : !isEditMode
          ? {
              color: "#6A6D76",
              border: "2px solid #DCDCDC",
              backgroundColor: "white",
            }
          : {
              color: "#6A6D76",
              border: "2px solid #DCDCDC",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#DCDCDC",
                border: "2px solid #DCDCDC",
                boxShadow:
                  "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important",
              },
            },
      ]}
    >
      {text}
    </Typography>
  );
};
