import { Box, Button, Modal, Typography } from "@mui/material";
import React, { useState } from "react";

const styleBtn = {
  display: "inline-flex",
  WebkitBoxAlign: "center",
  MsFlexAlign: "center",
  alignItems: "center",
  WebkitBoxPack: "center",
  MsFlexPack: "center",
  justifyContent: "center",
  position: "relative",
  boxSizing: "border-box",
  WebkitTapHighlightColor: "transparent",
  backgroundColor: "transparent",
  outline: "0",
  margin: "0",
  cursor: "pointer",
  MozUserSelect: "none",
  MsUserSelect: "none",
  userSelect: "none",
  verticalAlign: "middle",
  MozAppearance: "none",
  WebkitAppearance: "none",
  WebkitTextDecoration: "none",
  textDecoration: "none",
  fontFamily: "Roboto,Helvetica,Arial,sans-serif",
  fontWeight: "500",
  fontSize: "0.9375rem",
  lineHeight: "1.75",
  letterSpacing: "0.02857em",
  textTransform: "uppercase",
  minWidth: "64px",
  padding: "7px 21px",
  borderRadius: "4px",
  WebkitTransition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  color: "#ff9800",
  border: "1px solid #ff9800",
  ":hover": {
    backgroundColor: "",
  },
};

const CustomButton = ({ text, handleFileLoad, index }) => {
  return (
    <Box className="m-auto">
      <label style={{ ...styleBtn }} className="w-max" for={`upload-file-${index}`}>
        {text}
      </label>
      <input
        id={`upload-file-${index}`}
        hidden
        type="file"
        onChange={(event) =>
          handleFileLoad(event, event.target.id)
        }
        className="w-max"
      />
    </Box>
  );
};

export const ModalPhotos = ({ handleFileLoad }) => {
  return (
    <>
      <Box className="grid grid-cols-3 my-10">
        <CustomButton
          text={"Поменять картинку"}
          handleFileLoad={handleFileLoad}
          index={0}
        />
        <CustomButton
          text={"Поменять картинку"}
          handleFileLoad={handleFileLoad}
          index={1}
        />
        <CustomButton
          text={"Поменять картинку"}
          handleFileLoad={handleFileLoad}
          index={2}
        />
      </Box>
    </>
  );
};
