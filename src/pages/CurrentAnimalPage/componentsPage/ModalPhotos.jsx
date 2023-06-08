import { Box } from "@mui/material";
import React from "react";
import s from "./ModalPhotos.module.css";

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
  fontSize: "1rem",
  lineHeight: "1.75",
  letterSpacing: "0.02857em",
  textTransform: "uppercase",
  minWidth: "64px",
  padding: "7px 21px",
  borderRadius: "10px",
  WebkitTransition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  transition:
    "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
  color: "#6A6D76",
  border: "1px solid #6A6D76",
  backgroundColor: "transperent",
  boxShadow:
    "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
};

const style = {
  ...styleBtn,
  backgroundColor: "#EE7100",
  color: "white",
  border: "1px solid #EE7100",
};

const typesImage = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"];

export const CustomButton = ({ className, text, handleFileLoad, index, type = "" }) => {
  return (
    <Box className="m-auto">
      <label
        style={type ? { ...style } : { ...styleBtn }}
        className={`${className} w-max ${
          type ? s.hoverEffectType : s.hoverEffect
        } !normal-case`}
        for={`upload-file-${index}`}
      >
        {text}
      </label>
      <input
        multiple={type !== ""}
        accept={typesImage.join(",")}
        id={`upload-file-${index}`}
        hidden
        type="file"
        onChange={(event) => handleFileLoad(event, event.target.id)}
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
