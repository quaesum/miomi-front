import { Avatar, Box, Typography } from "@mui/material";
import React from "react";

export const User = ({ firstName, lastName, isAllAnimal, setIsAllAnimal }) => {
  const userName = `${firstName} ${lastName}`;

  return (
    <>
      <Box sx={{ p: "25px", ml: "10px" }} className="flex justify-between">
        <Box className="flex flex-row">
          <Avatar sx={{ width: 100, height: 100 }}></Avatar>
          <Box className="flex flex-col mt-12 ml-10">
            <Typography fontWeight={600} fontSize={"1.5rem"}>
              {userName}
            </Typography>
            <Typography className="text-gray-600" fontSize={"1.2rem"}>
              Информация
            </Typography>
          </Box>
        </Box>
        <Box className="flex items-center mr-80">
          <Typography
            fontSize={20}
            onClick={() => setIsAllAnimal((prev) => !prev)}
            sx={[
              {
                py: "5px",
                pl: "13px",
                pr: "15px",
                borderRadius: "10px",
                cursor: "pointer",
                boxShadow:
                  "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12)",
                transition: "0.2s",
              },
              isAllAnimal
                ? {
                    color: "white",
                    backgroundColor: "#EE7100",
                    border: "1px solid #EE7100",
                    "&:hover": {
                      backgroundColor: "#ee6f00d2",
                      borderColor: "#ee6f00d2 !important",
                      boxShadow:
                        "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important",
                    },
                  }
                : {
                    color: "#6A6D76",
                    border: "1px solid #DCDCDC",
                    backgroundColor: "white",
                    "&:hover": {
                      backgroundColor: "#DCDCDC",
                      border: "1px solid #DCDCDC",
                      boxShadow:
                      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12) !important",
                    },
                  },
            ]}
          >
            Все животные
          </Typography>
        </Box>
      </Box>
      <div className="h-2 w-full" style={{ backgroundColor: "#DCDCDC" }}></div>
    </>
  );
};
