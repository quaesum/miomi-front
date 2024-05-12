import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useNavigate } from "react-router";
import DataService from "../../auth/data.service";
import { useMobile } from "../../hooks/useMobile";

const btnStyle = {
  borderRadius: "8px",
  width: "100%",
};

export const ModalDelete = ({ id, handleClose, type }) => {
  const isMobile = useMobile();
  const { updateNews, updateAnimals, updateServices } = useAnimalContext();
  const navigate = useNavigate();

  const handleDelete = async () => {
    handleClose();
    switch (type) {
      case "animal":
        await DataService.deleteAnimal(id)
          .then((res) => {
            updateAnimals();
            navigate("/");
          })
          .catch((er) => { });
      case "news":
        await DataService.deleteNews(id).then((res) => {
          updateNews();
          navigate("/");
        });
      case "services":
        await DataService.deleteService(id).then((res) => {
          updateServices();
          navigate("/");
        });
    }
  };

  return (
    <div className="grid place-content-center h-screen w-full flex-1 pb-80">
      <Card
        sx={{
          width: { sm: "100%", lg: "650px", xs: "100%", borderRadius: "20px" },
        }}
        className="w-screen"
      >
        <Box className="flex justify-center items-center min-h-60">
          <Typography
            className={`!font-semibold ${isMobile ? "!text-2xl" : "!text-3xl"}`}
          >
            Вы уверены?
          </Typography>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box
          className={`flex justify-center items-center px-100 pb-20 pt-10 ${isMobile && "px-10"
            }`}
        >
          <Box sx={{ width: "300px" }}>
            <Typography
              sx={{ color: "#6A6D76" }}
              fontSize={18}
              className="flex items-center flex-col"
            >
              <p>Обратно восстановить будет</p>
              <p>невозможно</p>
            </Typography>
            <Box className={`${isMobile && "flex items-center flex-col"}`}>
              <Button
                sx={{
                  ...btnStyle,
                  ...(isMobile ? { width: "250px" } : {}),
                  "&:hover": {
                    backgroundColor: "#DCDCDC",
                    border: "3px solid #DCDCDC",
                  },
                  color: "#6A6D76",
                  border: "3px solid #DCDCDC",
                }}
                className="!mt-12 !text-xs md:!text-sm !normal-case"
                type="submit"
                variant="outlined"
                onClick={handleClose}
              >
                Не хочу удалять
              </Button>
              <Button
                sx={{
                  ...btnStyle,
                  ...(isMobile ? { width: "250px" } : {}),
                  "&:hover": { backgroundColor: "#ee6f00d2" },
                  backgroundColor: "#EE7100",
                }}
                className="!mt-6 !text-xs md:!text-sm !normal-case"
                type="submit"
                variant="contained"
                onClick={handleDelete}
              >
                Да, удалить
              </Button>
            </Box>
          </Box>
        </Box>
      </Card>
    </div>
  );
};
