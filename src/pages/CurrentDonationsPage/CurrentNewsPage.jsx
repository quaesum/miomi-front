import React, { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useMobile } from "../../hooks/useMobile";

export const CurrentDonationsPage = () => {
  const isMobile = useMobile();
  const { donations } = useAnimalContext();
  const [donat, setDonat] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setDonat(donations[0]);
    setIsEditMode(false);
  }, [donations]);

  return (
    <form className="grid place-content-center h-fit w-full flex-1">
      <Card
        sx={{
          width: {
            sm: "100%",
            lg: "1024px",
            xs: "100%",
          },
          borderRadius: { lg: 7, xs: 0 },
        }}
      >
        <Box
          sx={{ px: { lg: 10, xs: 5 }, py: 3 }}
          className={`${isMobile && "w-screen"} flex justify-between h-min-80`}
        >
          <Box className="flex flex-col justify-center w-full md:pr-60">
            <span className="text-base whitespace-nowrap md:text-2xl font-semibold">
              {donat.label}
            </span>
          </Box>
          <Box
            className="flex flex-row justify-center items-center"
            sx={{ mt: "15px" }}
          ></Box>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box sx={{ px: {lg: 10, xs: 4}, py: {lg: 0, xs: 2} }} className="flex flex-col">
          <Box sx={{ mt: {lg: 4}, color: "#6A6D76", fontSize: "18px" }}>
            <textarea
              value={donat.description}
              rows={8}
              readOnly={!isEditMode}
              className={`resize-none w-full select-text !border-gray-300 w-full outline-0 rounded-md px-6 cursor-default font-normal leading-6 `}
            />
          </Box>
        </Box>
      </Card>
    </form>
  );
};
