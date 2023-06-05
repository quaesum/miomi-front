import { Avatar, Box, Typography } from "@mui/material";
import React, { useState } from "react";

export const User = ({ firstName, lastName }) => {
  const [isAllAnimal, setIsAllAnimal] = useState(false);

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
              { py: "5px", pl: "13px", pr: "15px", borderRadius: "10px" },
              isAllAnimal
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
            Все животные
          </Typography>
        </Box>
      </Box>
      <div className="h-2 w-full" style={{ backgroundColor: "#DCDCDC" }}></div>
    </>
  );
};
