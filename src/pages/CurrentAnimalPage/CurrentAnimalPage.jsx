import React, { useState } from "react";
import {
  Avatar,
  Box,
  Card,
  ImageList,
  ImageListItem,
  Typography,
} from "@mui/material";
import pointSrc from "../../assets/CurrentAnimalPage/point.png";
import { ageTransformation } from "../../components/Animals/Animals";

const CustomTypography = ({ text, active, className = "" }) => {
  return (
    <Typography
      fontSize={18}
      className={className}
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

export const CurrentAnimalPage = ({ animal }) => {
  const [isEditMode, setIsEditMode] = useState(false);

  const sex = animal?.sex ? "девочка" : "мальчик";
  const age = ageTransformation(animal?.age);

  return (
    <div className="grid place-content-center h-full w-full flex-1">
      <Card
        sx={{
          width: { sm: "100%", lg: "1024px", xs: "100%", borderRadius: "20px" },
        }}
      >
        <Box sx={{ px: 10, py: 5 }} className="flex justify-between">
          <Box className="flex">
            <Typography>
              <Avatar
                alt="avatar-animal"
                src={animal?.photos[0]}
                sx={{ width: 90, height: 90 }}
              />
            </Typography>
            <Box sx={{ mt: "10px" }} className="flex">
              <Typography sx={{ ml: "20px" }} className="flex flex-col">
                <span className="text-2xl font-semibold">{animal?.name}</span>
                <span className="text-gray-600 text-sm">{sex}</span>
              </Typography>
              <Typography sx={{ mt: "13px", ml: "30px" }}>
                <span className="text-sm text-gray-600">{age}</span>
              </Typography>
            </Box>
          </Box>
          <Box className="flex flex-col" sx={{ mt: "23px" }}>
            <Typography
              fontSize={18}
              className={"text-grey-600 cursor-pointer"}
            >
              Изменить
            </Typography>
            <Typography
              fontSize={18}
              className="cursor-pointer !ml-auto w-max"
              sx={{ color: "#EE7100" }}
            >
              Удалить
            </Typography>
          </Box>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box sx={{ px: 10, pt: 2, pb: 5 }} className="flex flex-col">
          <Box className="flex">
            <img
              src={pointSrc}
              style={{ width: "17px", height: "26px" }}
              alt="point"
            />
            <Typography fontSize={22} sx={{ color: "#6A6D76" }}>
              <div className="ml-10">{animal?.shelter}</div>
            </Typography>
          </Box>
          <Box className="flex" sx={{ mt: "25px" }}>
            <CustomTypography
              text={"Есть прививка"}
              active={animal?.vaccinated}
            />
            <CustomTypography
              className="!ml-10"
              text={"Кастрирован"}
              active={animal?.sterilized}
            />
          </Box>
          <Box className="flex">
            <ImageList
              sx={{ width: "100%", height: 285, mt: "30px" }}
              variant="quilted"
              cols={3}
            >
              {animal?.photos?.map((item) => (
                <ImageListItem key={item}>
                  <img
                    style={{ borderRadius: "15px" }}
                    src={item}
                    alt={item.title}
                    loading="lazy"
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
          <Box sx={{ mt: "30px", color: "#6A6D76", fontSize: "18px" }}>
            <textarea
              className="resize-none w-full border-3 min-h-80 outline-0 rounded-lg p-6 cursor-default font-normal leading-6"
              readOnly
              value={animal?.description}
            />
          </Box>
        </Box>
      </Card>
    </div>
  );
};
