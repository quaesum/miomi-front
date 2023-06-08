import React, { useEffect, useState } from "react";
import { Box, Card } from "@mui/material";
import { useAnimalContext } from "../../Context/AnimalContext";

export const CurrentDonationsPage = () => {
  const { donations } = useAnimalContext();
  const [donat, setDonat] = useState({});
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    setDonat(donations[0]);
  }, [donations]);

  return (
    <form className="grid place-content-center h-full w-full flex-1">
      <Card
        sx={{
          width: {
            sm: "100%",
            lg: "1024px",
            xs: "100%",
            borderRadius: "20px",
            pb: 10,
          },
        }}
      >
        <Box sx={{ px: 10, py: 3 }} className="flex justify-between h-min-80">
          <Box className="flex flex-col justify-center w-full pr-60">
            <span className="text-2xl font-semibold">{donat.label}</span>
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
        <Box sx={{ px: 10, pt: 2, pb: 5 }} className="flex flex-col">
          <Box sx={{ mt: "30px", color: "#6A6D76", fontSize: "18px" }}>
            <textarea
              value={donat.description}
              rows={8}
              readOnly={!isEditMode}
              className={`resize-none w-full !border-gray-300 w-full outline-0 rounded-md px-6 cursor-default font-normal leading-6 `}
            />
          </Box>
        </Box>
      </Card>
    </form>
  );
};
