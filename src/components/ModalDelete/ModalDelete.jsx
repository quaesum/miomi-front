import { Box, Button, Card, Typography } from "@mui/material";
import React from "react";
import { useAnimalContext } from "../../Context/AnimalContext";
import { useNavigate } from "react-router";

const btnStyle = {
  borderRadius: "8px",
  padding: "5px 50px",
  width: "100%",
};

export const ModalDelete = ({ id, handleClose }) => {
  const { handleDeleteAnimal } = useAnimalContext();
  const navigate = useNavigate();

  const handleDelete = () => {
    handleClose();
    handleDeleteAnimal(id);
    navigate("/");
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
          <Typography className="!font-semibold !text-3xl">
            Вы уверены?
          </Typography>
        </Box>
        <div
          className="h-2 w-full"
          style={{ backgroundColor: "#DCDCDC" }}
        ></div>
        <Box className="flex justify-center items-center px-100 pb-20 pt-10">
          <Box sx={{ width: "300px" }}>
            <Typography
              sx={{ color: "#6A6D76" }}
              fontSize={18}
              className="flex items-center flex-col"
            >
              <p>Обратно восстановить будет</p>
              <p>невозможно</p>
            </Typography>
            <Box>
              <Button
                sx={{
                  ...btnStyle,
                  "&:hover": {
                    backgroundColor: "#DCDCDC",
                    border: "3px solid #DCDCDC",
                  },
                  color: "#6A6D76",
                  border: "3px solid #DCDCDC",
                }}
                className="!mt-12 !text-sm !normal-case	"
                type="submit"
                variant="outlined"
                onClick={handleClose}
              >
                Не хочу удалять
              </Button>
              <Button
                sx={{
                  ...btnStyle,
                  "&:hover": { backgroundColor: "#e38800" },
                  backgroundColor: "#ff9800",
                }}
                className="!mt-6 !text-sm !normal-case	"
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
