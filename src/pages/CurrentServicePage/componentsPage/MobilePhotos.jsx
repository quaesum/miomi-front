import { Box } from "@mui/material";
import React from "react";
import { CustomButton } from "./ModalPhotos";

export const MobilePhotos = ({ isEditMode, handleFileLoad, files }) => {
  return (
    <Box className="flex flex-col">
      {files.map((item, tempIndex) => (
        <Box className="flex flex-col justify-center items-center mt-10">
          {isEditMode && (
            <CustomButton
              text={"Поменять картинку"}
              handleFileLoad={handleFileLoad}
              index={tempIndex}
            />
          )}
          <img
          className="mt-6"
            style={{
              borderRadius: "15px",
              width: 128,
              height: 128,
            }}
            src={item}
            alt={"service_image"}
            loading="lazy"
          />
        </Box>
      ))}
    </Box>
  );
};
